
// Ajax call
// var loadData = function(){
//   Promise.resolve(
//     $.ajax({
//       type: 'GET',
//       contentType: 'application/json; charset=utf-8',
//       url: '/parks',
//       dataType: 'json',
//       // timeout: 3000 //3 second timeout
//     })
//   ).then(function(data) {
//     run(data);
//   }).catch(function(e) {
//     if(e.statusText == 'timeout')
//     {
//       alert('Native Promise: Failed from timeout');
//     }
//   });
// };

// width and height for SVG element
var response;
var scale = 4000;



$(document).ready(function(){
  // loadData();
  run();
  var w = 800;
  var h = 500;

  // AlbersUSA projection
  var projection = d3.geoAlbersUsa()
  .translate([w/0.6, h/0.6])
  .scale([scale]);
  //  .scale([250]);
  //Define path generator
  var path = d3.geoPath(projection);
  //  .projection(projection);
  //Create SVG element
  var svg = d3.select("body")
  .append("svg")
  .attr("width", w)
  .attr("height", h);

  // Ken's zoom magic
  let something = d3.select("svg")
     .call(d3.zoom().on("zoom", function () {
        svg.attr("transform", d3.event.transform)
     }))
     .append("g");
  //Load in GeoJSON data

  function error() {
    console.log("Something went wrong!");
  }

  function run() {

    d3.json('/park_data.json', function(json) {
      // var bounds = path.bounds(json);

      svg.selectAll("path")
      .data(json.features)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("fill", function() {
         return "green";
        });
      console.log(json)

    });
  }
});
