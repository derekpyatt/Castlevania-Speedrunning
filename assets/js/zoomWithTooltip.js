// set the dimensions and margins of the graph
var margin = { top: 30, right: 30, bottom: 90, left: 60 },
    width = 700 - margin.left - margin.right,
    height = 550 - margin.top - margin.bottom;

var widthMaster = width + margin.left + margin.right;

var heightMaster = height + margin.top + margin.bottom;

// append the SVG object to the body of the page
var SVG = d3.select("#dataviz_axisZoom")
    .append("svg")
    .attr("width", widthMaster)
    .attr("height", heightMaster)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");




//Read the data
d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/iris.csv", function (data) {

    var data = [
        { Ranking: '1', Time: '11.05', Player: 'SBDWolf', gameReigon: 'JPN', Emulated: 'No' },
        { Ranking: '2', Time: '11.13', Player: 'shockra_tease', gameReigon: 'USA', Emulated: 'Yes' },
        { Ranking: '3', Time: '11.20', Player: 'kmac', gameRegion: 'USA', Emulated: 'No' },
        { Ranking: '4', Time: '11.21', Player: 'evadecaptcha', gameRegion: 'USA', Emulated: 'No' },
        { Ranking: '5', Time: '11.22', Player: '2snek', gameRegion: 'USA', Emulated: 'No' },
        { Ranking: '6', Time: '11.24', Player: 'trisk', gameRegion: 'USA', Emulated: 'Yes' },
        { Ranking: '7', Time: '11.26', Player: 'Ouijawii', gameRegion: 'USA', Emulated: 'No' },
        { Ranking: '8', Time: '11.27', Player: 'jay_cee', gameRegion: 'USA', Emulated: 'No' },
        { Ranking: '9', Time: '11.28', Player: 'COOLKID', gameRegion: 'USA', Emulated: 'No' },
        { Ranking: '10', Time: '11.29', Player: 'therealbong', gameRegion: 'USA', Emulated: 'Yes' },
        { Ranking: '11', Time: '11.29', Player: 'EndySWE', gameRegion: 'USA', Emulated: 'No' },
        { Ranking: '12', Time: '11.30', Player: 'Hemmy86', gameRegion: 'USA', Emulated: 'Yes' },
        { Ranking: '13', Time: '11.30', Player: 'freeland', gameRegion: 'USA', Emulated: 'No' },
        { Ranking: '14', Time: '11.31', Player: 'Janthe', gameRegion: 'USA', Emulated: 'Yes' },
        { Ranking: '15', Time: '11.32', Player: 'Kid_Charlemagne', gameRegion: 'JPN', Emulated: 'No' },
        { Ranking: '16', Time: '11.32', Player: 'FuriousPaul', gameRegion: 'USA', Emulated: 'No' },
        { Ranking: '17', Time: '11.34', Player: 'BurnthePastOKC', gameRegion: 'USA', Emulated: 'Yes' },
        { Ranking: '18', Time: '11.34', Player: 'tHiAgOcH', gameRegion: 'USA', Emulated: 'No' },
        { Ranking: '19', Time: '11.35', Player: 'hirexen', gameRegion: 'USA', Emulated: 'No' },
        { Ranking: '20', Time: '11.36', Player: 'Retrogaming2084', gameRegion: 'USA', Emulated: 'No' },
        { Ranking: '21', Time: '11.37', Player: 'themechanicalkoopa', gameRegion: 'USA', Emulated: 'No' },
        { Ranking: '22', Time: '11.37', Player: 'Komrade', gameRegion: 'USA', Emulated: 'No' },
        { Ranking: '23', Time: '11.37', Player: 'Bednak', gameRegion: 'USA', Emulated: 'Yes' },
        { Ranking: '24', Time: '11.38', Player: 'Arcus', gameRegion: 'USA', Emulated: 'No' },
        { Ranking: '25', Time: '11.39', Player: 'Vruche', gameRegion: 'USA', Emulated: 'Yes' },
        { Ranking: '26', Time: '11.39', Player: 'CHIdu', gameRegion: 'USA', Emulated: 'Yes' },
        { Ranking: '27', Time: '11.39', Player: 'spyriel', gameRegion: 'USA', Emulated: 'No' },
        { Ranking: '28', Time: '11.40', Player: 'MrGoat', gameRegion: 'USA', Emulated: 'No' },
        { Ranking: '29', Time: '11.40', Player: 'FCJ2000', gameRegion: 'USA', Emulated: 'No' },
        { Ranking: '30', Time: '11.41', Player: 'Zaleska', gameRegion: 'USA', Emulated: 'No' },
        { Ranking: '31', Time: '11.41', Player: 'levelengine', gameRegion: 'USA', Emulated: 'Yes' },
        { Ranking: '32', Time: '11.42', Player: 'KutsuShita', gameRegion: 'USA', Emulated: 'No' },
        { Ranking: '33', Time: '11.42', Player: 'RetroDismas', gameRegion: 'USA', Emulated: 'No' },
        { Ranking: '34', Time: '11.43', Player: 'truefalse', gameRegion: 'USA', Emulated: 'Yes' },
        { Ranking: '35', Time: '11.44', Player: 'pawelpredki', gameRegion: 'USA', Emulated: 'No' },
        { Ranking: '36', Time: '11.44', Player: 'Joenome_', gameRegion: 'USA', Emulated: 'Yes' },
        { Ranking: '37', Time: '11.44', Player: 'Crunan', gameRegion: 'USA', Emulated: 'Yes' },
        { Ranking: '38', Time: '11.44', Player: 'Spiker', gameRegion: 'USA', Emulated: 'No' },
        { Ranking: '39', Time: '11.44', Player: 'kajong0007', gameRegion: 'USA', Emulated: 'No' },
        { Ranking: '40', Time: '11.44', Player: 'Aphotic_Ktulu', gameRegion: 'USA', Emulated: 'Yes' },
        { Ranking: '41', Time: '11.45', Player: 'Skunky48', gameRegion: 'USA', Emulated: 'No' },
        { Ranking: '42', Time: '11.45', Player: 'stormcrow56k', gameRegion: 'USA', Emulated: 'No' },
        { Ranking: '43', Time: '11.45', Player: 'Implosion', gameRegion: 'USA', Emulated: 'No' },
        { Ranking: '44', Time: '11.46', Player: 'DoubleArmory', gameRegion: 'USA', Emulated: 'Yes' },
        { Ranking: '45', Time: '11.46', Player: 'Neetsel', gameRegion: 'JPN', Emulated: 'Yes' },
        { Ranking: '46', Time: '11.47', Player: 'devinbrodie25', gameRegion: 'USA', Emulated: 'No' },
        { Ranking: '47', Time: '11.47', Player: 'akumajoe', gameRegion: 'USA', Emulated: 'Yes' },
        { Ranking: '48', Time: '11.47', Player: 'Perfect_Fin', gameRegion: 'USA', Emulated: 'No' },
        { Ranking: '49', Time: '11.47', Player: 'AstroCreep', gameRegion: 'USA', Emulated: 'No' },
        { Ranking: '50', Time: '11.49', Player: 'Laxxus', gameRegion: 'USA', Emulated: 'No' },
        { Ranking: '51', Time: '11.49', Player: 'Slackanater', gameRegion: 'USA', Emulated: 'No' },
        { Ranking: '52', Time: '11.49', Player: 'aramusbelmont', gameRegion: 'USA', Emulated: 'No' },
        { Ranking: '53', Time: '11.50', Player: 'Daikena', gameRegion: 'USA', Emulated: 'Yes' },
        { Ranking: '54', Time: '11.50', Player: 'Jaag', gameRegion: 'USA', Emulated: 'Yes' },
        { Ranking: '55', Time: '11.50', Player: 'ivarneli', gameRegion: 'USA', Emulated: 'Yes' },
        { Ranking: '56', Time: '11.51', Player: 'cantaloupeme', gameRegion: 'USA', Emulated: 'No' },
        { Ranking: '57', Time: '11.51', Player: 'KHANanaphone', gameRegion: 'USA', Emulated: 'Yes' },
        { Ranking: '58', Time: '11.51', Player: 'prawnzo', gameRegion: 'USA', Emulated: 'No' },
        { Ranking: '59', Time: '11.51', Player: 'Retrothunder', gameRegion: 'USA', Emulated: 'No' },
        { Ranking: '60', Time: '11.52', Player: 'dat1niceguy', gameRegion: 'USA', Emulated: 'Yes' },
        { Ranking: '61', Time: '11.52', Player: 'lehege', gameRegion: 'USA', Emulated: 'Yes' },
        { Ranking: '62', Time: '11.53', Player: 'k_funk87', gameRegion: 'USA', Emulated: 'No' },
        { Ranking: '63', Time: '11.54', Player: 'xytoriak', gameRegion: 'USA', Emulated: 'Yes' },
        { Ranking: '64', Time: '11.54', Player: 'Skippy', gameRegion: 'USA', Emulated: 'No' },
        { Ranking: '65', Time: '11.55', Player: 'Stefler', gameRegion: 'USA', Emulated: 'Yes' },
        { Ranking: '66', Time: '11.55', Player: 'KungFusedMike', gameRegion: 'USA', Emulated: 'No' },
        { Ranking: '67', Time: '11.55', Player: 'jblue42', gameRegion: 'USA', Emulated: 'No' },
        { Ranking: '68', Time: '11.55', Player: 'natgoesfast', gameRegion: 'USA', Emulated: 'No' },
        { Ranking: '69', Time: '11.55', Player: 'Xexzy', gameRegion: 'USA', Emulated: 'No' },
        { Ranking: '70', Time: '11.56', Player: 'Exvagus', gameRegion: 'USA', Emulated: 'Yes' },
        { Ranking: '71', Time: '11.56', Player: 'OhHeckItsSnek', gameRegion: 'USA', Emulated: 'Yes' },
        { Ranking: '72', Time: '11.56', Player: 'GrampaBelmont', gameRegion: 'USA', Emulated: 'Yes' },
        { Ranking: '73', Time: '11.57', Player: 'LoZCardsfan23', gameRegion: 'USA', Emulated: 'Yes' },
        { Ranking: '74', Time: '11.57', Player: 'frantic32', gameRegion: 'USA', Emulated: 'No' },
        { Ranking: '75', Time: '11.58', Player: 'Vidtendo', gameRegion: 'USA', Emulated: 'No' },
        { Ranking: '76', Time: '11.58', Player: 'FrostedHaze', gameRegion: 'USA', Emulated: 'Yes' },
        { Ranking: '77', Time: '11.58', Player: 'JoeyJojoJr', gameRegion: 'USA', Emulated: 'Yes' },
        { Ranking: '78', Time: '11.59', Player: 'CritRocket', gameRegion: 'USA', Emulated: 'No' },
        { Ranking: '79', Time: '11.59', Player: 'zerknerk', gameRegion: 'USA', Emulated: 'Yes' },
        { Ranking: '80', Time: '11.59', Player: 'Grincevent', gameRegion: 'USA', Emulated: 'Yes' },
       /* { Ranking: '81', Time: '12.00', Player: 'ShuriBear', gameRegion: 'USA', Emulated: 'No' },
        { Ranking: '82', Time: '12.00', Player: 'djeez', gameRegion: 'USA', Emulated: 'No' },
        { Ranking: '83', Time: '12.00', Player: 'BeetZero', gameRegion: 'USA', Emulated: 'No' },
        { Ranking: '84', Time: '12.03', Player: 'Guggensulli', gameRegion: 'USA', Emulated: 'Yes' },
        { Ranking: '85', Time: '12.04', Player: 'DigNasty', gameRegion: 'USA', Emulated: 'No' },
        { Ranking: '86', Time: '12.04', Player: 'AgentWyvern', gameRegion: 'USA', Emulated: 'No' },
        { Ranking: '87', Time: '12.06', Player: 'Funkdoc', gameRegion: 'USA', Emulated: 'No' },
        { Ranking: '88', Time: '12.07', Player: 'TheTerrificTracy', gameRegion: 'USA', Emulated: 'No' },
        { Ranking: '89', Time: '12.07', Player: 'Dshana', gameRegion: 'JPN', Emulated: 'No' },
        { Ranking: '90', Time: '12.08', Player: 'Xray662', gameRegion: 'USA', Emulated: 'Yes' },
        { Ranking: '91', Time: '12.09', Player: 'SaltySam', gameRegion: 'USA', Emulated: 'No' },
        { Ranking: '92', Time: '12.10', Player: 'FoxPug', gameRegion: 'USA', Emulated: 'No' },
        { Ranking: '93', Time: '12.11', Player: 'catsonurhead', gameRegion: 'USA', Emulated: 'No' },
        { Ranking: '94', Time: '12.12', Player: 'Tiansuozhanyue', gameRegion: 'USA', Emulated: 'Yes' },
        { Ranking: '95', Time: '12.12', Player: '_Nobody_', gameRegion: 'JPN', Emulated: 'Yes' },
        { Ranking: '96', Time: '12.14', Player: 'Narmatonia', gameRegion: 'USA', Emulated: 'Yes' },
        { Ranking: '97', Time: '12.14', Player: 'chiefcheba', gameRegion: 'USA', Emulated: 'No' },
        { Ranking: '98', Time: '12.16', Player: 'Hjurri', gameRegion: 'USA', Emulated: 'Yes' },
        { Ranking: '99', Time: '12.16', Player: 'thehangrycanuck', gameRegion: 'USA', Emulated: 'No' },
        { Ranking: '100', Time: '12.16', Player: 'fletchr', gameRegion: 'USA', Emulated: 'No' }*/
    ];

    console.log(data);
    console.log(widthMaster);
    console.log(heightMaster);

    // Add X axis
    var x = d3.scaleLinear()
        //.domain([11, 12.5])
        .domain([11.6, 11])
        .range([0, width])
    var xAxis = SVG.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickSize(-height).ticks(10))
        .attr("class", "fontSize")
        .attr("stroke","antiquewhite");

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, 80])
        .range([height, 0])
    var yAxis = SVG.append("g")
        .call(d3.axisLeft(y).tickSize(-width).ticks(10))
        .attr("class", "fontSize")
        .attr("stroke", "antiquewhite");

    // Add X axis label:
    SVG.append("text")
        .attr("text-anchor", "end")
        .attr("class", "axisBold")
        .attr("x", width / 2 + 40)
        .attr("y", height + margin.top + 30)
        .text("Time (Minutes)")
        .style("fill", "antiquewhite");


    // Y axis label:
    SVG.append("text")
        .attr("text-anchor", "end")
        .attr("class", "axisBold")
        .attr("transform", "rotate(-90)")
        .attr("y", -margin.left + 20)
        .attr("x", -margin.top - width / 2 + 153)
        .text("Ranking")
        .style("fill", "antiquewhite");

    /*/ Add Title:
    SVG.append("text")
        .attr("text-anchor", "end")
        .attr("y", 25)
        .attr("x",widthMaster / 2 + 93)
        .attr("class", "axisBold")
        .text("Player Ranking vs Speedrun Time")
        .style("font-size", 19)
        .style("fill", "antiquewhite");*/

    // Add a clipPath: everything out of this area won't be drawn.
    var clip = SVG.append("defs").append("SVG:clipPath")
        .attr("id", "clip")
        .append("SVG:rect")
        .attr("width", width)
        .attr("height", height)
        .attr("x", 0)
        .attr("y", 0);

    // Create the scatter variable: where both the circles and the brush take place
    var scatter = SVG.append('g')
        .attr("clip-path", "url(#clip)")

    // Add circles
    scatter
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .on("mouseover", mouseon)
        .on("mouseout", mouseoff)
        .attr("cx", function (d) { return x(d.Time); })
        .attr("cy", function (d) { return y(d.Ranking); })
        .attr("r", 8)
        .style("fill", "antiquewhite")
        .style("opacity", 0.5);


    function mouseon(d) {
        pog.transition()
            .duration(200)
            .style("opacity", .9);
        pog.html(d.Ranking + ") " + (d.Player) + "<br/>" + d.Time)
            .style("left", (d3.event.pageX + 20) + "px")
            .style("top", (d3.event.pageY - 20) + "px");
    }

    function mouseoff(d) {
        pog.transition()
            .duration(500)
            .style("opacity", 0);
    }
    // Set the zoom and Pan features: how much you can zoom, on which part, and what to do when there is a zoom
    var zoom = d3.zoom()
        .scaleExtent([.5, 20])  // This control how much you can unzoom (x0.5) and zoom (x20)
        .extent([[0, 0], [width, height]])
        .on("zoom", updateChart);

    // This add an invisible rect on top of the chart area. This rect can recover pointer events: necessary to understand when the user zoom
    SVG.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("height", height)
        .attr("width", width)
        .style("fill", "#994c1e")
        .style("pointer-events", "all")
        .call(zoom)
        .lower();

    // Define the div for the tooltip
    var pog = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);


    // now the user can zoom and it will trigger the function called updateChart

    // A function that updates the chart when the user zoom and thus new boundaries are available
    function updateChart() {

        // recover the new scale
        var newX = d3.event.transform.rescaleX(x);
        var newY = d3.event.transform.rescaleY(y);

        // update axes with these new boundaries
        xAxis.call(d3.axisBottom(newX).tickSize(-height).ticks(10))
        yAxis.call(d3.axisLeft(newY).tickSize(-width).ticks(10))

        // update circle position
        scatter
            .selectAll("circle")
            .attr('cx', function (d) { return newX(d.Time) })
            .attr('cy', function (d) { return newY(d.Ranking) })

    }

})