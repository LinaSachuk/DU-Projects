
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

d3.json('../static/data/countries.json', function (coordinates) {
    console.log('coordinates:', coordinates)
    console.log('country name:', coordinates[0].name)
    console.log('country latlng:', coordinates[0].latlng)



})




// // Creating map object
// var map = L.map('map', {
//     center: [40.7128, -74.0059],
//     zoom: 11,
// });

// // Adding tile layer
// L.tileLayer(
//     'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',
//     {
//         attribution:
//             'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//         maxZoom: 18,
//         id: 'mapbox.streets',
//         accessToken: API_KEY,
//     }
// ).addTo(map);

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
                console.log('countBornCountryObject:', countBornCountryObject)





                // Counts how many total prizes each country has 
                let countObject = countries.reduce(
                    (map, value) => { map[value] = (map[value] || 0) + 1; return map },
                    {}
                )
                // console.log('countObject:', countObject)




                // two array for the countries and counts
                var uniqueCountry = Object.keys(countObject);
                // console.log('uniqueCountry:', uniqueCountry)
                var countOfCountry = Object.keys(countObject).map(key => countObject[key]);
                // console.log('countOfCountry:', countOfCountry)
                // cleaning countries names
                var index = uniqueCountry.indexOf("Czechoslovakia (now Czech Republic)");
                if (index !== -1) {
                    uniqueCountry[index] = "Czech Republic"
                    // console.log('uniqueCountry:', uniqueCountry)
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
                var gaugeValue = 356;
                var gaugeCountry = 'USA'

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
                    title: ` Bubble chart for countries with the Nobel prize affiliations`,
                    // xaxis: { title: 'Countries' },
                    tickmode: 'linear',
                    yaxis:
                        { title: 'Total counts of Nobel prizes per country' },
                    margin: {
                        'l': 100,
                        'r': 0,
                        't': 100,
                        'b': 150
                    }
                };


                //     // creating data variable
                var data = [trace];

                //     // create the bubble plot
                Plotly.newPlot('bubble', data, layout);


                // Bubble plot on-click 
                var bubble = document.getElementById('bubble')

                bubble.on('plotly_click', function (data) {
                    console.log('data:', data)
                    var x = [];
                    var y = [];



                    data.points.forEach(function (pt) {

                        x.push(pt.x);
                        console.log('pt.x:', pt.x)
                        console.log('x:', x)
                        y.push(pt.y);
                        console.log('y:', y)
                        gaugeCountry = pt.x
                        var updateData = {
                            'value': pt.y
                        }


                        Plotly.restyle('gauge', updateData);


                        var updateLayout = {
                            'title': `Total counts of Nobel prizes for <br><br>${gaugeCountry}`
                        };
                        Plotly.relayout('gauge', updateLayout)
                    });
                });



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
                            axis: { range: [null, 400] },
                            bar: { color: '#CA616A' },
                            steps: [
                                { range: [0, 50], color: '#fff0f2' },
                                { range: [50, 100], color: '#fedde0' },
                                { range: [100, 150], color: '#fecacf' },
                                { range: [150, 200], color: '#feb7bd' },
                                { range: [200, 250], color: '#fda3ab' },
                                { range: [250, 300], color: '#fd909a' },
                                { range: [300, 350], color: '#fc7d88' },
                                { range: [350, 400], color: '#fc6a77' },

                            ]
                        }
                    }
                ];

                var layout = {
                    title: {
                        text: `Total counts of Nobel prizes for <br><br>${gaugeCountry}`,
                        // font: {
                        //     family: 'Courier New, monospace',
                        //     size: 24
                        // },

                    }
                };

                Plotly.newPlot('gauge', data, layout);
            });
        });
    })
}

myPlot()