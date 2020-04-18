

// Creating map object
var map = L.map('map', { scrollWheelZoom: false }).setView([43.64701, -79.39425], 2);

//creating a medal icon
var medalIcon = L.icon({
    iconUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/ed/Nobel_Prize.png/440px-Nobel_Prize.png',
    iconSize: [50, 50], // size of the icon
});

// var marker = L.marker([49, 32], { icon: medalIcon }).addTo(map);


// Adding tile layer
var baseMap = L.tileLayer(
    'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',
    {
        attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: API_KEY,
    }
).addTo(map);

var geojsonFeature = [{
    "type": "Feature",
    "properties": { "party": "Republican" },
    "geometry": {
        "type": "Polygon",
        "coordinates": [[
            [-104.05, 48.99],
            [-97.22, 48.98],
            [-96.58, 45.94],
            [-104.03, 45.94],
            [-104.05, 48.99]
        ]]
    }
}, {
    "type": "Feature",
    "properties": { "party": "Democrat" },
    "geometry": {
        "type": "Polygon",
        "coordinates": [[
            [-109.05, 41.00],
            [-102.06, 40.99],
            [-102.03, 36.99],
            [-109.04, 36.99],
            [-109.05, 41.00]
        ]]
    }
}];

var geojsonMarkerOptions = {
    radius: 30,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

function onEachFeature(feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties) {
        layer.bindPopup(feature.properties.ADMIN);
    }
}
function pointToLayer(feature, latlng) {
    return L.circleMarker(latlng, geojsonMarkerOptions);
}

// L.geoJSON(geojsonFeature, {
//     style: function (feature) {
//         switch (feature.properties.party) {
//             case 'Republican': return { color: "#ff0000" };
//             case 'Democrat': return { color: "#0000ff" };
//         }
//     },
//     onEachFeature: onEachFeature,
//     pointToLayer: pointToLayer
// }).addTo(map);


// // Uncomment this link local geojson for when data.beta.nyc is down
var link = 'static/data/nobelCountries.geojson';

// Our style object
var mapStyle = {
    color: '#df8a81',
    fillColor: 'pink',
    fillOpacity: 0.3,
    weight: 1.5,
};
// // Grabbing our GeoJSON data..
// d3.json(link, function (data) {
//     console.log(data)


//     // Creating a geoJSON layer with the retrieved data
//     var geojsonLayer = L.geoJson(data, {

//         // Passing in our style object
//         style: mapStyle,
//         onEachFeature: onEachFeature,
//     }).addTo(map);

// Grabbing our GeoJSON data..
d3.json(link, function (data) {
    console.log(data)
    filterData = data.features.filter(d => d.properties.ADMIN == 'Ukraine')

    // Creating a geoJSON layer with the retrieved data
    var geojsonLayer = L.geoJson(filterData, {

        // Passing in our style object
        style: mapStyle,
        onEachFeature: onEachFeature,
        pointToLayer: pointToLayer
    }).addTo(map);


    var marker = L.marker([49, 32], { icon: medalIcon }).addTo(map);

    // map.removeLayer(geojsonLayer)
    // map.addLayer(geojsonLayer);
});


// var attribution = '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'

// mapnikLayer = L.tileLayer(
//     'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
//     { attribution: attribution }
// )
// var blackAndWhite = L.tileLayer(
//     'http://{s}.www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png',
//     { attribution: attribution }
// )
// var clouds = L.tileLayer('http://{s}.tile.openweathermap.org/map/clouds/{z}/{x}/{y}.png', {
//     attribution: 'Map data &copy; <a href="http://openweathermap.org">OpenWeatherMap</a>',
//     opacity: 0.5
// })

// map = L.map('map', {
//     center: new L.LatLng(39.73, -104.99),
//     zoom: 10,
//     layers: [mapnikLayer, clouds]
// })

// var baseLayers = {
//     'Mapnik': mapnikLayer,
//     'Black and Whilte': blackAndWhite
// }
// var overlayLayers = {
//     'Clouds': clouds
// }

// var control = L.control.activeLayers(baseLayers, overlayLayers)
// control.addTo(map)

// // 'Mapnik'
// console.log(control.getActiveBaseLayer().name)

// //Clouds
// var overlayLayers = control.getActiveOverlayLayers()
// for (var overlayId in overlayLayers) {
//     console.log(overlayLayers[overlayId].name)
// }
