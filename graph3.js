var svg = d3.select("#graph3"),
            width = +svg.attr("width"),
            height = +svg.attr("height"),
            g = svg.append("g").attr("transform", "translate(20,0)");
   
    var xScale =  d3.scaleLinear()
            .domain([0,10])
            .range([0, 300]);

    

    
    var tree = d3.cluster()                 
            .size([height, width - 460])  
            .separation(function separate(a, b) 
           {
                return a.parent == b.parent           
                || a.parent.parent == b.parent
                || a.parent == b.parent.parent ? 0.4 : 0.8;
            });

    var stratify = d3.stratify()
            .parentId(function(d) 
                      { 
              					return d.id.substring(0, d.id.lastIndexOf(".")); 
                      });

    d3.csv("cons_data.csv", row, function(error, data) {
        //if (error) throw error;

        var root = stratify(data);
        tree(root);

        var link = g.selectAll(".link")
                .data(root.descendants().slice(1))
                .enter().append("path")
                .attr("class", "link")
                .attr("d", function(d) {
                    return "M" + d.y + "," + d.x
                            + "C" + (d.parent.y + 100) + "," + d.x
                            + " " + (d.parent.y + 100) + "," + d.parent.x
                            + " " + d.parent.y + "," + d.parent.x;
                });
      
    
        var node = g.selectAll(".node")
                .data(root.descendants())
                .enter().append("g")
                .attr("class", function(d) { return "node" + (d.children ? " node--internal" : " node--leaf"); })
                .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

        
        node.append("circle")
                .attr("r", 4);
        

       
        var leafNodeG = g.selectAll(".node--leaf")
                .append("g")
                .attr("class", "node--leaf-g")
                .attr("transform", "translate(" + 9 + "," + -8 + ")");

        leafNodeG.append("rect")
                .attr("class","shadow")
                .style("fill", function (d) {return d.data.color;})
                .attr("width", 2)
                .attr("height", 30)
                .attr("rx", 2)
                .attr("ry", 2)
                .transition()
                    .duration(800)
                    .attr("width", function (d) {return xScale(d.data.value*50)+80});

        leafNodeG.append("text")
                .attr("dy", 19.5)
                .attr("x", 1)
                .style("text-anchor", "start")
                .text(function (d) {
                    return d.data.id.substring(d.data.id.lastIndexOf(".") + 1);
                });

      
        var internalNode = g.selectAll(".node--internal");
        internalNode.append("text")
                .attr("y", -10)
                .style("text-anchor", "middle")
                .text(function (d) {
                    return d.data.id.substring(d.data.id.lastIndexOf(".") + 1);
                });
      

        
        var ballG = svg.insert("g")
                .attr("class","ballG")
                .attr("transform", "translate(" + 100 + "," + height/2 + ")");
        ballG.insert("circle")
                .attr("class","shadow")
                .style("fill","steelblue")
                .attr("r", 5);
        ballG.insert("text")
                .style("text-anchor", "middle")
                .attr("dy",5)
                .text("0.0");

        
        d3.selectAll(".node--leaf-g")
                .on("mouseover", handleMouseOver)
                .on("mouseout", handleMouseOut);

        function handleMouseOver(d) {
            var leafG = d3.select(this);

            leafG.select("rect")
                    .attr("stroke","#4D4D4D")
                    .attr("stroke-width","2");


            var ballGMovement = ballG.transition()
                    .duration(400)
                    .attr("transform", "translate(" + (d.y
                            + xScale(d.data.value) + 400) + ","
                            + (d.x + 6.5) + ")");

            ballGMovement.select("circle")
                    .style("fill", d.data.color)
                    .attr("r", 27);

            ballGMovement.select("text")
                    .delay(300)
                    .text(Number(d.data.value*100).toFixed(2)+"%")
            				.style("font-size", "12px");
        }
        function handleMouseOut() {
            var leafG = d3.select(this);

            leafG.select("rect")
                    .attr("stroke-width","0");
        }

    });

    function row(d) {
        return {
            id: d.id,
            value: +d.value,
            color: d.color
        };
    }