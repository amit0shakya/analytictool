var width = 1200,
    height = 600,
    padding = 1.6, // separation between same-color nodes
    clusterPadding = 6, // separation between different-color nodes
    maxRadius = 50;

var svg = d3.select("#circle_div").append("svg")
    .attr("width", width)
    .attr("height", height);

var create_circles = function(data){
  var n = data.length, // total number of nodes
      m = 1; // number of distinct clusters

  var color = d3.scale.category10()
      .domain(d3.range(m));

  // The largest node for each cluster.
  var clusters = new Array(m);
  //
  var nodes = data.map(function(d1) {
    test="Test";
    var i = Math.floor(Math.random() * m),
        r = Math.sqrt((Math.log10(d1.total_count) + 1) / m ) * maxRadius,
        d = {
        name: d1.label,
          id:d1.id,
          active:true,
          color:d1.color,
          in:d1.in_activity,
          in_count:d1.in_count,
          out:d1.out_activity,
          out_count:d1.out_count,
          total_count:d1.total_count,
          cluster: i,
          radius: r,
          name: d1.label,
          is_visible:true,
          namespace:d1.namespace,
          x: Math.cos(i / m * 2 * Math.PI) * 200 + width / 2 + Math.random() -120,
          y: Math.sin(i / m * 2 * Math.PI) * 200 + height / 2 + Math.random() -120
        };
    if (!clusters[i] || (r > clusters[i].radius)) clusters[i] = d;
        return d;
  });

  console.log(nodes);

  var force = d3.layout.force()
      .nodes(nodes)
      .size([width, height])
      .gravity(.02)
      .charge(0)
      .on("tick", tick)
      .start();

  // define tooltip div
  // Define the div for the tooltip
  var tooltip_div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  var gnodes = svg.selectAll('g.gnode')
        .data(nodes)
        .enter()
        .append('g')
        .classed('gnode', true);

  var activityList = svg.selectAll('g.anode')
        .data(nodes)
        .enter()
        .append('g')
        .classed('anode',true);

  var activityNameLables = activityList.append('text')
        .data(nodes)
        .attr("class","anl")
        .attr("id",function(d){return d.id;})
        .attr("dx",function(d){ return 60;})
        .attr("dy",function(d,i){ return 60 + i*40;})
        .text(function(d){return d.name});

  var rectangles = activityList.append("rect")
        .attr("class","rect")
        .attr("id",function(d){return d.id;})
        .attr("x", function (d) { return 40; })
        .attr("y", function (d,i) { return 50+ i*40; })
        .attr("height", function (d) { return 10; })
        .attr("width", function (d) { return 10; })
        .on("mouseover",function(d){
          d3.select(this)
            .transition()
            .duration(200)
            .attr("stroke",function(d){ return d.color;})
        })
        .on("mouseout",function(d){
           d3.select(this).classed("hover", false);
         })
        .style("fill", function(d) { return d.color; });


  // Add one circle in each group
  var node = gnodes.append("circle")
    .data(nodes)
    .attr("class", "node")
    .attr("id",function(d){ return d.id})
    .style("fill", function(d) {  return d.color; })
    .on("mouseover",function(d){
      var clickedCircle = this;
      d3.select(this)
        .transition()
        .duration(200)
        .attr("r",function(d){ return d.radius * 1.05 })
        .style("fill",function(d){return d.color});
      // tooltip showing activity
      tooltip_div.transition()
        .duration(100)
        .style("opacity", 1);
      tooltip_div.html(d.name + "<br/>"  + 'Total Count: '+d.total_count + "<br/>" + 'In Count: '+ d.in_count + '<br/>' + 'Out Count: '+d.out_count)
         .style("left", (d3.event.pageX+20) + "px")
         .style("top", (d3.event.pageY - 30) + "px");

    })
    .on("mouseout",function(d){
      d3.select(this)
        .transition()
        .duration(200)
        .attr("r",function(d){ return d.radius })
        .style("fill",function(d){return d.color});

      tooltip_div.transition()
        .duration(100)
        .style("opacity", 0);
    })
    .on("mousemove",function(d){
      tooltip_div.transition()
        .duration(100)
        .style("opacity", 1);
      tooltip_div.html(d.name + "<br/>"  + 'Total Count: '+d.total_count + "<br/>" + 'In Count: '+ d.in_count + '<br/>' + 'Out Count: '+d.out_count)
         .style("left", (d3.event.pageX+20) + "px")
         .style("top", (d3.event.pageY - 30) + "px");
    })
    .on("click",function(d){
      var clickedCircle = this;
      // d3.select()
      //    .transition()
      //    .duration(900)
      //    .attr("cx",function(d){return width /2 + 200;})
      //    .attr("cy",function(d){ return height/2;})
      //    .attr("r",function(d){ return d.radius*1.2;});

      //  d3.selectAll('.node').each(function(d){
      //    var currCircle = this;
      //    d3.select('#'+d.id).transition().duration(200).style("opacity", function(){
      //      return (currCircle === clickedCircle) ? 1 : 0;
      //    });
      //  });
      var childrens = [];
      d3.selectAll('.node').each(function(d){
        var currCircle = this;
        if(clickedCircle === currCircle){
            childrens = find_children(d.namespace,data);
            for(var j=0;j<childrens.length;j++){
              d3.select('#'+get_activity_id(childrens[j])).transition().duration(200).style("opacity",function(d){
                return 1;
              });
            }
        }else{
          // d3.select('')
        }

      });
    })
    .call(force.drag);

    var percentage = gnodes.append("svg:text")
        .attr("class","percent_label")
        .text(function(d){ return d.total_count;});



    var label = gnodes.append("svg:text")
        .attr("class","circle_label")
        .text(function (d) { return d.name;})
        .on("mouseover",function(d){
          d3.select(this)
            .transition()
            .duration(200)
            .attr("r",function(d){ return d.radius * 1.05 });
          // tooltip showing activity
          tooltip_div.transition()
            .duration(100)
            .style("opacity", 1);
          tooltip_div.html(d.name + "<br/>"  + 'Total Count: '+d.total_count + "<br/>" + 'In Count: '+ d.in_count + '<br/>' + 'Out Count: '+d.out_count)
             .style("left", (d3.event.pageX+20) + "px")
             .style("top", (d3.event.pageY - 30) + "px");
        })
        .on("mouseout",function(d){
          d3.select(this)
            .transition()
            .duration(200)
            .attr("r",function(d){ return d.radius });
          tooltip_div.transition()
            .duration(100)
            .style("opacity", 0);
        })
        .on("mousemove",function(d){
          tooltip_div.transition()
            .duration(100)
            .style("opacity", 1);
          tooltip_div.html(d.name + "<br/>"  + 'Total Count: '+d.total_count + "<br/>" + 'In Count: '+ d.in_count + '<br/>' + 'Out Count: '+d.out_count)
             .style("left", (d3.event.pageX+20) + "px")
             .style("top", (d3.event.pageY - 30) + "px");
        })
        .style("text-anchor", "middle")
        .style("fill", "#ECEFF1")
        .style("font-family", "Arial")
        .style("font-size", 12);

    var countActivity = 0;

  node.transition()
      .duration(750)
      .delay(function(d, i) { return i * 5; })
      .attrTween("r", function(d) {
        var i = d3.interpolate(0, d.radius);
        return function(t) { return d.radius = i(t); };
      });

  function tick(e) {
    node
        .each(cluster(10 * e.alpha * e.alpha))
        .each(collide(.5))
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });

    label.attr("x", function(d){ return d.x; })
       .attr("y", function (d) {return d.y - 10; })
  }

  // Move d to be adjacent to the cluster node.
  function cluster(alpha) {
    return function(d) {
      var cluster = clusters[d.cluster];
      if (cluster === d) return;
      var x = d.x - cluster.x,
          y = d.y - cluster.y,
          l = Math.sqrt(x * x + y * y),
          r = d.radius + cluster.radius;
      if (l != r) {
        l = (l - r) / l * alpha;
        d.x -= x *= l;
        d.y -= y *= l;
        cluster.x += x;
        cluster.y += y;
      }
    };
  }

  // Resolves collisions between d and all other circles.
  function collide(alpha) {
    var quadtree = d3.geom.quadtree(nodes);
    return function(d) {
      var r = d.radius + maxRadius + Math.max(padding, clusterPadding),
          nx1 = d.x - r,
          nx2 = d.x + r,
          ny1 = d.y - r,
          ny2 = d.y + r;
      quadtree.visit(function(quad, x1, y1, x2, y2) {
        if (quad.point && (quad.point !== d)) {
          var x = d.x - quad.point.x,
              y = d.y - quad.point.y,
              l = Math.sqrt(x * x + y * y),
              r = d.radius + quad.point.radius + (d.cluster === quad.point.cluster ? padding : clusterPadding);
          if (l < r) {
            l = (l - r) / l * alpha;
            d.x -= x *= l;
            d.y -= y *= l;
            quad.point.x += x;
            quad.point.y += y;
          }
        }
        return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
      });
    };
  }
}


