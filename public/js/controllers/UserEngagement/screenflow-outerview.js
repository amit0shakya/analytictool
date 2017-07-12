var screenflow,screendata;
var drawouter = function(){
  $('#togglecontainer').show()
  $('#dropdownContainer').hide()
  var Renderer = function(canvas){
    var canvas = $(canvas).get(0)
    var ctx = canvas.getContext("2d");
    
    var particleSystem
    var that = {
      init:function(system){
        
        particleSystem = system
        canvas.height=800;
        canvas.width=1000;
        particleSystem.screenSize(canvas.width, canvas.height) 
        particleSystem.screenPadding(40,140,40,120) // leave an extra 80px of whitespace per side
        
        that.initMouseHandling()
      },
      
      redraw:function(){
        //console.log(particleSystem.energy())
        // 
        // redraw will be called repeatedly during the run whenever the node positions
        // change. the new positions for the nodes can be accessed by looking at the
        // .p attribute of a given node. however the p.x & p.y values are in the coordinates
        // of the particle system rather than the screen. you can either map them to
        // the screen yourself, or use the convenience iterators .eachNode (and .eachEdge)
        // which allow you to step through the actual node objects but also pass an
        // x,y point in the screen's coordinate system
        //
        ctx.fillStyle = "white"
        ctx.fillRect(0,0, canvas.width, canvas.height)
        
        particleSystem.eachEdge(function(edge, pt1, pt2){
          // edge: {source:Node, target:Node, length:#, data:{}}
          // pt1:  {x:#, y:#}  source position in screen coords
          // pt2:  {x:#, y:#}  target position in screen coords

          // draw a line from pt1 to pt2
          ctx.strokeStyle = "#ccc"
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(pt1.x, pt1.y)
          ctx.lineTo(pt2.x, pt2.y)
          ctx.stroke()
        })

        particleSystem.eachNode(function(node, pt){
          // node: {mass:#, p:{x,y}, name:"", data:{}}
          // pt:   {x:#, y:#}  node position in screen coords

          
          ctx.font="15px Open Sans";
          var textw = ctx.measureText(node.name.split('.').pop()).width
          var w = textw+40
          ctx.fillStyle = (maxflow.indexOf(node.name)>-1) ? "#900" : "#d00"
          ctx.strokeStyle = (maxflow.indexOf(node.name)>-1) ? "#c2c2c2" : "#c2c2c2"
          ctx.beginPath();
          ctx.moveTo(pt.x-w/2, pt.y-15)
          ctx.lineTo(pt.x-w/2+w+10, pt.y-15);
          ctx.lineTo(pt.x-w/2+w, pt.y+15);
          ctx.lineTo(pt.x-w/2-10, pt.y+15);
          ctx.closePath();
          ctx.stroke();
          ctx.fillStyle = node.data.color
          ctx.fill();
          ctx.fillStyle = node.data.textcolor
          ctx.fillText(node.name.split('.').pop(),pt.x-textw/2,pt.y+6)
          
        })          
      },
      
      initMouseHandling:function(){
        var ismouseMoved=false;
        // no-nonsense drag and drop (thanks springy.js)
        var dragged = null;
        var hovernode = null;
        // set up a handler object that will initially listen for mousedowns then
        // for moves and mouseups while dragging
        var handler = {
          mousemove:function(e){
            var pos = $(canvas).offset();
            _mouseP = arbor.Point(e.pageX-pos.left, e.pageY-pos.top)
            oldnode = hovernode
            hovernode = particleSystem.nearest(_mouseP);
            if (oldnode!=null && oldnode!=particleSystem.nearest(_mouseP)) {
              oldnode.node.data.color='white'
              oldnode.node.data.textcolor='#656464'
            };
            if (hovernode && hovernode.node !== null && hovernode.distance < 40 ){
              hovernode.node.data.color='#22c6ef'
              hovernode.node.data.textcolor='white'
              hovernode.node.fixed = true
              oldnode.node.fixed = false
            }
            return false
          },
          mousedown:function(e){
            ismouseMoved=false;
            var pos = $(canvas).offset();
            _mouseP = arbor.Point(e.pageX-pos.left, e.pageY-pos.top)
            dragged = particleSystem.nearest(_mouseP);
            //console.log('f')
            if (dragged && dragged.node !== null && dragged.distance < 40 ){
              // while we're dragging, don't let physics move the node
              dragged.node.fixed = true
              $(canvas).bind('mousemove', handler.dragged)
            $(window).bind('mouseup', handler.dropped)
            // $(canvas).unbind('mousemove', handler.mousemove)
            }
            return false
          },
          dragged:function(e){
            ismouseMoved=true;
            var pos = $(canvas).offset();
            var s = arbor.Point(e.pageX-pos.left, e.pageY-pos.top)

            if (dragged && dragged.node !== null){
              var p = particleSystem.fromScreen(s)
              dragged.node.p = p
            }
            return false
          },

          dropped:function(e){
            if (dragged===null || dragged.node===undefined) return
            if (dragged.node !== null) dragged.node.fixed = false
            dragged.node.tempMass = 1000
            if (!ismouseMoved && dragged && dragged.node !== null && dragged.distance < 40 ){
              console.log(dragged.node)
              // $(canvas).unbind();
              // canvas = document.getElementById('canvas');
              // ctx = canvas.getContext('2d');
              // ctx.clearRect(0, 0, canvas.width, canvas.height);
              particleSystem.stop();
              sys.renderer=undefined
              //sys=null;
              //sys.renderer={init:function(){},redraw:function(){console.log('redraw')}}
              activity=dragged.node.name;
              $('#canvas1').remove();
              $("#canvas-container").prepend('<canvas id="canvas1"></canvas>');
              var canvas = document.getElementById("canvas1");
              new Processing(canvas, sketchProc);
              // return;
            }
            dragged = null
            $(canvas).unbind('mousemove', handler.dragged)
            $(window).unbind('mouseup', handler.dropped)
            // $(canvas).mousemove(handler.mousemove);
            _mouseP = null
            return false
          }
        }
        
        // start listening
        $(canvas).mousemove(handler.mousemove);
        $(canvas).mousedown(handler.mousedown);

      },
      
    }
    return that
  }   

  var maxflow=[];
  var screens=[];
  // $(document).ready(function(){
    var sys = arbor.ParticleSystem(1000, 600, 0.5) // create the system with sensible repulsion/stiffness/friction
    sys.parameters({stiffness:0, repulsion:50, gravity:true, dt:0.02,precision:0.5}) // use center-gravity to make the graph settle nicely (ymmv)
    $('#canvas1').remove();
    $("#canvas-container").prepend('<canvas id="canvas1"></canvas>');
    sys.renderer = Renderer("#canvas1") // our newly created renderer will have its .init() method called shortly by sys...
    // setTimeout(function(){
    //   sys.stop()
    // },4000)

  console.log(allflow)
  var flow;
  if (allflow) {
    flow=screenflow.allflow;
  }
  else{
    flow=screenflow.maxflow;
    for (var i = 0; i < flow.length; i++) {
      flow[i].x=flow[i].curr;
      flow[i].y=flow[i].next;
    };
  }
  
   for (var i = 0; i < flow.length; i++) {
    if (screens.indexOf(flow[i].x)<0) {
      screens.push(flow[i].x)
      sys.addNode(flow[i].x,{mass:.1, color:"white",textcolor:"#656464", x:0, y:0})
    };
     if (screens.indexOf(flow[i].y)<0) {
      screens.push(flow[i].y)
      sys.addNode(flow[i].y,{mass:.1, color:"white",textcolor:"#656464", x:0, y:0})
    };
      
    };

    for (var i = 0; i < flow.length; i++) {
      sys.addEdge(flow[i].x,flow[i].y)
    };

    for (var i = 0; i < screenflow.maxflow.length; i++) {
      if (maxflow.indexOf(screenflow.maxflow[i].curr)<0) {maxflow.push(screenflow.maxflow[i].curr)};
      if (maxflow.indexOf(screenflow.maxflow[i].next)<0) {maxflow.push(screenflow.maxflow[i].next)};
    };
    
    
  // })

}