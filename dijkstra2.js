// http://bl.ocks.org/sdjacobs/3900867adc06c7680d48

d3.dijkstra = function () {
    var dijkstra = {}, nodes, edges, source, dispatch = d3.dispatch("start", "tick", "step", "end");

    dijkstra.run = function (src) {
        source = src;
        var unvisited = [];

        nodes.forEach(function (d) {
            if (d != src) {
                d.distance = Infinity;
                unvisited.push(d);
                d.visited = false;
            }
        });

        var current = src;
        current.distance = 0;

        function tick() {
            current.visited = true;
            current.links.forEach(function(link) {
                var tar = link.target;
                if (!tar.visited) {
                    var dist = current.distance + link.value;
                    tar.distance = Math.min(dist, tar.distance);
                }
            });
            if (unvisited.length == 0 || current.distance == Infinity) {
                dispatch.end()
                return true;
            }
            unvisited.sort(function(a, b) {
                return b.distance - a.distance
            });

            current = unvisited.pop()

            dispatch.tick();

            return false;
        }

        d3.timer(tick);
    };

   dijkstra.nodes = function (_) {
        if (!arguments.length)
            return nodes;
        else {
            nodes = _;
            return dijkstra;
        }
    };

   dijkstra.edges = function (_) {
        if (!arguments.length)
            return edges;
        else {
            edges = _;
            return dijkstra;
        }
    };

   dijkstra.source = function(_) {
        if (!arguments.length)
            return source;
        else {
            source = _;
            return dijkstra;
        }
    };


   dispatch.on("start.code", dijkstra.run);

   return d3.rebind(dijkstra, dispatch, "on", "end", "start", "tick");
};

var dijkstra = d3.dijkstra()
    .nodes(d3.values(nodes))
    .edges(links);

  var color = d3.scale.linear()
    .domain([0, 1000, 2500])
    .range(["green", "yellow", "red"]);

  dijkstra.on("tick", function() {
      node.style("fill", function(d) { return color(d.distance); });
  });

  dijkstra.on("end", function() {
    var name = dijkstra.source().name;
    node.select("title")
        .text(function(d) { return d.name + "\n(" + d.distance + " miles from " + name + ")" });
  });

  node.on("click", dijkstra.start);
