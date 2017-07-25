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
           .translate([w/2, h/2]);
          //  .scale([250]);
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

  d3.json('/park_data.json', function(json) {
    // if (error) {
    //   console.log(error);
    // } else {
    console.log(json);
    svg.selectAll("div")
    .data(json.features)
    .enter()
    .append("div")
    .attr("d", path);
    // }

  });
}


$(document).ready(function(){
  // loadData();
  run();
});
