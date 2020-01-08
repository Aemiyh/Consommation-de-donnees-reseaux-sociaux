 var margin = {
        top: 10,
        right: 30,
        bottom: 30,
        left: 40
      };
    var width = 460 - margin.left - margin.right;
    var height = 400 - margin.top - margin.bottom;

    var svg = d3.select("#graph1")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
   
    var scaleX = d3.scaleLinear().range([100, width]);

    var y = d3.scaleBand().range([height - 50, 0]);

    var xAxis = d3.axisTop(scaleX).ticks(10, "%");
    //var yAxis = d3.axisLeft(y);

    var bandwidth = 0;
     
    // Premiere page
    
    d3.csv("https://raw.githubusercontent.com/Aemiyh/Consommation-de-donnees-reseaux-sociaux/master/donnees_App_Mobile.csv", function (data) {

          //updateChart(svg,data,1);

            data.sort(function(a, b) {
          return d3.descending(a.application, b.application)
        });
  
        
        scaleX.domain([0, 1]);

        y.domain(data.map(function(d,i) {return i; }))
          .paddingInner(0.1);

        svg.append("g")
          .attr("class", "xaxis")
          .attr("transform", "translate(0," + -2 + ")")
          .call(xAxis);

        var g = svg.append("g"); 
        
        console.log(y.bandwidth())
        g.attr("class", "y axis")
          .attr("transform", `translate(${-10},${y.bandwidth()})`);
        // Affichage des libéllés
        g.selectAll("text")
          .data(data)
          .enter().append("text")
          .text(function(d) { return d.application.toUpperCase(); })
          .attr("class", "label")
          .attr("x", 0)
          .attr("y", function(d,i) { return y(i); })
          .attr("dy", -2);
        
        // Affichage des bar
        test = svg.selectAll(".bar")
          .data(data)
          .enter()
          test.append("rect")
          .attr("class", "bar")
          .attr("x", 100)
          .attr("height", 15)
          .attr("y", function(d, i) { return y(i) + 7.5; })
          .attr("width", function(d) { return scaleX(d.Pourcentage) - 100; })
          .on("mouseover", function(d) {
          //do
          })
          .on("mouseout", function(d) {
          //do_some
          }); 
          test.append("text")
          .attr("x", function(d) { return scaleX(d.Pourcentage*1.1)})
          .text(d => (d.Pourcentage*100).toFixed(2) + " %")
          .attr("y", function(d, i) { return y(i) + 20.5; })
        });// fin load