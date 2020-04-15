
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
    console.log('country name:', coordinates[0].latlng)



})




// reading a laureates json 
d3.json('../static/data/laureates.json', function (laureates) {
    console.log('laureates:', laureates)
    console.log('laureates:', laureates[0].prizes[0].affiliations[0].country)


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


// function optionChanged() {
//     // Prevent the page from refreshing

//     // Select the input value from the form
//     var filter_id = d3.select('#selDataset').property('value');
//     //   console.log('filter_id:', filter_id);

//     // clear the input value
//     myPlot(filter_id);
//     // Build the plot with the new stock
// }

// Use d3.json() to fetch data from JSON file
// Incoming data is internally referred to as data
// 1967 1977
function myPlot(fyear = '1977') {
    d3.json('../static/data/prizes.json', function (data) {
        console.log('data:', data);

        var years = data.map(d => d.year);
        // array with unique values:
        years = years.filter((v, i, a) => a.indexOf(v) === i);
        console.log('years:', years);

        var categories = data.map(d => d.category);
        // array with unique values:
        categories = categories.filter((v, i, a) => a.indexOf(v) === i);
        console.log('categories:', categories);

        // Add ids to dropdown menu
        for (var i = 0; i < years.length; i++) {
            selectBox = d3.select('#selDataset');
            selectBox.append('option').text(years[i]);
        }

        // filter nobel prizes by year
        var chosenYear = data.filter(i => i.year.toString() === fyear);
        console.log('chosenYear:', chosenYear)


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
                    var share = '';
                    var lastName = '';
                    var motivation = '';
                    if (d.laureates) {
                        share = d.laureates[0].share

                        if (d.laureates[0].firstname) {
                            firstName = d.laureates[0].firstname
                        }

                        if (d.laureates[0].surname) {
                            lastName = d.laureates[0].surname
                        }

                        if (d.laureates[0].motivation) {
                            motivation = d.laureates[0].motivation
                        }
                    } else {
                        motivation = d.overallMotivation
                    }





                    return `<h3>${d.year}</h3><hr><h2>${d.category.toUpperCase()}</h2><hr><h4>${firstName} ${lastName}</h4><hr><p>Motivation : ${motivation}</p><p>Share: ${share}</p>`

                });

        }
        //     var year = sample.year;
        //     // console.log('id:', id);

        //     var washFrequency = data.metadata.filter(i => i.id.toString() === fid)[0]
        //         .wfreq;
        //     // console.log('washFrequency:', washFrequency);

        //     // getting sample-metadata
        //     var metadata = data.metadata.filter(i => i.id.toString() === fid)[0];
        //     // console.log('metadata:', metadata);

        //     var metadata_card = d3.select('#sample-metadata');

        //     // refreshing metadata_card
        //     metadata_card.html('');

        //     for (const [key, value] of Object.entries(metadata)) {
        //         console.log(key, value);
        //         metadata_card.append('p').text(`${key}: ${value}`);
        //     }

        //     // top 10 OTUs found in that individual
        //     // getting sample_values as the values for the bar chart.
        //     var sample_values = sample.sample_values.slice(0, 10).reverse();
        //     // console.log('sample_values:', sample_values);

        //     // getting otu_ids as the labels for the bar chart.
        //     var otu_ids = sample.otu_ids.slice(0, 10).reverse();
        //     console.log('otu_ids:', otu_ids);

        //     // getting otu_labels as the hovertext for the chart.
        //     var otu_labels = otu_ids.map(d => 'OTU ' + d);
        //     // console.log('otu_labels:', otu_labels);

        //     var trace1 = {
        //         x: sample_values,
        //         y: otu_labels,
        //         text: otu_ids,
        //         type: 'bar',
        //         orientation: 'h',
        //         marker: {
        //             color: '#83B588'
        //         }
        //     };

        //     // data
        //     var chartData = [trace1];

        //     // Apply the group bar mode to the layout
        //     var layout = {
        //         title: `Top 10 OTUs found in Subject ${id}`,
        //         xaxis: { title: 'Sample Values' },
        //         yaxis: { title: '' }
        //     };

        //     // Render the plot to the div tag with id "plot"
        //     Plotly.newPlot('bar', chartData, layout);

        //     // Create a bubble chart that displays each sample.
        //     // Use otu_ids for the x values.
        //     // Use sample_values for the y values.
        //     // Use sample_values for the marker size.
        //     // Use otu_ids for the marker colors.
        //     // Use otu_labels for the text values.

        //     var traceB = {
        //         x: otu_ids,
        //         y: sample_values,
        //         mode: 'markers',
        //         marker: {
        //             size: sample_values,
        //             color: otu_ids
        //         },
        //         text: otu_labels
        //     };

        //     // set the layout for the bubble plot
        //     var layoutB = {
        //         title: ` Bubble chart for each sample`,
        //         xaxis: { title: `OTU ID ${fid}` },
        //         tickmode: 'linear',

        //         yaxis: { title: 'Sample Values' }
        //     };

        //     // creating data variable
        //     var dataB = [traceB];

        //     // create the bubble plot
        //     Plotly.newPlot('bubble', dataB, layoutB);

        //     // the Gauge Chart
        //     // part of data to input
        //     var data = [
        //         {
        //             domain: { x: [0, 1], y: [0, 1] },
        //             value: washFrequency,
        //             type: 'indicator',
        //             mode: 'gauge+number',
        //             gauge: {
        //                 axis: { range: [null, 9] },
        //                 bar: { color: '#83A388' },
        //                 steps: [
        //                     { range: [0, 1], color: '#F8F3EB' },
        //                     { range: [1, 2], color: '#F4F1E4' },
        //                     { range: [2, 3], color: '#E9E7C8' },
        //                     { range: [3, 4], color: '#D5E599' },
        //                     { range: [4, 5], color: '#B6CD8F' },
        //                     { range: [5, 6], color: '#8AC085' },
        //                     { range: [6, 7], color: '#88BB8D' },
        //                     { range: [7, 8], color: '#83B588' },
        //                     { range: [8, 9], color: '#83A388' }
        //                 ]
        //             }
        //         }
        //     ];

        //     var layout = {
        //         title: {
        //             text: `Belly Button Washing Frequency <br> Scrubs per Week`
        //         }
        //     };

        //     Plotly.newPlot('gauge', data, layout);
    });
}

myPlot()