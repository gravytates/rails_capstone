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

                      svg.append("rect")
                          .attr('width', w)
                          .attr('height', h)
                          .attr('fill', "white");

                      // draw the svg of both the geojson and bounding box
                      svg.selectAll("path").data(json.features).enter().append("path")
                          .attr("d", path)
                          .style("stroke-width", "0.5")
                          .style("stroke", "black")
                          .on("mouseover", handleMouseOver)
                          .on('mouseout', handleMouseOut)
                          // .style("fill", "green");


                      d3.select("svg")
                        .call(d3.zoom().on("zoom", function () {
                          svg.attr("transform", d3.event.transform)
                        }))
                        .append("g");

                      function handleMouseOver(d, i) {  // Add interactivity
                        // Use D3 to select element, change color and size
                        d3.select(this)
                          .attr('fill', 'orange')
                        console.log(this);

                        // Specify where to put label of text
                        // svg.append("text").attr({
                        //     x: function() { return xScale(d.x) - 30; },
                        //     y: function() { return yScale(d.y) - 15; }
                        // })
                        // .text(function() {
                        //   return [d.x, d.y];  // Value of the text
                        // });
                      }

                      function handleMouseOut(d, i ) {
                        d3.select(this)
                          .attr('fill', 'green')
                      }


                      console.log(json);

    });
  }
});

// .append("svg:path")
// .append("svg:title")
// .text(function(d) { return d.properties.NAME; });

// svg.selectAll("path").data(json.features).enter().append("svg:path")
//     .append("svg:title") // TITLE APPENDED HERE
//     .text(function(d) { return d.properties.NAME; });
