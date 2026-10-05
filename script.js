//this is the  API for StatFin population data
const API_URL = "https://statfin.stat.fi/PxWeb/api/v1/en/StatFin/synt/12dy.px";

const years = [
    "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007",
    "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015",
    "2016", "2017", "2018", "2019", "2020", "2021"
];

let chart = null;
let currentValues = [];
let currentLabels = [...years];
let municipalityMap = {}; 

// this will build the post query
function buildQuery(areaCode) {
    return {
        query: [
            {
                code: "timeperiod_y",
                selection: {
                    filter: "item",
                    values: years
                }
            },
            {
                code: "alue_23_20260101",
                selection: {
                    filter: "item",
                    values: [areaCode]
                }
            },
            {
                code: "contentscode",
                selection: {
                    filter: "item",
                    values: ["synt-vaesto"]
                }
            }
        ],
        response: {
            format: "json-stat2"
        }
    };
}

// this will fetch the municipality codes and names using a simple GET request
async function loadMunicipalityCodes() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        
        // This is the second variable object which contains the municipality codes & names
        const areaData = data.variables[1];
        const codes = areaData.values;
        const names = areaData.valueTexts;

        for (let i = 0; i < codes.length; i++) {
            municipalityMap[names[i].toLowerCase()] = codes[i];
        }
    } catch (error) {
        console.error("Error loading municipality codes:", error);
    }
}

//this will Fetch the population data and render the line chart
async function fetchAndRenderChart(areaCode = "SSS", areaName = "whole country") {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(buildQuery(areaCode))
        });
        const result = await response.json();

        currentValues = result.value;
        currentLabels = [...years];

        const chartData = {
            labels: currentLabels,
            datasets: [
                {
                    name: "Population",
                    values: currentValues
                }
            ]
        };

        const chartTitle = `Population growth in ${areaName}`;

        if (!chart) {
            chart = new frappe.Chart("#chart", {
                title: chartTitle,
                data: chartData,
                type: "line",
                height: 450,
                colors: ["#eb5146"]
            });
        } else {
            chart.update({
                title: chartTitle,
                data: chartData
            });
        }

        //this will save the selected municipality code and name for newchart.html file
        localStorage.setItem("selectedAreaCode", areaCode);
        localStorage.setItem("selectedAreaName", areaName);

    } catch (error) {
        console.error("Error fetching population data:", error);
    }
}

// this will handle municipality search
document.getElementById("submit-data").addEventListener("click", () => {
    const input = document.getElementById("input-area").value.trim().toLowerCase();
    
    if (input === "" || input === "whole country" || input === "finland") {
        fetchAndRenderChart("SSS", "whole country");
        return;
    }

    const code = municipalityMap[input];
    if (code) {
        fetchAndRenderChart(code, input);
    } else {
        alert("Municipality not found. Please check spelling.");
    }
});

// will calculate the delta mean and predict next data point
document.getElementById("add-data").addEventListener("click", () => {
    if (!currentValues || currentValues.length < 2) return;

    let deltaSum = 0;
    for (let i = 1; i < currentValues.length; i++) {
        deltaSum += (currentValues[i] - currentValues[i - 1]);
    }
    const meanDelta = deltaSum / (currentValues.length - 1);
    const lastValue = currentValues[currentValues.length - 1];
    const predictedValue = Math.round(lastValue + meanDelta);

    const lastYear = parseInt(currentLabels[currentLabels.length - 1], 10);
    const nextYear = String(lastYear + 1);

    currentLabels.push(nextYear);
    currentValues.push(predictedValue);

    chart.addDataPoint(nextYear, [predictedValue]);
});

// will load the initial startup
async function init() {
    await loadMunicipalityCodes();
    fetchAndRenderChart("SSS", "whole country");
}

init();