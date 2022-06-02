// Add console.log to check to see if our code is working
console.log("working");

// Create the map object with a center and zoom level
let map = L.map('mapid').setView([40.7, -94.5], 4);

//Get data from cities.js
let cityData = cities;

// Loop through the cities array and create a marker per city. Add pop up
for (let city of cityData) {
    console.log(city)
    L.marker(city.location)
    .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
    .addTo(map);

};






// Create the tile layer that will be the backgroud of our map
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});
// Then we add our 'graymap' tile layer to the map
streets.addTo(map);