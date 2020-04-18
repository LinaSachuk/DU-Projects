
// d3.json('/data').then(function (data) {
//     console.log(data);
// })




// adding header with Nobel Prize Facts table - scraped data from Nobel.org web site
d3.json('../static/data/facts.json', function (response) {

    // console.log(response);
    factst = d3.select('.factst');
    factst.append('p').text(response[0].title);
    factst.classed('golden', true)

    factsp = d3.select('.factsp');
    factsp.append('h5').text(response[0].p);

    factstable = d3.select('.factstable');
    factstable.html(response[0].facts)
    factstable.classed('table table-striped table-bordered table-hover table-responsive{-sm|-md|-lg|-xl}', true)


})


// creating an anime circle, using JavaScript animation library
const wrapperEl = document.querySelector('.animeCircle');
const numberOfEls = 120;
const duration = 20000;
const delay = duration / numberOfEls;

let tl = anime.timeline({
    duration: delay,
    complete: function () { tl.restart(); }
});

function createEl(i) {
    let el = document.createElement('div');
    const rotate = (360 / numberOfEls) * i;
    const translateY = -40;
    const hue = Math.round(360 / numberOfEls * i);
    el.classList.add('el');
    // el.style.backgroundColor = 'hsl(' + hue + ', 50%, 60%)';
    el.style.transform = 'rotate(' + rotate + 'deg) translateY(' + translateY + '%)';
    tl.add({
        begin: function () {
            anime({
                targets: el,
                // backgroundColor: ['hsl(' + hue + ', 40%, 60%)', 'hsl(' + hue + ', 60%, 80%)'],
                rotate: [rotate + 'deg', rotate + 10 + 'deg'],
                translateY: [translateY + '%', translateY + 10 + '%'],
                scale: [1, 1.55],
                easing: 'easeInOutSine',
                direction: 'alternate',
                duration: duration * .1
            });
        }
    });
    wrapperEl.appendChild(el);
};

for (let i = 0; i < numberOfEls; i++) createEl(i);






// adding round-log
var roundLogEl = document.querySelector('.round-log');

anime({
    targets: roundLogEl,
    innerHTML: [0, 597],
    duration: 1000,
    easing: 'linear',
    round: 10 // Will round the animated value to 1 decimal
});


function optionChanged() {
    // Prevent the page from refreshing

    // Select the input value from the form
    var filter_year = d3.select('#selDataset').property('value');
    //   console.log('filter_id:', filter_id);

    // clear the input value
    myPlot(filter_year);
    // Build the plot with the new stock
}

