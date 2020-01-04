var data = [
  { id: "TVs", value: 11, image: "img/television.svg" },
  { id: "Ordinateurs", value: 17, image: "img/computer.svg" },
  { id: "Terminaux", value: 20, image: "img/responsive.svg" },
  { id: "Smartphones", value: 11, image: "img/smartphone.svg" },
  { id: "Autres", value: 6, image: "img/more.svg" },
  { id: "Réseaux", value: 16, image: "img/cloud.svg" },
  { id: "Data centers", value: 19, image: "img/data-center.svg" },
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
      var txt = d.id;
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  })
  .sum("value")
  .render();