// function to find their children O(n) time complexity
var find_children = function(namespace,data){
  var children = [];
  var in_arr = [];
  var out_arr = [];
  var out_count,in_count;
  if(typeof namespace !== 'undefined' && data !== 'undefined' && data !== null){
    for(var i=0;i<data.length;i++){
      if(namespace === data[i].namespace){
        if(typeof data[i].in_activity !=='undefined' && data[i].in_activity.length > 0){
          for(var j=0;j<data[i].in_activity.length;j++)
            children.push(data[i].in_activity[j].x2);
        }
        if(typeof data[i].in_activity !=='undefined' && data[i].in_activity.length > 0){
          for(var j=0;j<data[i].out_activity.length;j++)
            children.push(data[i].out_activity[j].x1)
        }

        // children["in"] = data[i].in_activity;
        // children["out"] = data[i].out_activity;
        // children["out_count"] = data[i].out_count;
        // children["in_count"] = data[i].in_count;
      }
    }
  }
  return children.unique();
}

var destroy_circles = function(data){

}

var colors = [
  {color:"#03A9F4"},
  {color:"#E91E63"},
  {color:"#9C27B0"},
  {color:"#F44336"},
  {color:"2196F3"},
  {color:"#8BC34A"},
  {color:"#FFEB3B"},
  {color:"#FF5722"},
  {color:"#795548"},
  {color:"#673AB7"},
  {color:"#9E9E9E"},
  {color:"#FFC107"},
  {color:"#03A9F4"},
  {color:"#CDDC39"},
  {color:"#00BCD4"},
  {color:"#009688"},
  {color:"#009688"},
  {color:"#4CAF50"},
  {color:"#FFFFFF"},
  {color:"#000"},
  {color:"#9b59b6"},
  {color:"#f39c12"}
];
