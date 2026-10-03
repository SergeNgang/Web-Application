// this will initialize Leaflet map with required minZoom: -3
const map = L.map("map", {
    minZoom: -3
});
// this will add OpenStreetMap Background tile layer 
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

//  migration of the given data query 
const migrationQuery = {
    "query": [
        {
            "code": "alue_23_20260101",
            "selection": {
                "filter": "agg:_Kunnat aakkosjärjestyksessä 2026.agg",
                "values": [
                    "SSS", "KU020", "KU005", "KU009", "KU010", "KU016", "KU018", "KU019", "KU035", "KU043",
                    "KU046", "KU047", "KU049", "KU050", "KU051", "KU052", "KU060", "KU061", "KU062", "KU065",
                    "KU069", "KU071", "KU072", "KU074", "KU075", "KU076", "KU077", "KU078", "KU079", "KU081",
                    "KU082", "KU086", "KU111", "KU090", "KU091", "KU097", "KU098", "KU102", "KU103", "KU105",
                    "KU106", "KU108", "KU109", "KU139", "KU140", "KU142", "KU143", "KU145", "KU146", "KU153",
                    "KU148", "KU149", "KU151", "KU152", "KU165", "KU167", "KU169", "KU170", "KU171", "KU172",
                    "KU176", "KU177", "KU178", "KU179", "KU181", "KU182", "KU186", "KU202", "KU204", "KU205",
                    "KU208", "KU211", "KU213", "KU214", "KU216", "KU217", "KU218", "KU224", "KU226", "KU230",
                    "KU231", "KU232", "KU233", "KU235", "KU236", "KU239", "KU240", "KU320", "KU241", "KU322",
                    "KU244", "KU245", "KU249", "KU250", "KU256", "KU257", "KU260", "KU261", "KU263", "KU265",
                    "KU271", "KU272", "KU273", "KU275", "KU276", "KU280", "KU284", "KU285", "KU286", "KU287",
                    "KU288", "KU290", "KU291", "KU295", "KU297", "KU300", "KU301", "KU304", "KU305", "KU312",
                    "KU316", "KU317", "KU318", "KU398", "KU399", "KU400", "KU407", "KU402", "KU403", "KU405",
                    "KU408", "KU410", "KU416", "KU417", "KU418", "KU420", "KU421", "KU422", "KU423", "KU425",
                    "KU426", "KU444", "KU430", "KU433", "KU434", "KU435", "KU436", "KU438", "KU440", "KU441",
                    "KU475", "KU478", "KU480", "KU481", "KU483", "KU484", "KU489", "KU491", "KU494", "KU495",
                    "KU498", "KU499", "KU500", "KU503", "KU504", "KU505", "KU508", "KU507", "KU529", "KU531",
                    "KU535", "KU536", "KU538", "KU541", "KU543", "KU545", "KU560", "KU561", "KU562", "KU563",
                    "KU564", "KU309", "KU576", "KU577", "KU578", "KU445", "KU580", "KU581", "KU599", "KU583",
                    "KU854", "KU584", "KU592", "KU593", "KU595", "KU598", "KU601", "KU604", "KU607", "KU608",
                    "KU609", "KU611", "KU638", "KU614", "KU615", "KU616", "KU619", "KU620", "KU623", "KU624",
                    "KU625", "KU626", "KU630", "KU631", "KU635", "KU636", "KU678", "KU710", "KU680", "KU681",
                    "KU683", "KU684", "KU686", "KU687", "KU689", "KU691", "KU694", "KU697", "KU698", "KU700",
                    "KU702", "KU704", "KU707", "KU729", "KU732", "KU734", "KU736", "KU790", "KU738", "KU739",
                    "KU740", "KU742", "KU743", "KU746", "KU747", "KU748", "KU791", "KU749", "KU751", "KU753",
                    "KU755", "KU758", "KU759", "KU761", "KU762", "KU765", "KU766", "KU768", "KU771", "KU777",
                    "KU778", "KU781", "KU783", "KU831", "KU832", "KU833", "KU834", "KU837", "KU844", "KU845",
                    "KU846", "KU848", "KU849", "KU850", "KU851", "KU853", "KU857", "KU858", "KU859", "KU886",
                    "KU887", "KU889", "KU890", "KU892", "KU893", "KU895", "KU785", "KU905", "KU908", "KU092",
                    "KU915", "KU918", "KU921", "KU922", "KU924", "KU925", "KU927", "KU931", "KU934", "KU935",
                    "KU936", "KU941", "KU946", "KU976", "KU977", "KU980", "KU981", "KU989", "KU992"
                ]
            }
        },
        {
            "code": "timeperiod_y",
            "selection": {
                "filter": "item",
                "values": ["2024"]
            }
        },
        {
            "code": "sukupuoli_9_20180101",
            "selection": {
                "filter": "item",
                "values": ["SSS"]
            }
        },
        {
            "code": "ikaryhma_10_20180101",
            "selection": {
                "filter": "item",
                "values": ["SSS"]
            }
        },
        {
            "code": "contentscode",
            "selection": {
                "filter": "item",
                "values": ["muutl-vm43_tulo", "muutl-vm43_lahto"]
            }
        }
    ],
    "response": {
        "format": "json-stat2"
    }
};