// Use d3.json() to fetch data from JSON file
// Incoming data is internally referred to as data
// 1967 1977 2003
function myPlot(fyear = '2003') {
    // console.log('fyear:', fyear)

    // reading a prizes json 
    d3.json('../static/data/prizes.json', function (prizes) {
        console.log('prizes:', prizes);

        // reading a laureates json 
        d3.json('../static/data/laureates.json', function (laureates) {
            console.log('laureates:', laureates)


            d3.csv("../static/data/nobel.csv", function (data) {
                csvData = data;
                console.log('csvData:', data)

                d3.json('../static/data/countries.json', function (coordinates) {
                    console.log('coordinates:', coordinates)
                    console.log('country name:', coordinates[0].name)
                    console.log('country latlng:', coordinates[0].latlng)






                    // array with unique values: 30 countries
                    var countries = laureates.map(d => {
                        return d.prizes[0].affiliations[0].country

                    });
                    // console.log('countries:', countries)

                    // getting all countries with prizes
                    var affiliations = laureates.map(d => {
                        return d.prizes[0].affiliations
                    });
                    // console.log('affiliations:', affiliations)


                    unique_countries = countries.filter((v, i, a) => a.indexOf(v) === i);
                    // console.log('unique_countries:', unique_countries)


                    // cleaning countries names
                    var index = unique_countries.indexOf("Czechoslovakia (now Czech Republic)");
                    if (index !== -1) {
                        unique_countries[index] = "Czech Republic"
                        // console.log('unique_countries:', unique_countries)
                    }

                    // getting born Countries for all laureates
                    var bornCountries = laureates.map(d => {
                        return d.bornCountry
                    });
                    // array with unique values: 124 born countries
                    bornCountries = bornCountries.filter((v, i, a) => a.indexOf(v) === i);
                    // console.log('bornCountries:', bornCountries)

                    // Counts how many laureates for each born country 
                    let countBornCountryObject = bornCountries.reduce(
                        (map, value) => { map[value] = (map[value] || 0) + 1; return map },
                        {}
                    )
                    // console.log('countBornCountryObject:', countBornCountryObject)





                    // Counts how many total prizes each country has 
                    let countObject = countries.reduce(
                        (map, value) => { map[value] = (map[value] || 0) + 1; return map },
                        {}
                    )

                    delete countObject["undefined"]
                    delete countObject["Germany (now France)"]
                    delete countObject["USSR (now Russia)"]

                    console.log('countObject:', countObject)




                    // two array for the countries and counts
                    var uniqueCountry = Object.keys(countObject);
                    // console.log('uniqueCountry:', uniqueCountry)
                    var countOfCountry = Object.keys(countObject).map(key => countObject[key]);
                    // console.log('countOfCountry:', countOfCountry)
                    // cleaning countries names
                    var index = uniqueCountry.indexOf("Czechoslovakia (now Czech Republic)");
                    if (index !== -1) {
                        uniqueCountry[index] = "Czech Republic"
                        console.log('uniqueCountry:', uniqueCountry)
                    }
                    var index2 = uniqueCountry.indexOf("the Netherlands");
                    if (index2 !== -1) {
                        uniqueCountry[index2] = "Netherlands"
                        console.log('uniqueCountry:', uniqueCountry)
                    }






                    // array with unique values: 119 years
                    var years = prizes.map(d => d.year);
                    years = years.filter((v, i, a) => a.indexOf(v) === i);
                    // console.log('years:', years);

                    // array with unique values: 6 categories
                    var categories = prizes.map(d => d.category);
                    categories = categories.filter((v, i, a) => a.indexOf(v) === i);
                    // console.log('categories:', categories);

                    // Add ids to dropdown menu
                    for (var i = 0; i < years.length; i++) {
                        selectBox = d3.select('#selDataset');
                        selectBox.append('option').text(years[i]);
                    }

                    // filter nobel prizes by year
                    var chosenYear = prizes.filter(i => i.year.toString() === fyear);
                    // console.log('chosenYear:', chosenYear)

                    //max laureates - 3
                    var maxLaureates = prizes.filter(i => {
                        if (i.laureates) {
                            return i.laureates.length == 3
                        }
                    });
                    // console.log('maxLaureates:', maxLaureates)

                    var prizeByYear_cards = d3.select('#prizeByYear');

                    // refreshing prizeByYear_cards
                    prizeByYear_cards.html('');


                    // Add cards with info for year
                    for (var i = 0; i < chosenYear.length; i++) {


                        d3.select('#prizeByYear')
                            .selectAll("div")
                            .data(chosenYear)
                            .enter()
                            .append("div")
                            .classed("col-lg-3 nobelCards text-center", true)
                            .html(function (d) {

                                var firstName = '';
                                var lastName = '';
                                var firstName1 = '';
                                var lastName1 = '';
                                var firstName2 = '';
                                var lastName2 = '';

                                var motivation = '';
                                var share = '';
                                if (d.laureates) {
                                    share = d.laureates[0].share

                                    if (d.laureates[0].firstname) {
                                        firstName = d.laureates[0].firstname
                                    }

                                    if (d.laureates[0].surname) {
                                        lastName = d.laureates[0].surname
                                    }

                                    if (d.laureates[1]) {

                                        if (d.laureates[1].firstname) {
                                            firstName1 = d.laureates[1].firstname
                                        }

                                        if (d.laureates[1].surname) {
                                            lastName1 = d.laureates[1].surname
                                        }
                                    }
                                    if (d.laureates[2]) {
                                        if (d.laureates[2].firstname) {
                                            firstName2 = d.laureates[2].firstname
                                        }

                                        if (d.laureates[2].surname) {
                                            lastName2 = d.laureates[2].surname
                                        }
                                    }

                                    if (d.laureates[0].motivation) {
                                        motivation = d.laureates[0].motivation
                                    }
                                } else {
                                    motivation = d.overallMotivation
                                }

                                return `<h3 >${d.year}</h3><hr><h2 class='golden-background'>${d.category.toUpperCase()}</h2><hr><h4>${firstName} ${lastName}</h4><hr><h4>${firstName1} ${lastName1}</h4><hr><h4>${firstName2} ${lastName2}</h4><p>Motivation : ${motivation}</p><p>Share: ${share}</p>`

                            });

                    }



                    // console.log('countObject:', countObject)
                    // console.log('uniqueCountry:', uniqueCountry)
                    // console.log('countOfCountry:', countOfCountry)


                    //     // Creating a bubble chart that displays each country.
                    //     // Using uniqueCountry for the x values.
                    //     // Using countOfCountry for the y values.
                    //     // Using countOfCountry for the marker size.
                    //     // Using uniqueCountry for the marker colors.
                    //     // Using uniqueCountry for the text values.
                    function size(countOfCountry) {
                        return countOfCountry.map(d => 20 + d / 5)
                    }

                    // default values for gauge
                    var gaugeValue = 597;
                    var gaugeCountry = 'all countries'

                    var trace = {
                        x: uniqueCountry,
                        y: countOfCountry,
                        mode: 'markers',
                        marker: {
                            size: size(countOfCountry),
                            color: countOfCountry
                        },
                        text: uniqueCountry
                    };

                    //     // set the layout for the bubble plot
                    var layout = {
                        title: ` Countries with the Nobel Prize affiliations`,
                        font: {
                            family: 'Courier New, monospace',
                            size: 15.8,
                            color: "#CF6873"
                        },
                        // xaxis: { title: 'Countries' },
                        tickmode: 'linear',
                        yaxis:
                            { title: 'Counts of Nobel Prizes' },
                        margin: {
                            'l': 100,
                            'r': 0,
                            't': 100,
                            'b': 200
                        }
                    };


                    //     // creating data variable
                    var data = [trace];

                    //     // create the bubble plot
                    Plotly.newPlot('bubble', data, layout);





                    //     // the Gauge Chart
                    //     // part of data to input


                    //  var countForOneCountry = 
                    //  countOfCountry
                    var data = [
                        {
                            domain: { x: [0, 1], y: [0, 1] },
                            value: gaugeValue,
                            type: 'indicator',
                            mode: 'gauge+number',
                            gauge: {
                                axis: { range: [null, 600] },
                                bar: { color: '#df8a81' },
                                steps: [
                                    { range: [0, 100], color: '#fff6f0' },
                                    { range: [100, 200], color: '#feebdd' },
                                    { range: [200, 300], color: '#fedfca' },
                                    { range: [300, 400], color: '#fed4b7' },
                                    { range: [400, 500], color: '#fdc9a3' },
                                    { range: [500, 600], color: '#fdbd90' },

                                ]
                            }
                        }
                    ];

                    var layout = {
                        title: {
                            text: `Nobel Prizes for <br><br>${gaugeCountry}`,
                            font: {
                                family: 'Courier New, monospace',
                                size: 21,
                                color: "#CF6873"
                            },

                        }
                    };

                    Plotly.newPlot('gauge', data, layout);








                    // map creation
                    // map creation
                    // map creation
                    // map creation
                    // map creation




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

                    var geojsonLayer;
                    var marker;

                    function onEachFeature(feature, layer) {
                        // does this feature have a property named popupContent?
                        if (feature.properties) {
                            layer.bindPopup(feature.properties.ADMIN);
                        }
                    }

                    var geojsonMarkerOptions = {
                        radius: 30,
                        fillColor: "#ff7800",
                        color: "#000",
                        weight: 1,
                        opacity: 1,
                        fillOpacity: 0.8
                    };

                    function pointToLayer(feature, latlng) {
                        console.log(feature, latlng)
                        return new L.CircleMarker(latlng, {
                            radius: 10,
                            fillOpacity: 0.85
                        });
                    }
                    function pointToLayer(feature, latlng) {
                        return L.circleMarker(latlng, geojsonMarkerOptions);
                    }

                    // getting countries shapes
                    var link = 'static/data/nobelCountries.geojson';

                    // Our style object
                    var mapStyle = {
                        color: '#df8a81',
                        fillColor: 'pink',
                        fillOpacity: 0.3,
                        weight: 1.5,
                    };
                    // Grabbing our GeoJSON data..
                    d3.json(link, function (data) {
                        console.log(data)

                        // Creating a geoJSON layer with the retrieved data
                        geojsonLayer = L.geoJson(data, {

                            // Passing in our style object
                            style: mapStyle,
                            onEachFeature: onEachFeature,
                        })
                        geojsonLayer.addTo(map);
                    });
                    marker = L.marker([43.64701, -79.39425], { icon: medalIcon });

                    // // Grabbing our filtered GeoJSON data..
                    // d3.json(link, function (data) {
                    //     console.log(data)
                    //     filterData = data.features.filter(d => d.properties.ADMIN == 'Ukraine')

                    //     // Creating a geoJSON layer with the retrieved data
                    //     var geojsonLayer = L.geoJson(filterData, {

                    //         // Passing in our style object
                    //         style: mapStyle,
                    //         // pointToLayer: pointToLayer,
                    //         onEachFeature: onEachFeature
                    //     }).addTo(map);

                    //     var chosenCoordinates = coordinates.filter(d => d.name == 'Ukraine')
                    //     console.log('chosenCoordinates:', chosenCoordinates)
                    //     var chosenLatLng = chosenCoordinates[0].latlng
                    //     console.log('chosenLatLng:', chosenLatLng)

                    //     var marker = L.marker(chosenLatLng, { icon: medalIcon }).addTo(map);
                    //     map.flyTo(chosenLatLng, 4)
                    //     // map.removeLayer(geojsonLayer)
                    //     // map.addLayer(geojsonLayer);
                    // });









                    // Bubble plot on-click 
                    var bubble = document.getElementById('bubble')

                    bubble.on('plotly_click', function (data) {
                        data.points.forEach(function (pt) {

                            // console.log('pt.x:', pt.x)
                            // console.log('pt.y:', pt.y)

                            gaugeCountry = pt.x
                            console.log('pt.x:', pt.x)

                            var updateData = {
                                'value': pt.y
                            }

                            //updating gauge value
                            Plotly.restyle('gauge', updateData);


                            var updateLayout = {
                                'title': `Nobel Prizes for <br><br>${gaugeCountry}`,
                            };

                            // updating gauge title
                            Plotly.relayout('gauge', updateLayout)


                            // changing the map om the fly

                            // // Grabbing our GeoJSON data and filtering on the fly
                            d3.json(link, function (data) {
                                console.log(data)
                                filterData = data.features.filter(d => d.properties.ADMIN == gaugeCountry)
                                console.log('filterData:', filterData)

                                map.removeLayer(geojsonLayer)
                                map.removeLayer(marker);
                                //     // Creating a geoJSON layer with the retrieved data
                                geojsonLayer = L.geoJson(filterData, {

                                    //         // Passing in our style object
                                    style: mapStyle,
                                    //         // pointToLayer: pointToLayer,
                                    onEachFeature: onEachFeature
                                });
                                geojsonLayer.addTo(map);

                                var chosenCoordinates = coordinates.filter(d => d.name == gaugeCountry)
                                console.log('chosenCoordinates:', chosenCoordinates)
                                var chosenLatLng = chosenCoordinates[0].latlng
                                //     console.log('chosenLatLng:', chosenLatLng)

                                marker = L.marker(chosenLatLng, { icon: medalIcon }).addTo(map);
                                map.flyTo(chosenLatLng, 5)
                                //     // map.removeLayer(geojsonLayer)
                                //     // map.addLayer(geojsonLayer);
                            });







                        });
                    });






                })

            });
        });
    })
}

myPlot()