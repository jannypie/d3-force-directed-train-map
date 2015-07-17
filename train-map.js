// Author: Jan Dennison
// July 2015
// d3 Directional Force Map Construction

// SVG setup
//
// To full width of viewport
var width = document.documentElement.clientWidth,
  height = document.documentElement.clientHeight;
// Append svg element to page
var svgContainer = d3.select('body').append('svg')
  .attr('width', width)
  .attr('height', height);

// Use data provided to set up graph
//
// List all the cities
var cities = ["frolia","hailea","hanalei","maeulia","hauauai","lainea","kaleola","lakua","paukaa","poipu","waimea"];
// Populate nodes
var nodes = {};
for (var i = 0; i < cities.length; i++) {
  nodes[cities[i]] = {"name": cities[i]};
}
// Populate links and assign distances
var links = [{
    "source": nodes["frolia"],
    "target": nodes["hailea"],
    "distance": 9
  }, {
    "source": nodes["hailea"],
    "target": nodes["hanalei"],
    "distance": 5
  }, {
    "source": nodes["hanalei"],
    "target": nodes["maeulia"],
    "distance": 6
  }, {
    "source": nodes["hauauai"],
    "target": nodes["lainea"],
    "distance": 8
  }, {
    "source": nodes["kaleola"],
    "target": nodes["maeulia"],
    "distance": 7
  }, {
    "source": nodes["lainea"],
    "target": nodes["hailea"],
    "distance": 5
  }, {
    "source": nodes["lakua"],
    "target": nodes["hauauai"],
    "distance": 3
  }, {
    "source": nodes["maeulia"],
    "target": nodes["hailea"],
    "distance": 12
  }, {
    "source": nodes["paukaa"],
    "target": nodes["hauauai"],
    "distance": 6
  }, {
    "source": nodes["poipu"],
    "target": nodes["paukaa"],
    "distance": 9
  }, {
    "source": nodes["hailea"],
    "target": nodes["waimea"],
    "distance": 4
  }, {
    "source": nodes["waimea"],
    "target": nodes["lakua"],
    "distance": 9
  }, {
    "source": nodes["lakua"],
    "target": nodes["poipu"],
    "distance": 7
  }, {
    "source": nodes["waimea"],
    "target": nodes["kaleola"],
    "distance": 4
  }, {
    "source": nodes["maeulia"],
    "target": nodes["paukaa"],
    "distance": 14
  }, {
    "source": nodes["hailea"],
    "target": nodes["lainea"],
    "distance": 8
  }];

// Force setup
// More info at https://github.com/mbostock/d3/wiki/Force-Layout
var force = d3.layout.force()
  .size([width, height])
  .nodes(d3.values(nodes))
  .links(links)
  .charge(-document.documentElement.clientWidth * 5)
  .on("tick", handleTick);

var drag = force.drag();

// Lines and nodes setup
//
// Create a Group of link paths, markers and labels
// Allows highlighting of hovered paths
// Allows inheritance of stroke/fill color
var linkGroup = svgContainer.selectAll('.linkGroup')
  .data(links)
  .enter().append('g')
    .attr('class',function(d){
      return d.source.name + "-to-" + d.target.name + " link-group";
    });
var link = linkGroup.append('line')
    .attr('class', 'link');
var linkTitle = linkGroup.append("text")
    .attr('class', 'linkTitle')
    .text(function(d) {
      return d.distance + "mi";
    });

// Define arrow markers
svgContainer.append("defs").selectAll("marker")
    .data(links)
  .enter().append("marker")
    .attr("id","arrow")
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 15)
    .attr("refY", -0.5)
    .attr("markerWidth", 4)
    .attr("markerHeight", 4)
    .attr("orient", "auto")
  .append("path")
    .attr("d", "M0,-5L10,0L0,5");

// Append nodes
var node = svgContainer.selectAll('.node')
  .data(force.nodes())
  .enter().append("circle")
  .attr('r', 8)
  .attr('class', 'node')
  .attr('fixed',false);

// Append city titles to nodes
var nodeTitle = svgContainer.selectAll('.nodeTitle')
  .data(force.nodes())
  .enter().append("text")
  .attr('class', 'nodeTitle')
  .text(function(d) {
    return d.name;
  });

// Define link distances
force.linkDistance(function(link) {
  return link.distance;
});

// Populate data once force start is complete
force.on('end', function() {
  link.attr('x1', function(d) { return d.source.x; })
      .attr('y1', function(d) { return d.source.y; })
      .attr('x2', function(d) { return d.target.x; })
      .attr('y2', function(d) { return d.target.y; });

  node.attr('cx', function(d) { return d.x; })
      .attr('cy', function(d) { return d.y; })
      .call(drag);

  nodeTitle.attr("x", function(d) { return d.x; })
      .attr("y", function(d) { return d.y - 5; });

  linkTitle.attr("x", function(d) { return (d.target.x + d.source.x) / 2 + 5; })
      .attr("y", function(d) { return (d.target.y + d.source.y) / 2 + 5; });
});

// Updates svg positions during tick event
// Called during force setup
function handleTick() {
  link.attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

  node.attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; });

  nodeTitle.attr("x", function(d) { return d.x; })
      .attr("y", function(d) { return d.y - 5; });

  linkTitle.attr("x", function(d) { return (d.target.x + d.source.x) / 2 + 5; })
      .attr("y", function(d) { return (d.target.y + d.source.y) / 2 + 5; });
}

// Start force implementation
force.start();
