
Promise.all([
    d3.json("../data/prizes.json")
]).then(function (data) {
    console.log(data[0]);
});

console.log('I am here');