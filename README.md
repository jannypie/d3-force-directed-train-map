# Remote Island Train Map
### d3 Directional-Force Map

## Setup
- Git clone repo (or unzip compressed folder) to local machine
- Open index.html in browser to view map
- Or simply [view the demo in action](http://jannypie.github.io/d3-force-directed-train-map/)

## Challenges
- I had previously worked with d3 for simple plot graphs, pie charts, bar charts
- Had never worked with more advanced d3 implementations, including force charts
- Had not worked with SVG markers, defs, or hover effects

## Process
- Was familiar with how d3 uses data to generate coordinates, so basic line-node graph was completed within 2-3 hours
- Refactored provided data into array of cities and a way to populate nodes and reference links for much cleaner and easier to read code
- Spent about 4 hours learning and attempting arrowhead markers on lines, and associating labels with them
  - Eventually refactored code to first generate svg groups that hold line and marker so that the fill/stroke colors could match
- Spent (mumble) hours on attempting shortest path implementation, reading about Dijkstra's algorithm, and experimenting with online d3 dijkstra examples
  - Was unable to get shortest paths working for this challenge

## Lessons Learned
### d3 Force
- This was entirely new, so all implementation was an experiment
- Had a lot of fun digging through various source code of online examples
- Sometimes nodes showed and no lines! Sometimes lines showed and no nodes! Figuring out why helped me understand what Force was doing on a deeper level
- Some references used include:
  - [Mike Bostock's Force documentation](https://github.com/mbostock/d3/wiki/Force-Layout)
  - [Force directed graph example](http://bl.ocks.org/mbostock/4062045)
  - [sathomas's d3 force blocks](http://bl.ocks.org/sathomas)

### SVG
- SVG markers do not inherit line color. Refactored code generating connection lines as groups holding the line and marker to manipulate highlight color effect.
- Leveraged these groups to add line titles as hover tooltips showing distances
- Some resources used include:
  - [markers](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/marker)
  - [defs](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/defs)
  - [Implementation of marker ends](http://bl.ocks.org/d3noob/5141278)
  - [D3.js arrowhead markers](http://logogin.blogspot.com/2013/02/d3js-arrowhead-markers.html)

### Shortest Path
- Spent most of my time down a rabbit hole reading source code and attempting this stretch goal
- Was unable to crack Dijkstra's algorithm or get various examples online working with my implementation
- Some references used:
  - [Demonstration of Dijkstra's shortest path algorithm](http://www.carto.net/svg/dijkstra_shortest_path_demo/)
    - Was the most promising, ran into difficulties with generating an Adjacency Matrix
  - [Dijkstra's algorithm in Javascript/D3](http://bl.ocks.org/sdjacobs/3900867adc06c7680d48)
    - Only changes line color based on distance, doesn't actually return the shortest distance between nodes
  - [Simple Dijkstra Implementation in JavaScript](http://www.nealbohling.com/2014/05/dijkstra-javascript-d3-js/)
    - Was using this example to develop a recursive shortest-path approach of my own when I realized I had used up all of my time!

Background image via [unsplash](https://unsplash.com/)
