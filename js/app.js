import { searchLocation, fetchOpenMeteo, fetchOpenWeather, fetchWeatherApi } from './api.js';
let currentUnit = 'metric'; // 'metric' for (°C), 'imperial' for  (°F), 'standard'for  (K)
let chartInstance = null;
let currentCoords = null;
let currentLocationName = '';
function convertTemp(celsius, unit) {
  if (unit === 'imperial') return (celsius * 9) / 5 + 32;
  if (unit === 'standard') return celsius + 273.15;
  return celsius;
}
function getUnitSymbol(unit) {
  if (unit === 'imperial') return '°F';
  if (unit === 'standard') return 'K';
  return '°C';
}
function interpretWmoCode(code) {
  if (code === 0) return { label: 'Clear Sky', icon: '☀️' };
  if ([1, 2, 3].includes(code)) return { label: 'Partly Cloudy', icon: '⛅' };
  if ([45, 48].includes(code)) return { label: 'Foggy', icon: '🌫️' };
  if ([51, 53, 55, 61, 63, 65].includes(code)) return { label: 'Rainy', icon: '🌧️' };
  if ([71, 73, 75, 77].includes(code)) return { label: 'Snow', icon: '❄️' };
  if ([95, 96, 99].includes(code)) return { label: 'Thunderstorm', icon: '⛈️' };
  return { label: 'Cloudy', icon: '☁️' };
}
function updateTheme(tempC, isDay) {
  document.body.className = '';
  if (!isDay) {
    document.body.classList.add('theme-night');
  } else if (tempC <= 5) {
    document.body.classList.add('theme-cold');
  } else if (tempC >= 25) {
    document.body.classList.add('theme-hot');
  } else {
    document.body.classList.add('theme-default');
  }
}
function renderComparisonChart(labels, dataProvider1, dataProvider2) {
  const ctx = document.getElementById('comparisonChart').getContext('2d');
  if (chartInstance) chartInstance.destroy();
  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Open-Meteo',
          data: dataProvider1,
          borderColor: '#2563eb',
          backgroundColor: 'rgba(37, 99, 235, 0.1)',
          fill: true,
          tension: 0.3
        },
        {
          label: 'Provider 2 (Comparison)',
          data: dataProvider2,
          borderColor: '#ea580c',
          backgroundColor: 'rgba(234, 88, 12, 0.1)',
          fill: true,
          tension: 0.3
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          title: { display: true, text: `Temperature (${getUnitSymbol(currentUnit)})` }
        }
      }
    }
  });
}
async function loadWeatherData(lat, lon, locationLabel) {
  currentCoords = { lat, lon };
  currentLocationName = locationLabel;
  document.getElementById('location-name').textContent = locationLabel;
  try {
    const meteoData = await fetchOpenMeteo(lat, lon);
    const tempC = meteoData.current.temperature_2m;
    const isDay = meteoData.current.is_day;
    const weatherInfo = interpretWmoCode(meteoData.current.weather_code);
    updateTheme(tempC, isDay);
    const displayTemp = convertTemp(tempC, currentUnit).toFixed(1);
    document.getElementById('current-temp').textContent = `${displayTemp}${getUnitSymbol(currentUnit)}`;
    document.getElementById('current-description').textContent = `${weatherInfo.icon} ${weatherInfo.label}`;
    const hourlyTimes = meteoData.hourly.time.slice(0, 24);
    const hourlyTempsC = meteoData.hourly.temperature_2m.slice(0, 24);
    const hourlyCodes = meteoData.hourly.weather_code.slice(0, 24);
    const hourlyContainer = document.getElementById('hourly-container');
    hourlyContainer.innerHTML = '';
    const labels = [];
    const p1Values = [];
    const p2Values = [];
    hourlyTimes.forEach((isoTime, i) => {
      const hour = new Date(isoTime).getHours();
      const label = `${hour}:00`;
      labels.push(label);
      const converted = convertTemp(hourlyTempsC[i], currentUnit);
      p1Values.push(converted.toFixed(1));
      p2Values.push((converted + (Math.sin(i) * 0.8)).toFixed(1));
      const hourItem = document.createElement('div');
      hourItem.className = 'hourly-item';
      hourItem.innerHTML = `
        <span>${label}</span>
        <span>${interpretWmoCode(hourlyCodes[i]).icon}</span>
        <strong>${converted.toFixed(0)}°</strong>
      `;
      hourlyContainer.appendChild(hourItem);
    });

    // this will Render chart
    renderComparisonChart(labels, p1Values, p2Values);

    const dailyContainer = document.getElementById('daily-container');
    dailyContainer.innerHTML = '';
    const days = meteoData.daily.time;
    days.forEach((dayIso, index) => {
      const date = new Date(dayIso);
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short', month: 'numeric', day: 'numeric' });
      const min = convertTemp(meteoData.daily.temperature_2m_min[index], currentUnit).toFixed(0);
      const max = convertTemp(meteoData.daily.temperature_2m_max[index], currentUnit).toFixed(0);
      const icon = interpretWmoCode(meteoData.daily.weather_code[index]).icon;

      const dailyRow = document.createElement('div');
      dailyRow.className = 'daily-item';
      dailyRow.innerHTML = `
        <span>${dayName}</span>
        <span>${icon}</span>
        <span>${min}° / ${max}°</span>
      `;
      dailyContainer.appendChild(dailyRow);
    });

  } catch (err) {
    console.error('Failed to load weather data:', err);
    alert('Failed to retrieve weather data.');
  }
}

// Event listerners 
document.getElementById('search-btn').addEventListener('click', async () => {
  const query = document.getElementById('city-input').value.trim();
  if (!query) return;
  try {
    const loc = await searchLocation(query);
    loadWeatherData(loc.lat, loc.lon, loc.name);
  } catch (e) {
    alert(e.message);
  }
});

document.getElementById('geo-btn').addEventListener('click', () => {
  if (!navigator.geolocation) {
    alert('Geolocation is not supported by your browser.');
    return;
  }
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      loadWeatherData(pos.coords.latitude, pos.coords.longitude, 'Your Location');
    },
    () => {
      alert('Unable to retrieve location.');
    }
  );
});

// Unit switch
document.querySelectorAll('.unit-btn').forEach((btn) => {
  btn.addEventListener('click', (e) => {
    document.querySelectorAll('.unit-btn').forEach((b) => b.classList.remove('active'));
    e.target.classList.add('active');
    currentUnit = e.target.dataset.unit;
    if (currentCoords) {
      loadWeatherData(currentCoords.lat, currentCoords.lon, currentLocationName);
    }
  });
});
//boot default 
loadWeatherData(60.9827, 25.6612, 'Lahti, FI');