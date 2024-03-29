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
d3.json(quakeData).then(function(data) {
    console.log(data)
    // Creating a GeoJSON layer with the retrieved data
    L.geoJSON(data).addTo(map);
});

// Creating the pointToLayer Function
// L.geoJson(sanFranAirport, {
    // Turning each feature into a map marker
   // pointToLayer: function(feature, latlng) {
       // console.log(feature)
      //  return L.marker(latlng)
   //     .bindPopup("<h2>" + feature.properties.name + "</h2> <hr> <h3>" + feature.properties.city + "," + feature.properties.country + "</h3>" );
 //   }
//}).addTo(map);
