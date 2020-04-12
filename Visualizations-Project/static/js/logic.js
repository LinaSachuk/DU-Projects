console.log('I am here');

d3.json('/data').then(function (data) {
    console.log(data);
})


d3.json('/prizes').then(function (data) {
    console.log(data);
})

// mapBounds = L.latLngBounds(southWest, northEast);
// var map = new L.Map(mapDivName,
//     {
//         center: [20, <code>0],
// 		zoom:</code> 3,
//             attributionControl: false
// 	}).addLayer(
//                 new L.TileLayer("http://{s}.tile2.opencyclemap.org/transport/{z}/{x}/{y}.png")
//             ).setMaxBounds(mapBounds);