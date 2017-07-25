// PATH GENERATOR
// var path = d3.geo.path();
var loadData = function(){
  $.ajax({
    type: 'GET',
    contentType: 'application/json; charset=utf-8',
    url: '/parks',
    dataType: 'json',
    success: function(data){
      drawBarPlot(data);
    },
    failure: function(result){
      error();
    }
  });
};

function drawBarPlot(data){
  console.log(data);
}

// var w = 500;
// var h = 300;
// //Define path generator, using the Albers USA projection
// var path = d3.geoPath()
//        .projection(d3.geoAlbersUsa());
// //Create SVG element
// var svg = d3.select("body")
//       .append("svg")
//       .attr("width", w)
//       .attr("height", h);
// //Load in GeoJSON data
// d3.json(dataset, function(json) {
//
//   //Bind data and create one path per GeoJSON feature
//   svg.selectAll("path")
//      .data(json.features)
//      .enter()
//      .append("path")
//      .attr("d", path);
//
// });

function error() {
    console.log("Something went wrong!");
}


// fetch data on page load
$(document).ready(function(){
  console.log('load?');
  loadData();
});
