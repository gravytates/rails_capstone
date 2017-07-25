var response;

// Ajax call
var loadData = function(){
  $.ajax({
    type: 'GET',
    contentType: 'application/json; charset=utf-8',
    url: '/parks',
    dataType: 'json',
    success: function(data){
        run(data);
    },
    failure: function(result){
      error();
    }
  });
};

// width and height for SVG element
var w = 800;
var h = 500;

// AlbersUSA projection
var projection = d3.geoAlbersUsa()
           .translate([w/2, h/2]);
//Define path generator
var path = d3.geoPath()
       .projection(projection);
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
  d3.json(data, function(error) {
    response = data
    if (error) {
      console.log(error);
    } else {      
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
  loadData();
});
