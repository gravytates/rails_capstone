// width and height for SVG element
var response;
var result;
var scale = 7000;
var epicodus = [-122.677393, 45.520600]

$(document).ready(function(){
  run();
  var w = 1000;
  var h = 600;
  var barWidth = 20;
  var plotHeight = 500;

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
                          .on('mouseout', handleMouseOut);


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
                        // console.log(this);
                      }
                      function handleMouseOut(d, i ) {
                        d3.select(this)
                          .attr('fill', 'green')
                      }
                      console.log(json);



                      d3.csv('/locations.csv', function(data){
                        console.log(result = data);
                         svg.selectAll('circle')
                         .data(data)
                         .enter()
                         .append("circle")
                         .attr("cx", function(d) {
                           return projection([d[' lon'], d[' lat']])[0];
                         })
                         .attr("cy", function(d){
                           return projection([d[' lon'], d[' lat']])[1];
                         })
                         .attr('r', 5)
                         .style('fill', 'orange')
                         .style('opacity', 0.85);

                         svg.selectAll('text')
                         .data(data)
                         .enter()
                         .append('text')
                         .attr("x", function(d) {
                           return projection([d[' lon'], d[' lat']])[0] + 5;
                         })
                         .attr("y", function(d){
                           return projection([d[' lon'], d[' lat']])[1] - 5;
                         })
                         .text(function(d) {
                           return d[' place'];
                         })
                         .attr('font-family', 'sans-serif')
                         .attr('font-size', '12px')
                         .attr('fill', 'crimson');

                       });

                      //  var yScale = d3.scaleLinear()
                      //  .domain([0, d3.max(json)])
                      //  .range([0, (plotHeight - 100)]);
                      // d3.select("#plot")
                      //
                      //  .selectAll("rect")
                      //  .data(json)
                      //  .enter()
                      //  .append("rect")
                      //  .attr("width", barWidth)
                      //  .attr("height", function(d){ return yScale(d); })
                      //  .attr("fill", function(d, i) {
                      //      return colors[i];
                      //  })
                      //  .attr("x", function(d, i){
                      //      return (i * 100) + 90; // horizontal location of bars
                      //  })
                      //  .attr("y", function(d){
                      //      return plotHeight - yScale(d); // scale bars within plotting area
                      //  });


    });
  }
});
