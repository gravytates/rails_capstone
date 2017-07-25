var response;

// Ajax call
var loadData = function(){
  Promise.resolve(
    $.ajax({
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      url: '/parks',
      dataType: 'json',
      // timeout: 3000 //3 second timeout
    })
  ).then(function(data) {
    run(data);
  }).catch(function(e) {
    if(e.statusText == 'timeout')
    {
      alert('Native Promise: Failed from timeout');
    }
  });
};

// width and height for SVG element
var w = 800;
var h = 500;

// AlbersUSA projection
var projection = d3.geoAlbersUsa()
           .translate([w/2, h/2])
           .scale([250]);
//Define path generator
var path = d3.geoPath()
       .projection(projection);
  //Create SVG element
var svg = d3.select("body")
      .append("svg")
      .attr("width", w)
      .attr("height", h)
//Load in GeoJSON data

function error() {
    console.log("Something went wrong!");
}

function run() {

  d3.json('/park_data.json', function(error, data) {
    response = data
    console.log(response);
    if (error) {
      console.log(error);
    } else {
      alert('does this run at all?');
      console.log(response);
      // Bind data and create one path per GeoJSON feature
      svg.selectAll("path")
      .data(response.features)
      .enter()
      .append("path")
      .attr("d", path);
    }

  });
}


$(document).ready(function(){
  // loadData();
  run();
});