async function loadMapData() {
    try {
        // this  fetches GeoJSON boundaries
        const geoResponse = await fetch("https://geo.stat.fi/geoserver/wfs?service=WFS&version=2.0.0&request=GetFeature&typeName=tilastointialueet:kunta4500k&outputFormat=json&srsName=EPSG:4326");
        const geoData = await geoResponse.json();

        // this fetches migration the  data 
        const statResponse = await fetch("https://pxdata.stat.fi/PxWeb/api/v1/fi/StatFin/muutl/11a2.px", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(migrationQuery)
        });
        const statData = await statResponse.json();

        // Map municipality codes to their positive and negative migration values
        // Every other value in the value list is positive, and every other is negative
        const migrationMap = {};
        const areaCodes = Object.keys(statData.dimension["alue_23_20260101"].category.index);
        const values = statData.value;

        areaCodes.forEach((code, index) => {
            const positive = values[index * 2];
            const negative = values[index * 2 + 1];
            migrationMap[code] = {
                positive: positive !== undefined ? positive : 0,
                negative: negative !== undefined ? negative : 1
            };
        });

        // Create the GeoJSON layer with custom styling and popups/tooltips
        const geojsonLayer = L.geoJSON(geoData, {
            style: function (feature) {
                const props = feature.properties;
                const rawCode = props.kunta || props.NATCODE || props.code || "";
                // Match "KU" prefix format like "KU020"
                const formattedCode = rawCode.startsWith("KU") ? rawCode : "KU" + rawCode;
                const migData = migrationMap[formattedCode] || { positive: 0, negative: 1 };

                // Calculation of  Hue according to the given formula:
                // hue = ((positive / negative) ** 3) * 60, should be capped at max 120
                const ratio = migData.positive / (migData.negative || 1);
                let hue = Math.pow(ratio, 3) * 60;
                if (hue > 120) {
                    hue = 120;
                }

                return {
                    weight: 2,
                    color: `hsl(${hue}, 75%, 50%)`,
                    fillColor: `hsl(${hue}, 75%, 50%)`,
                    fillOpacity: 0.6
                };
            },
            onEachFeature: function (feature, layer) {
                const props = feature.properties;
                const muniName = props.nimi || props.name || props.nimi_fi || "Municipality";
                const rawCode = props.kunta || props.NATCODE || props.code || "";
                const formattedCode = rawCode.startsWith("KU") ? rawCode : "KU" + rawCode;
                const migData = migrationMap[formattedCode] || { positive: 0, negative: 0 };

                // Tooltip that will show municipality name when hovered
                layer.bindTooltip(muniName);

                // Popup that will show name, positive, and negative migration on click
                layer.bindPopup(`
                    <b>${muniName}</b><br>
                    Positive migration: ${migData.positive}<br>
                    Negative migration: ${migData.negative}
                `);
            }
        }).addTo(map);

        // Fits the  map bounds to the GeoJSON data layer
        map.fitBounds(geojsonLayer.getBounds());

    } catch (err) {
        console.error("Error loading map or migration data:", err);
    }
}

loadMapData();