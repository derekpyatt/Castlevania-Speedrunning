
// create 2 data_set
var noAny = [
    {group: "Whip Only", value: 9},
    {group: "Low %", value: 5},
    {group: "Easy Mode", value: 28},
    {group: "2 Loop", value: 5},
    {group: "Damageless", value: 2}
 ];
 
 var yesAny = [
    {group: "Whip Only", value: 9},
    {group: "Low %", value: 5},
    {group: "Easy Mode", value: 28},
    {group: "2 Loop", value: 5},
    {group: "Damageless", value: 2},
    {group: "Any %", value: 318}
 ];
 
 // set the dimensions and margins of the graph
 var margin = {top: 30, right: 30, bottom: 70, left: 60},
     width = 630 - margin.left - margin.right,
     height = 400 - margin.top - margin.bottom;
 
 // append the svg object to the body of the page
 var gort = d3.select("#categoryBar")
   .append("svg")
     .attr("width", width + margin.left + margin.right)
     .attr("height", height + margin.top + margin.bottom)
   .append("g")
     .attr("transform",
           "translate(" + margin.left + "," + margin.top + ")");
 
 // Initialize the X axis
 var x = d3.scaleBand()
   .range([ 0, width ])
   .padding(0.2);
 var xAxis = gort.append("g")
   .attr("transform", "translate(0," + height + ")")
   .attr("class","axisWhite")
   .attr("id","fontSize");
 
 // Initialize the Y axis
 var y = d3.scaleLinear()
   .range([ height, 0]);
 var yAxis = gort.append("g")
   .attr("class", "myYaxis")
   .attr("class","axisWhite")
   .attr("id","fontSize");

     // Add X axis label:
gort.append("text")
  .attr("text-anchor", "end")
  .attr("class", "axisBold")
  .attr("x", width / 2 + 34)
  .attr("y", height + margin.top + 15)
  .text("Categories")
  .style("font","16px")
  .style("fill", "antiquewhite");


  // Y axis label:
gort.append("text")
  .attr("text-anchor", "end")
  .attr("class", "axisBold")
  .attr("transform", "rotate(-90)")
  .attr("y", -margin.left + 24)
  .attr("x", -margin.top - width / 2 + 180)
  .text("Submitted Runs")
  .style("font","16px")
  .style("fill", "antiquewhite");
  

 // A function that create / update the plot for a given variable:
 function update(data) {
 
   // Update the X axis
   x.domain(data.map(function(d) { return d.group; }))
   xAxis.call(d3.axisBottom(x))
 
   // Update the Y axis
   y.domain([0, d3.max(data, function(d) { return d.value }) ]);
   yAxis.transition().duration(1000).call(d3.axisLeft(y));
 
   // Create the u variable
   var u = gort.selectAll("rect")
     .data(data)
 
   u
     .enter()
     .append("rect") // Add a new rect for each new elements
     .merge(u) // get the already existing elements as well
     .transition() // and apply changes to all of them
     .duration(1000)
       .attr("x", function(d) { return x(d.group); })
       .attr("y", function(d) { return y(d.value); })
       .attr("width", x.bandwidth())
       .attr("height", function(d) { return 300 - y(d.value); })
       .attr("fill", "#cd5a43")
       .attr("stroke","antiquewhite");
 
   // If less group in the new dataset, I delete the ones not in use anymore
   u
     .exit()
     .remove()
 }
 
 // Initialize the plot with the first dataset
 update(noAny);