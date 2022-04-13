
// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 40, left: 100},
    width = 650 - margin.left - margin.right,
    height = 430 - margin.top - margin.bottom;

// append the svg object to the body of the page
var donny = d3.select("#worldMap")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Read data2
d3.csv("https://raw.githubusercontent.com/holtzy/data2_to_viz/master/Example_data2set/11_SevCatOneNumNestedOneObsPerGroup.csv", function(data2) {
console.log(data2);

data2 = [
    {region: 'USA', subregion: 'Southern Asia', key: 'USA', value: '27', index: 0 },
    {region: 'Switzerland', subregion: 'Southern Asia', key: 'Switzerland', value: '2', index: 1 },
    {region: 'Sweden', subregion: 'Southern Asia', key: 'Sweden', value: '3', index: 2 },
    {region: 'Poland', subregion: 'Southern Asia', key: 'Poland', value: '2', index: 3 },
    {region: 'Netherlands', subregion: 'Southern Asia', key: 'Netherlands', value: '1', index: 4 },
    {region: 'Lebanon', subregion: 'Southern Asia', key: 'Lebanon', value: '1', index: 5 },
    {region: 'Italy', subregion: 'Southern Asia', key: 'Italy', value: '1', index: 6 },
    {region: 'Germany', subregion: 'Southern Asia', key: 'Germany', value: '1', index: 7 },
    {region: 'France', subregion: 'Southern Asia', key: 'France', value: '3', index: 8 },
    {region: 'Finland', subregion: 'Southern Asia', key: 'Finland', value: '1', index: 9 },
    {region: 'Canada', subregion: 'Southern Asia', key: 'Canada', value: '5', index: 10 },
    {region: 'Brazil', subregion: 'Southern Asia', key: 'Brazil', value: '1', index: 11 },
    {region: 'Belgium', subregion: 'Southern Asia', key: 'Belgium', value: '1', index: 12 },
    {region: 'Antartica', subregion: 'Southern Asia', key: 'Antartica', value: '1', index: 13 }
];
  // Filter a bit the data2 -> more than 1 million inhabitants
  data2 = data2.filter(function(d){ return d.value>0 })

  // Color palette for continents?
  var color = d3.scaleOrdinal()
    .domain(["USA", "Switzerland", "Sweden", "Poland", "Netherlands",
             "Lebanon", "Italy", "Germany", "France", "Finland",
             "Canada", "Brazil", "Belgium", "Antartica"])
    .range(["#8c0000", "#9e2140", "#999e00", "#b38691", "#000273",
            "#006900", "#044704", "#87771b", "#949494", "#566a96",
            "#753728", "#287551", "#667314", "#2283a3"]);

  // Size scale for countries
  var size = d3.scaleLinear()
    .domain([0, 30])
    .range([25,100])  // circle will be between 7 and 55 px wide

  // create a tooltip
  var Tooltip = d3.select("#worldMap")
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
      .html(d.key + "<br>" + d.value + "  Runners")
      .style("left", (d3.event.pageX + 20) + "px")
      .style("top", (d3.event.pageY - 20) + "px")
  }
  var mouseleave = function(d) {
    Tooltip
      .style("opacity", 0)
  }

  // Initialize the circle: all located at the center of the svg area
  var node = donny.append("g")
    .selectAll("circle")
    .data(data2)
    .enter()
    .append("circle")
      .attr("class", "node")
      .attr("r", function(d){ return size(d.value)})
      .attr("cx", width / 2)
      .attr("cy", height / 2)
      .style("fill", function(d){ return color(d.region)})
      .style("fill-opacity", 1)
      .attr("stroke", "antiquewhite")
      .style("stroke-width", 1)
      .on("mouseover", mouseover) // What to do when hovered
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)
      .call(d3.drag() // call specific function when circle is dragged
           .on("start", dragstarted)
           .on("drag", dragged)
           .on("end", dragended));

  // Features of the forces applied to the nodes:
  var simulation = d3.forceSimulation()
      .force("center", d3.forceCenter().x(width / 2).y(height / 2)) // Attraction to the center of the svg area
      .force("charge", d3.forceManyBody().strength(.1)) // Nodes are attracted one each other of value is > 0
      .force("collide", d3.forceCollide().strength(.2).radius(function(d){ return (size(d.value)+3) }).iterations(1)) // Force that avoids circle overlapping

  // Apply these forces to the nodes and update their positions.
  // Once the force algorithm is happy with positions ('alpha' value is low enough), simulations will stop.
  var beans = "cx";
  var lentils = "cy";
  simulation
      .nodes(data2)
      .on("tick", function(d){
        node
            .attr(beans, function(d){ return d.x; })
            .attr(lentils, function(d){ return d.y; })
      });

  // What happens when a circle is dragged?
  function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(.03).restart();
    d.fx = d.x;
    d.fy = d.y;
  }
  function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }
  function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(.03);
    d.fx = null;
    d.fy = null;
  }

})
