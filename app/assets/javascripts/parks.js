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

  var raster = svg.append("g");
  var features = svg.append('g').attr('class', 'features');
  var labels = svg.append('g').attr('class', 'labels');

  // MAKE A MAP
  function run() {
    d3.json('/park_data.json', function(json) {

      var projection = d3.geoAlbersUsa()
                          .scale(1)
                          .translate([0,0]);

                      var path = d3.geoPath()
                          .projection(projection);

                      var b = path.bounds(json),
                          s = .95 / Math.max((b[1][0] - b[0][0]) / w, (b[1][1] - b[0][1]) / h),
                          t = [(w - s * (b[1][0] + b[0][0])) / 2, (h - s * (b[1][1] + b[0][1])) / 2];

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

                      // Potential Label Magic
                      // labels.selectAll('.label').data(json.features).enter().append('text')
                      //   .attr("class", "halo")
                      //   .attr('transform', function(d) {
                      //       return "translate(" + path.centroid(d) + ")";
                      //   })
                      //   .style('text-anchor', 'middle')
                      //   .text(function(d) {
                      //       return d.properties.NAME
                      //   });
                      // labels.selectAll('.label').data(json.features).enter().append('text')
                      //   .attr("class", "label")
                      //   .attr('transform', function(d) {
                      //       return "translate(" + path.centroid(d) + ")";
                      //   })
                      //   .style('text-anchor', 'middle')
                      //   .text(function(d) {
                      //       return d.properties.NAME
                      //   });

                      // zoom magicks
                      d3.select("svg")
                        .call(d3.zoom().on("zoom", function () {
                          svg.attr("transform", d3.event.transform)
                        }))
                        .append("g");

                      function handleMouseOver(d, path) {  // Add interactivity
                        // Use D3 to select element, change color and size
                        d3.select(this)
                          .attr('fill', 'orange')

                        // svg.append('text').attr("d", path)
                        //   .text(function(d) {
                        //     return d.properties.NAME;  // Value of the text
                        //   });
                        console.log(this);
                      }
                      function handleMouseOut(d, i ) {
                        d3.select(this)
                          .attr('fill', 'green')
                      }
                      console.log(json);

    });
  }
});
