
// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 40, left: 100},
    width = 580 - margin.left - margin.right,
    height = 410 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#officialRuns")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
/*/d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum_header.csv", function(data) {
//console.log(data);

let jsonList = 'http://127.0.0.1:3000/';

var data = [];

//console.log(jsonList);

const isEmpty = (obj) => Object.keys(obj).length === 0;

const xhttp = new XMLHttpRequest();
xhttp.onload = function () {
  console.log(this.responseText);
  var test = (JSON.parse(this.responseText));
    var data = test.beans;
    //console.log(beans);*/


var data = [
    {Player: 'SBDWolf', Value: '34'},
    {Player: 'shockra_tease', Value: '11'},
    {Player: 'kmac', Value: '13'},
    {Player: 'evadecaptcha', Value: '20'},
    {Player: '2snek', Value: '33'},
    {Player: 'trisk', Value: '6'},
    {Player: 'Ouijawii', Value: '10'},
    {Player: 'jay_cee', Value: '9'},
    {Player: 'COOLKID', Value: '3'},
    {Player: 'therealbong', Value: '3'}
];

/*/ sort data
data.sort(function(b, a) {
  return a.Value - b.Value;
});*/

// Add X axis
var x = d3.scaleLinear()
  .domain([0, 40])
  .range([ 0, width]);
svg.append("g")
  .attr("class","axisWhite")
  .attr("id","fontSize")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

// Y axis
var y = d3.scaleBand()
  .range([ 0, height ])
  .domain(data.map(function(d) { return d.Player; }))
  .padding(1);
svg.append("g")
  .attr("class","axisWhite")
  .attr("id","fontSize")
  .call(d3.axisLeft(y))

  // Add X axis label:
svg.append("text")
  .attr("text-anchor", "end")
  .attr("class", "axisBold")
  .attr("x", width / 2 + 87)
  .attr("y", height + margin.top + 29)
  .text("Number of Submitted Runs")
  .style("font","16px")
  .style("fill", "antiquewhite");


  // Y axis label:
svg.append("text")
  .attr("text-anchor", "end")
  .attr("class", "axisBold")
  .attr("transform", "rotate(-90)")
  .attr("y", -margin.left + 12)
  .attr("x", -margin.top - width / 2 + 168)
  .text("Players - Fastest Time Top to Bottom")
  .style("font","16px")
  .style("fill", "antiquewhite");

// Lines
svg.selectAll("myline")
  .data(data)
  .enter()
  .append("line")
    .attr("x1", x(0))
    .attr("x2", x(0))
    .attr("y1", function(d) { return y(d.Player); })
    .attr("y2", function(d) { return y(d.Player); })
    .attr("stroke", "antiqueWhite")
    .style("stroke-width", 3);

var squash = "cx";
var potato = "cy";
console.log(data);
// Circles -> start at X=0
svg.selectAll("mycircle")
  .data(data)
  .enter()
  .append("circle")
    .attr(squash, x(0) )
    .attr(potato, function(d) { return y(d.Player); })
    .attr("r", "7")
    .style("fill", "#3c3c54")
    .style("stroke-width", 2)
    .attr("stroke", "antiqueWhite");

// Change the X coordinates of line and circle
svg.selectAll("circle")
  .transition()
  .duration(2000)
  .attr(squash, function(d) { return x(d.Value); })

svg.selectAll("line")
  .transition()
  .duration(2000)
  .attr("x1", function(d) { return x(d.Value); })

//})

//}

/*xhttp.open("GET", jsonList);
console.log(data);
//console.log(officialRunList);
xhttp.send()*/
