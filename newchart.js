const API_URL = "https://statfin.stat.fi/PxWeb/api/v1/en/StatFin/synt/12dy.px";

const years = [
    "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007",
    "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015",
    "2016", "2017", "2018", "2019", "2020", "2021"
];

// Helper function to construct query for specific contentscode (births or deaths)
function buildSubQuery(areaCode, contentsCode) {
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
                    values: [contentsCode]
                }
            }
        ],
        response: {
            format: "json-stat2"
        }
    };
}

async function loadBirthAndDeathChart() {
    // this will read municipality selected from index.html or default to whole country
    const areaCode = localStorage.getItem("selectedAreaCode") || "SSS";
    const areaName = localStorage.getItem("selectedAreaName") || "whole country";

    try {
        // this will make two separate POST requests as requested in task 5
        const [birthRes, deathRes] = await Promise.all([
            fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(buildSubQuery(areaCode, "synt-vm01"))
            }),
            fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(buildSubQuery(areaCode, "synt-vm11"))
            })
        ]);

        const birthData = await birthRes.json();
        const deathData = await deathRes.json();

        const chartData = {
            labels: years,
            datasets: [
                {
                    name: "Births",
                    values: birthData.value
                },
                {
                    name: "Deaths",
                    values: deathData.value
                }
            ]
        };

        new frappe.Chart("#chart", {
            title: `Births and deaths in ${areaName}`,
            data: chartData,
            type: "bar",
            height: 450,
            colors: ["#63d0ff", "#363636"]
        });

    } catch (error) {
        console.error("Error loading birth and death data:", error);
    }
}

loadBirthAndDeathChart();