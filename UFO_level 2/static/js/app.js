// bring in data from data.js
var tableData = data;

var tbody = d3.select("tbody"); //Select table 
//use for each loop to fill table
tableData.forEach(function(ufoSighting) {
    var row = tbody.append("tr");
    Object.entries(ufoSighting).forEach(function([key, value]) {
        var cell = row.append("td");
        cell.text(value);
    });
});

function UniqueNoJutsu(value, index, self) { 
    return self.indexOf(value) === index;
}
//Set dropdown
dropdowns = [
    {html:"#city", datafilter: function(sighting){return sighting.city;}},
    {html:"#state", datafilter: function(sighting){return sighting.state;}},
    {html:"#country", datafilter: function(sighting){return sighting.country;}},
    {html:"#shape", datafilter: function(sighting){return sighting.shape;}}
]
dropdowns.forEach(function(dropdown) {
    var drop_array = tableData.map(sighting => dropdown.datafilter(sighting)).filter(UniqueNoJutsu).sort();
    var dropdown_element = d3.select(dropdown.html);
    dropdown_element.append("option").text();
    drop_array.forEach(function(item) {
        dropdown_element.append("option").text(item);
    });
});
//Select button
var button = d3.select("#filter-btn");
//Create filterData Global Variable
var filteredData = tableData;
//Create the date filter on button click
button.on("click", function() {
    var forminputs = [
        {html:"#city", datafilter: function(sighting){return sighting.city;}},
        {html:"#state", datafilter: function(sighting){return sighting.state;}},
        {html:"#country", datafilter: function(sighting){return sighting.country;}},
        {html:"#shape", datafilter: function(sighting){return sighting.shape;}},
        {html:"#datetime", datafilter: function(sighting){return sighting.datetime;}}
    ]
    forminputs.forEach(function(input) {
        var inputValue = d3.select(input.html).property("value");
        console.log(inputValue)
        if(inputValue) {
            filteredData = filteredData.filter(sighting => input.datafilter(sighting) === inputValue);
        }
    });
    console.log(filteredData)
    tbody.html("");
    //append the filtered data to table
    filteredData.forEach(function(ufoSightings) {    
        var row = tbody.append("tr");
        Object.entries(ufoSightings).forEach(function([key, value]) {
            var cell = row.append("td");
            cell.text(value);
        });
    });
    //Reset filterData Global Variable
    filteredData = tableData;
});