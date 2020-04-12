console.log('I am here');

// d3.json('/data').then(function (data) {
//     console.log(data);
// })


d3.json('../static/data/facts.json', function (response) {

    console.log(response);
})

// Creating map object
var map = L.map('map', {
    center: [40.7128, -74.0059],
    zoom: 11,
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




