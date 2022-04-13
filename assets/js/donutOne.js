/*/ Create dummy data
var data = {NES: 291, PC: 8, WiiUVC:6, NESClassic:6, Switch:4 }

// set the color scale
var color = d3.scaleOrdinal()
  .domain(["NES", "PC", "WiiUVC", "NESClassic", "Switch"])
  .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"]);*/


  (function(d3) {
    'use strict';

    var frog = [
      {label: 'NES', count: 291 }, 
      {label: 'PC', count: 8 },
      {label: 'WiiUVC', count: 6 },
      {label: 'NESClassic', count: 6 },
      {label: 'Switch', count: 2 },
    ];

    var width = 360;
    var height = 360;
    var radius = Math.min(width, height) / 2;
    var donutWidth = 75;
    var legendRectSize = 18;                                  // NEW
    var legendSpacing = 4;                                    // NEW

    var color = d3.scaleOrdinal(["#3c3c54", "#223822", "#0a110a", "#742c24", "#33044b"]);

    var svg = d3.select('#donutOne')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(' + (width / 2) + 
        ',' + (height / 2) + ')');

    // create a tooltip
  var Tooltip = d3.select("#donutOne")
    .append("div")
    .style("opacity", 0)
    .attr("id", "tooltipDetials");

  // Three function that change the tooltip when user hover / move / leave a cell
  var mouseover = function(d) {
    Tooltip
      .style("opacity", 1)
  }

  var mousemove = function(d) {
    Tooltip
      .html(d.data.label + "<br>" + d.data.count + "  Runners")
      .style("left", (d3.event.pageX + 20) + "px")
      .style("top", (d3.event.pageY - 20) + "px")
  }
  var mouseleave = function(d) {
    Tooltip
      .style("opacity", 0)
  }

    var arc = d3.arc()
      .innerRadius(radius - donutWidth)
      .outerRadius(radius);

    var pie = d3.pie()
      .value(function(d) { return d.count; })
      .sort(null);

    var path = svg.selectAll('path')
      .data(pie(frog))
      .enter()
      .append('path')
      .attr('d', arc)
      .style('stroke', 'antiquewhite')
      .attr('fill', function(d, i) { 
        return color(d.data.label);
      })
      .on("mouseover", mouseover) // What to do when hovered
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave);

      svg.append("text")
      .attr("text-anchor", "end")
      .attr("y", height / 10 - 100)
      .attr("x",width / 10)
      .attr("class", "axisBold")
      .text("Console")
      .style("font-size", 22)
      .style("fill", "antiquewhite");

    var legend = svg.selectAll('.legend')                     // NEW
      .data(color.domain())                                   // NEW
      .enter()                                                // NEW
      .append('g')                                            // NEW
      .attr('class', 'legend')                                // NEW
      .attr('transform', function(d, i) {                     // NEW
        var height = legendRectSize + legendSpacing;          // NEW
        var offset =  height * color.domain().length / 2;     // NEW
        var horz = -2 * legendRectSize;                       // NEW
        var vert = i * height - offset;                       // NEW
        return 'translate(' + horz + ',' + vert + ')';        // NEW
      });                                                     // NEW

    legend.append('rect')                                     // NEW
      .attr('width', legendRectSize)                          // NEW
      .attr('height', legendRectSize)                         // NEW
      .style('fill', color)                                   // NEW
      .style('stroke', 'antiquewhite');                                // NEW
      
    legend.append('text')                                     // NEW
      .attr('x', legendRectSize + legendSpacing)              // NEW
      .attr('y', legendRectSize - legendSpacing)              // NEW
      .text(function(d) { return d; })                        // NEW
      .style('fill', 'antiquewhite');  

  })(window.d3);