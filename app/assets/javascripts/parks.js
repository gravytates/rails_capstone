// width and height for SVG element
var response;
var scale = 7000;

$(document).ready(function(){
  run();
  var w = 1000;
  var h = 600;

  var svg = d3.select("body")
  .append("svg")
  .attr("width", w)
  .attr("height", h);


  // MAKE A MAP
  function run() {
    d3.json('/park_data.json', function(json) {

      var projection = d3.geoAlbersUsa()
                          .scale(1)
                          .translate([0,0]);
                      // create a path generator.
                      var path = d3.geoPath()
                          .projection(projection);
                      // compute bounds of a point of interest, then derive scale and translate
                      var b = path.bounds(json),
                          s = .95 / Math.max((b[1][0] - b[0][0]) / w, (b[1][1] - b[0][1]) / h),
                          t = [(w - s * (b[1][0] + b[0][0])) / 2, (h - s * (b[1][1] + b[0][1])) / 2];
                      // update the projection to use computed scale and translate
                      projection
                          .scale(s)
                          .translate(t);
                      // calculate and draw a bounding box for the geojson
                      svg.append("rect")
                          .attr('width', w)
                          .attr('height', h)
                          .attr('fill', "white");
                      // draw the svg of both the geojson and bounding box
                      svg.selectAll("path").data(json.features).enter().append("path")
                          .attr("d", path)
                          .style("fill", "green")
                          .style("stroke-width", "1")
                          .style("stroke", "blue")

                      d3.select("svg")
                        .call(d3.zoom().on("zoom", function () {
                          svg.attr("transform", d3.event.transform)
                        }))
                        .append("g");
                      console.log(json);
    });
  }
});
