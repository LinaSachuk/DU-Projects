// Creating map object
var map = L.map('map', {
    center: [40.7128, -74.0059],
    zoom: 2,
});

// Adding tile layer
L.tileLayer(
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
    radius: 8,
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



// // If data.beta.nyc is down comment out this link
// var link = "http://data.beta.nyc//dataset/0ff93d2d-90ba-457c-9f7e-39e47bf2ac5f/resource/" +
// "35dd04fb-81b3-479b-a074-a27a37888ce7/download/d085e2f8d0b54d4590b1e7d1f35594c1pediacitiesnycneighborhoods.geojson";

// // Uncomment this link local geojson for when data.beta.nyc is down
var link = 'static/data/nobelCountries.geojson';

// Our style object
var mapStyle = {
    color: '#A04E55',
    fillColor: 'pink',
    fillOpacity: 0.4,
    weight: 1.5,
};

// Grabbing our GeoJSON data..
d3.json(link, function (data) {
    // Creating a geoJSON layer with the retrieved data
    L.geoJson(data, {
        // Passing in our style object
        style: mapStyle,
        onEachFeature: onEachFeature,
    }).addTo(map);
});
