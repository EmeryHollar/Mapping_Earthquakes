// Add console.log to check code
console.log("working");

// Create the tile layer that will be the backgroud of our map
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps 
let baseMaps = {
    "Streets": streets,
    "Satellite": satelliteStreets
};

// Create the map with center of center of US, zoom and default layer 
let map = L.map('mapid', {
    center: [39.5, -98.5],
    zoom: 3,
    layers: [streets]
});
// Pass our map layers into our layers control(Leaflet) and add layers to the map
L.control.layers(baseMaps).addTo(map);

// 3. Accessing the Earthquake data through URL
let quakeData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";


// 4. Grabbing our GeoJSON data
d3.json(quakeData).then(function (data) {
    console.log(data)
    // Creating a GeoJSON layer with the retrieved data
    //L.geoJSON(data).addTo(map);

    // Creating a GeoJSON layer with the retrieved data.
    L.geoJSON(data, {

        // We turn each feature into a circleMarker on the map.
        pointToLayer: function (feature, latlng) {
            console.log(data);
            return L.circleMarker(latlng);
        },
        // Set the style for each circleMarker using styleInfo function
        style: styleInfo,
        // Create a popup for each circleMarker
        onEachFeature: function(feature, layer) {
            layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
        }
    }).addTo(map);
});

// Creating a function to style the data. Pass mng into a function to calculate the radius. 
function styleInfo(feature) {
    return {
        opacity: 1,
        fillOpacity: 1,
        fillColor: getColor(feature.properties.mag),
        color: "#000000",
        radius: getRadius(feature.properties.mag),
        stroke: true,
        weight: 0.5
    };
}

// This function determines the color of circle based on the mag of the quake
function getColor(magnitude) {  
    if (magnitude > 5) {
        return "#ea2c2c";
      }
      if (magnitude > 4) {
        return "#ea822c";
      }
      if (magnitude > 3) {
        return "#ee9c00";
      }
      if (magnitude > 2) {
        return "#eecc00";
      }
      if (magnitude > 1) {
        return "#d4ee00";
      }
      return "#98ee00";
}
// This function determines the radius of the earthquake marker based on mng
function getRadius(magnitude) {
    if (magnitude === 0) {
        return 1;
    }
    return magnitude * 4;
}