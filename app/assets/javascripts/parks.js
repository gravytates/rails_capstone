// width and height for SVG element
var response;
var result;


$(document).ready(function(){
  run();
  var w = 800;
  var h = 600;
  var w2 = 800;
  var h2 = 400;
  var barWidth = 20;
  var plotHeight = 500;
  var barPadding = 2;

  var svg = d3.select("#map")
  .append("svg")
  .attr("width", w)
  .attr("height", h);

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
          .attr('fill', 'white')
          .attr('border', 1);

      // draw the svg of both the geojson and bounding box
      svg.selectAll("path").data(json.features).enter()
          .append("path")
          .attr("d", path)
          // .style("stroke-width", "0.5")
          // .style("stroke", "black")
          .on("mouseover", handleMouseOver)
          .on('mouseout', handleMouseOut)
          .append("svg:title")
            .text(function(d) { return d.properties.NAME + ", acreage: " + d.properties.ACRES; });

      var borderPath = svg.append("rect")
         	.attr("x", 0)
     			.attr("y", 0)
     			.attr("height", h)
     			.attr("width", w)
     			.style("stroke", 'black')
     			.style("fill", "none")
     			.style("stroke-width", 1);

      // zoom magicks
      d3.select("svg")
        .call(d3.zoom().on("zoom", function () {
          svg.attr("transform", d3.event.transform)
        }))
        .append("g");

      function handleMouseOver(d, path) {
        d3.select(this)
          .attr('fill', 'orange')
      }

      function handleMouseOut(d, i ) {
        d3.select(this)
          .attr('fill', 'green')
      }

// Farmer Market Data
      d3.csv('/farmer_markets.csv', function(data){

         var markets = svg.selectAll('circle')
         .data(data)
         .enter()
         .append("circle")
         .transition()
         .duration(1000)
         .delay(function(d, i) {
           return i * 25;
         })
         .attr("cx", function(d) {
           return projection([d[' lon'], d[' lat']])[0];
         })
         .attr("cy", function(d){
           return projection([d[' lon'], d[' lat']])[1];
         })
         .attr('r', 5)
         .style('fill', 'red')
         .style('opacity', 0.7);


        svg.selectAll('circle').on('mouseover', function(d,i) {
          d3.select(this)
          .append("svg:title")
          .text(function(d) { return d[' place']; });
        });
       });


    });

    d3.json('/park_data.json', function(json) {
    // Bar Graph
      var svg2 = d3.select("#graph")
      .append("svg")
      .attr("width", w2)
      .attr("height", h2);

      // D3.MAX WORKAROUND FOR JSON OBJECTS
      var max = d3.entries(json.features)
                .sort(function(a, b) {
                  return d3.descending(a.value.properties.ACRES,       b.value.properties.ACRES)
                })[0].value.properties.ACRES;

      // var max = 5099;

      var x = d3.scaleBand()
              .domain(d3.range(json.features.length))
              .rangeRound([0, w2], 0.1)
              .paddingInner(0.05);

      var y = d3.scaleLinear()
    					.domain([0, max])
    					.range([0, h2]);

      console.log(response = json.features);

      svg2.selectAll("rect")
        .data(json.features)
        .enter()
        .append('rect')
        .attr("class", "bar")
        .attr("x", function(d,i) { return x(i); })
        .attr("y", function(d) { return h2 - y(d.properties.ACRES); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return y(d.properties.ACRES); })
        // .attr('height', 30)
        .attr('fill', 'teal')
        .append("rect:title")
          .text(function(d) { return d.properties.NAME + ", acreage: " + d.properties.ACRES; });
    });

    // Farmer Data Graph?
    // var svg3 = d3.select("body")
    // .append("svg")
    // .attr("width", w)
    // .attr("height", h);
    //
    // d3.csv('/farmer_markets.csv', function(data) {
    //   console.log(response = data);
    //   var xScale = d3.scaleBand()
    //           .domain(d3.range(data.length))
    //           .rangeRound([0, w], 0.1)
    //           .paddingInner(0.05);
    //
    //   var yScale = d3.scaleLinear()
    // 					.domain([0, d3.max(data)])
    // 					.range([0, h]);
    //
    //   xScale.domain(data.map(function(d) { return d[' place']; }));
    //   yScale.domain([0, d3.max(data, function(d) { return d[' lat']; })]);
    //
    //
    //
    //   svg3.selectAll('rect')
    //     .data(data)
    //     .enter()
    //     .append('rect')
    //     .attr("x", function(d) { return xScale(d.x); })
    //     .attr("width", xScale.bandwidth())
    //     .attr("y", function(d) { return yScale(d.y); })
    //     .attr("height", function(d) { return h - yScale(d.y); })
    //     .attr('fill', 'teal');
    // });
  }
});
