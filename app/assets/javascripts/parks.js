
var loadData = function(){
  $.ajax({
    type: 'GET',
    contentType: 'application/json; charset=utf-8',
    url: '/parks',
    dataType: 'json',
    success: function(data){
        console.log(data);
        run(data);
    },
    failure: function(result){
      error();
    }
  });
};

var w = 800;
var h = 500;
//Define path generator, using the Albers USA projection

  var path = d3.geoPath()
         .projection(d3.geoAlbersUsa());
  //Create SVG element
  var svg = d3.select("body")
        .append("svg")
        .attr("width", w)
        .attr("height", h);
  //Load in GeoJSON data

function error() {
    console.log("Something went wrong!");
}

function run(data) {
  d3.json(data, function() {

    console.log(data);
    // Bind data and create one path per GeoJSON feature
    svg.selectAll("path")
    .data(data.features)
    .enter()
    .append("path")
    .attr("d", path);
  });
}

// fetch data on page load
$(document).ready(function(){
  console.log('load?');
  loadData();
});
