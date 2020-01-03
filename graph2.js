var data = [
  {id: "TVs", value: 11, image: "https://datausa.io/images/attrs/thing_apple.png"},
  {id: "Ordinateurs",  value: 17, image: "https://datausa.io/images/attrs/thing_fish.png"},
  {id: "Autres", value: 6,  image: "https://datausa.io/images/attrs/thing_tomato.png"},
  {id: "Smartphones", value: 11, image: "https://datausa.io/images/attrs/thing_apple.png"},
  {id: "Terminaux", value: 20, image: "https://datausa.io/images/attrs/thing_apple.png"},
  {id: "Réseaux", value: 16, image: "https://datausa.io/images/attrs/thing_apple.png"},
  {id: "Data centers", value: 19, image: "https://datausa.io/images/attrs/thing_apple.png"},
];
  
new d3plus.Treemap()
  .data(data)
.select("#graph2")
  .groupBy("id")
  .shapeConfig({
    backgroundImage: function(d) {
      return d.image;
    }
  })
  .sum("value")
  .render();