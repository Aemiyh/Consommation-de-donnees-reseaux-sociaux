var data = [
  { id: "TVs", value: 11, image: "img/television.svg", type: "production" },
  { id: "Ordinateurs", value: 17, image: "img/computer.svg",type: "production" },
  { id: "Terminaux", value: 20, image: "img/responsive.svg" ,type: "utilisation"},
  { id: "Smartphones", value: 11, image: "img/smartphone.svg" ,type: "production"},
  { id: "Autres", value: 6, image: "img/more.svg",type: "production" },
  { id: "Réseaux", value: 16, image: "img/cloud.svg" ,type: "utilisation"},
  { id: "Data centers", value: 19, image: "img/data-center.svg",type: "utilisation" },
];

new d3plus.Treemap()
  .data(data) 
  .select("#graph2")
  .groupBy("id")
  
  .shapeConfig({
    backgroundImage: function (d) {
      return d.image;
    },
    label: false
  })
  .tooltipConfig({
    body: function (d) {
      var table = "<table class='tooltip-table'>";
      table += "<tr><td class='data'>" + d.value + " % </td></tr>";
      table += "</table>";
      return table;
    },
    title: function (d) {
      var txt = d.id + " ("+ d.type +") ";
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  })
  .sum("value")
  .render();
