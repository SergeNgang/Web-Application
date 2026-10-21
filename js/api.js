export const API_KEYS = {
  openWeather: "YOUR_OPENWEATHER_API_KEY",
  weatherApi: "YOUR_WEATHERAPI_KEY"
};
export async function searchLocation(query) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=en&format=json`;
  const res = await fetch(url);
  const data = await res.json();
  if (!data.results || data.results.length === 0) {
    throw new Error("Location not found");
  }
  const result = data.results[0];
  return {
    name: `${result.name}, ${result.country_code ? result.country_code.toUpperCase() : ""}`,
    lat: result.latitude,
    lon: result.longitude
  };
}
export async function fetchOpenMeteo(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,is_day,weather_code&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=7`;
  const res = await fetch(url);
  return await res.json();
}
export async function fetchOpenWeather(lat, lon) {
  if (!API_KEYS.openWeather || API_KEYS.openWeather.startsWith("YOUR_")) return null;
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEYS.openWeather}`;
  const res = await fetch(url);
  return await res.json();
}
export async function fetchWeatherApi(lat, lon) {
  if (!API_KEYS.weatherApi || API_KEYS.weatherApi.startsWith("YOUR_")) return null;
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEYS.weatherApi}&q=${lat},${lon}&days=2&aqi=no&alerts=no`;
  const res = await fetch(url);
  return await res.json();
}