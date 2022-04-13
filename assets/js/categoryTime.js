// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 90, left: 40},
    width = 630 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;

// append the svg object to the body of the page
var rock = d3.select("#categoryTime")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
//d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum_header.csv", function(data) {

var data = [
    {Category: '2 Loop', Time: '24.19'},
    {Category: 'Low %', Time: '15.16'},
    {Category: 'Whip Only', Time: '13.19'},
    {Category: 'Damageless', Time: '12.37'},
    {Category: 'Easy Mode', Time: '11.43'},
    {Category: 'Any %', Time: '11.05'}
];

//let jsonList = 'http://127.0.0.1:3000/';


//var data = [];

/*/console.log(jsonList);

const isEmpty = (obj) => Object.keys(obj).length === 0;

const xhttp = new XMLHttpRequest();
xhttp.onload = function () {
  console.log(this.responseText);
  let ajaxResult = JSON.parse(this.responseText);
  data = ajaxResult.speedruns;

  //Category = ajaxResult.speedruns.Category;
  //Time = ajaxResult.speedruns.Time;

  console.log(data);*/


// X axis
var x = d3.scaleBand()
  .range([ 0, width ])
  .domain(data.map(function(d) { return d.Category; }))
  .padding(0.2);
rock.append("g")
  .attr("transform", "translate(0," + height + ")")
  .attr("class","axisWhite")
  .attr("id","fontSize")
  .call(d3.axisBottom(x))
  .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

// Add Y axis
var y = d3.scaleLinear()
  .domain([0, 25])
  .range([ height, 0]);
rock.append("g")
  .call(d3.axisLeft(y))
  .attr("class","axisWhite")
  .attr("id","fontSize");

// Add X axis label:
rock.append("text")
  .attr("text-anchor", "end")
  .attr("class", "axisBold")
  .attr("x", width / 2 + 34)
  .attr("y", height + margin.top + 60)
  .text("Categories")
  .style("font","16px")
  .style("fill", "antiquewhite");


  // Y axis label:
rock.append("text")
  .attr("text-anchor", "end")
  .attr("class", "axisBold")
  .attr("transform", "rotate(-90)")
  .attr("y", -margin.left + 13)
  .attr("x", -margin.top - width / 2 + 165)
  .text("Fastest Time (Minutes)")
  .style("font","16px")
  .style("fill", "antiquewhite");

var gogurt = "rect";

// Bars
rock.selectAll(gogurt)
  .data(data)
  .enter()
  .append(gogurt)
    .attr("x", function(d) { return x(d.Category); })
    .attr("width", x.bandwidth())
    .attr("fill", "#cd5a43")
    .attr("stroke","antiquewhite")
    // no bar at the beginning thus:
    .attr("height", function(s) { return height - y(0); }) // always equal to 0
    .attr("y", function(s) { return y(0); })

// Animation
rock.selectAll(gogurt)
  .transition()
  .duration(800)
  .attr("y", function(d) { return y(d.Time); })
  .attr("height", function(d) { return height - y(d.Time); })
  .delay(function(d,i){console.log(i) ; return(i*100)})



//}

/*xhttp.open("GET", jsonList);
console.log(data);
//console.log(officialRunList);
xhttp.send()*/