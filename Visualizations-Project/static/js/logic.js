

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

// getting a selected year value
function optionChanged() {
    // Select the input value from the selection
    var filter_year = d3.select('#selDataset').property('value');
    //   console.log('filter_id:', filter_id);
    myPlot(filter_year);
}



// // set globally map variable
// var map = null;



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


                    // deleting an old map
                    var container = L.DomUtil.get('map');
                    if (container != null) {
                        container._leaflet_id = null;
                    }

                    // initializing a new map
                    var map = L.map('map', { scrollWheelZoom: false }).setView([46, 2], 1);


                    // // // Creating map object
                    // var map = L.map('map', { scrollWheelZoom: false }).setView([46, 2], 1);




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


                    // // adding animation for the cards
                    // event handling
                    d3.selectAll(".nobelCards")
                        .on("click", function (d, i) {

                            console.log('i:', i)
                            console.log('d:', d)
                            console.log(laureates)
                            var idsForCards = []
                            var laureatesForCard = []
                            var color = '#e3c591'
                            if (d.laureates) {
                                d.laureates.forEach(element => idsForCards.push(element.id))

                                console.log('idsForCards:', idsForCards)

                                for (let j = 0; j < idsForCards.length; j++) {
                                    for (let i = 0; i < laureates.length; i++) {
                                        if (laureates[i].id == idsForCards[j]) {
                                            laureatesForCard.push(laureates[i].gender);
                                        }
                                    }
                                }
                                console.log('laureatesForCard:', laureatesForCard)

                                var female = laureatesForCard.filter(d => d == 'female')
                                var male = laureatesForCard.filter(d => d == 'male')
                                if (female.length > 0) {
                                    color = '#FFDCE5'
                                }
                                if (male.length > 0) {
                                    color = '#DCE5FF'
                                }

                            }


                            d3.select(this)


                            var test = anime({
                                targets: this,
                                backgroundColor: color,
                                rotateY: [{ value: "360deg", duration: 1000 }],
                                // translateY: '10vh',
                                duration: 1000,
                                loop: false,
                                direction: 'alternate',
                                easing: 'easeInCubic',
                                //new code
                                scaleX: {
                                    value: 1.05,
                                    duration: 150,
                                    delay: 268
                                }
                            });
                            // // Get current event info
                            // console.log('d3.event:', d3.event)



                            d3.selectAll(".nobelCards").on("dblclick", function (d) {

                                var categoryUpperCase = d.category.toUpperCase();

                                swal({
                                    title: "Good job!",
                                    text: `You like ${categoryUpperCase}!  Maybe you will be the next year Nobel laureate!`,
                                    icon: "success",
                                    button: "Aww yiss!",

                                })
                            });
                            // // Get x & y co-ordinates
                            // console.log(d3.mouse(this));
                        })


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
                        return countOfCountry.map(d => 15 + d / 2.5)
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
                            color: [100, 10, 36, 191, 356, 17, 8, 1, 6, 6, 18, 1, 24, 8, 1, 1, 5, 2, 5, 3, 1, 1, 1, 1, 4, 5, 1],
                            colorscale: 'Rainbow'
                        },
                        text: uniqueCountry
                    };

                    //     // set the layout for the bubble plot
                    var layout = {
                        title: ` Countries with the Nobel Prize affiliations`,
                        font: {
                            family: 'Courier New, monospace',
                            size: 15.8,
                            color: "#ac434e"
                        },
                        // xaxis: { title: 'Countries' },
                        tickmode: 'linear',
                        yaxis:
                            { title: 'Counts of Nobel Prizes' },
                        margin: {
                            'l': 100,
                            'r': 0,
                            't': 50,
                            'b': 150
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
                                bar: { color: '#ac434e' },
                                steps: [
                                    { range: [0, 100], color: '#F3E4E5' },
                                    { range: [100, 200], color: '#E7C9CC' },
                                    { range: [200, 300], color: '#DBAEB3' },
                                    { range: [300, 400], color: '#CF9399' },
                                    { range: [400, 500], color: '#C37880' },
                                    { range: [500, 600], color: '#C36872' },

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
                                color: "#ac434e"
                            },

                        }
                    };

                    Plotly.newPlot('gauge', data, layout);








                    // map creation
                    // map creation
                    // map creation
                    // map creation
                    // map creation


                    //creating a medal icon
                    var medalIcon = L.icon({
                        iconUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/ed/Nobel_Prize.png/440px-Nobel_Prize.png',
                        iconSize: [35, 35], // size of the icon
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



                    // getting countries shapes
                    var link = 'static/data/nobelCountries.geojson';

                    // Our style object
                    var mapStyle = {
                        color: '#ac434e',
                        fillColor: '#cf6873',
                        fillOpacity: 0.4,
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





                    // Bubble plot on-click 
                    // Bubble plot on-click 
                    // Bubble plot on-click 
                    // Bubble plot on-click 
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
                            // Our style object
                            var mapNewStyle = {
                                color: '#ac434e',
                                fillColor: 'purple',
                                fillOpacity: 0.5,
                                weight: 1.5,
                            };
                            // // Grabbing our GeoJSON data and filtering on the fly
                            d3.json(link, function (data) {
                                console.log(data)
                                filterData = data.features.filter(d => d.properties.ADMIN == gaugeCountry)
                                console.log('filterData:', filterData)

                                // removing a layer and a marker from the map
                                map.removeLayer(geojsonLayer)
                                map.removeLayer(marker);

                                // adding a new layer
                                //     // Creating a geoJSON layer with the retrieved data
                                geojsonLayer = L.geoJson(filterData, {
                                    //         // Passing in our style object
                                    style: mapNewStyle,
                                    //         // pointToLayer: pointToLayer,
                                    onEachFeature: onEachFeature
                                });
                                geojsonLayer.addTo(map);


                                var chosenCoordinates = coordinates.filter(d => d.name == gaugeCountry)
                                console.log('chosenCoordinates:', chosenCoordinates)
                                var chosenLatLng = chosenCoordinates[0].latlng
                                //     console.log('chosenLatLng:', chosenLatLng)

                                // adding a new marker
                                marker = L.marker(chosenLatLng, { icon: medalIcon }).addTo(map);
                                map.flyTo(chosenLatLng, 4)


                            });







                        });
                    });






                })

            });
        });
    })
}

myPlot()