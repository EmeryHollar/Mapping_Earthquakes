// 1. Create the map object with center of Earth as center
// let map = L.map('mapid').setView([30, 30], 2);

// 2. Create the tile layer that will be the backgroud of our map
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps 
let baseMaps = {
    Street: streets,
    Dark: dark
};

// Create the map with center, zoom and default layer
let map = L.map('mapid', {
    center: [30, 30],
    zoom: 2,
    layers: [streets]
});
// Pass our map layers into our layers control(Leaflet) and add layers to the map
L.control.layers(baseMaps).addTo(map);
// Then we add our 'graymap' tile layer to the map
//streets.addTo(map);

// 3. Accessing the airport GeoJSON data through Github URL
let airportData = "https://raw.githubusercontent.com/EmeryHollar/Mapping_Earthquakes/main/majorAirports.json";


// 4. Grabbing our GeoJSON data
d3.json(airportData).then(function(data) {
    console.log(data)
    //.bindPopup("<h2>" + feature.properties.name + "</h2> <hr> <h3>" + feature.properties.city + "," + feature.properties.country + "</h3>" );
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

