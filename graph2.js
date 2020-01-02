// set the dimensions and margins of the graph
var margin2 = { top: 10, right: 10, bottom: 10, left: 10 },
    width2 = 445 - margin2.left - margin2.right,
    height2 = 445 - margin2.top - margin2.bottom;

// append the svg object to the body of the page
var svg2 = d3.select("#graph2")
    .append("svg")
    .attr("width", width2 + margin2.left + margin2.right)
    .attr("height", height2 + margin2.top + margin2.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin2.left + "," + margin2.top + ")");

// Read data
d3.csv('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_hierarchy_1level.csv', function (data2) {

    // stratify the data: reformatting for d3.js
    var root = d3.stratify()
        .id(function (d) { return d.name; })   // Name of the entity (column name is name in csv)
        .parentId(function (d) { return d.parent; })   // Name of the parent (column name is parent in csv)
        (data2);
    root.sum(function (d) { return +d.value })   // Compute the numeric value for each entity

    // Then d3.treemap computes the position of each element of the hierarchy
    // The coordinates are added to the root object above
    d3.treemap()
        .size([width, height])
        .padding(4)
        (root)

    console.log(root.leaves())
    // use this information to add rectangles:
    svg2
        .selectAll("rect")
        .data(root.leaves())
        .enter()
        .append("rect")
        .attr('x', function (d) { return d.x0; })
        .attr('y', function (d) { return d.y0; })
        .attr('width', function (d) { return d.x1 - d.x0; })
        .attr('height', function (d) { return d.y1 - d.y0; })
        .style("stroke", "black")
        .style("fill", "#69b3a2");

    // and to add the text labels
    svg2
        .selectAll("text")
        .data(root.leaves())
        .enter()
        .append("text")
        .attr("x", function (d) { return d.x0 + 10 })    // +10 to adjust position (more right)
        .attr("y", function (d) { return d.y0 + 20 })    // +20 to adjust position (lower)
        .text(function (d) { return d.data.name })
        .attr("font-size", "15px")
        .attr("fill", "white")
})