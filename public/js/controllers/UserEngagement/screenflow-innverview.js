var SelectedActivity;
function sketchProc(p) {
  $('#togglecontainer').hide()
  $('#dropdownContainer').show()
  var overRect= function(x,y, width, height) 
    {
      if (p.mouseX >= x && p.mouseX <= x+width && 
          p.mouseY >= y && p.mouseY <= y+height) {
        return true;
      } else {
        return false;
      }
    }

    var drawnode = function(x,y,w,h,name,v1,p1,v2,p2,flipx){
     
      flipx ? x+=w/2 : x-=w/2
      //p.strokeWeight(2)
      p.stroke(200)
      p.fill(255)
      p.beginShape()
      p.vertex(x+w/2,y);
      p.vertex(x-w/2,y);
      p.vertex(x-w/2+20,y-h/2);
      p.vertex(x+w/2+20,y-h/2);
      p.endShape(p.CLOSE);

      p.noStroke()
      p.fill(254,249,246)
      
      p.beginShape(p.QUADS);
      p.vertex(x-w/2,y);
      p.vertex(x-w/2,y+h/2);
      p.vertex(x,y+h/2);
      p.vertex(x,y);
      p.endShape();

      x+=w/2;
      p.fill(255)
      p.beginShape(p.QUADS);
      p.vertex(x-w/2,y);
      p.vertex(x-w/2,y+h/2);
      p.vertex(x,y+h/2);
      p.vertex(x,y);
      p.endShape();

      x-=w/2;
      p.stroke(200)
      p.noFill()
      p.beginShape(p.QUADS);
      p.vertex(x-w/2,y);
      p.vertex(x-w/2,y+h/2);
      p.vertex(x+w/2,y+h/2);
      p.vertex(x+w/2,y);
      p.endShape();

      p.fill(100)
      p.textSize(12)
      p.textAlign(p.CENTER)
      p.text(name,x,y-h/4+5)

      p.fill(179,103,41)
      p.textSize(14)
      p.text(v1,x-w/3,y+h/4+5)
      p.textSize(12)
      p.text(p1+' %',x-w/6,y+h/4+5)
      p.fill(150)
      p.textSize(14)
      p.text(v2,x+w/6,y+h/4+5)
      p.fill(170)
      p.textSize(12)
      p.text(p2+' %',x+w/3,y+h/4+5)
    }

    var drawedge = function(x,y,h,v1,p1,flipx,flipy){
      // flipx=true
      // console.log(flipx)
      
      p.noStroke();
      p.fill(200)
      flipx ? p.rect(x+.5,y+.5,40,1.5) : p.rect(x-40,y+.5,40,1.5)
      p.fill(35, 198, 239);
      flipx ? p.rect(x,y,40,1) : p.rect(x-40,y,40,1)
      // p.stroke(200)
      // flipx ? p.line(x,y,x+40,y) : p.line(x,y,x-40,y)
      flipx ? x+=180 : x-=180;

      p.fill(200)
      flipx ? p.rect(x+.5-40,y+.5,40,1.5) : p.rect(x,y+.5,40,1.5)
      p.fill(35, 198, 239);
      flipx ? p.rect(x-40,y,40,1) : p.rect(x,y,40,1)
      // flipx ? p.line(x,y,x-40,y) : p.line(x,y,x+40,y)

      p.noStroke()
      flipy ? p.fill(35,198,239) : p.fill(63,237,227)
      p.ellipse(x,y,12,12)
      //p.strokeWeight(1)
      p.stroke(200);
      p.noFill();
      p.ellipse(x,y,20,20)

      flipx ? x-=140 : x+=40
      y-=h/2;

      // p.strokeWeight(1.5)
      // p.stroke(200)
      p.fill(200)
      p.rect(x+2,y+2,100,h)
      // p.fill(35, 198, 239);
      p.strokeWeight(1)
      p.stroke(220)
      p.fill(255)
      p.rect(x,y,100,h)
      // p.rect(x,y,100,h)
      p.fill(130)
      p.textSize(14)
      p.text(v1,x+25,y+h/2+5)
      p.fill(170)
      p.textSize(10)
      p.text(p1+' %',x+75,y+h/2+5)

       /* @pjs p.preload="1.jpg"; */
       //p.PImage b;
       //b = p.loadImage("1.jpg");
       //p.imageCache.add("1.jpg")
       p.image(p.loadImage("//rocq.io/images/logo.png"), x, y,100,100);
    }

    var drawcoreshadow=function(x,y){
      p.noStroke();
      p.fill(180, 180, 180);
      p.ellipse(x+2,y+2,182,182);
      
    }

    var drawcore = function(x,y,name){

     p.fill(35, 198, 239);
      p.noStroke();
      // p.shadowOffsetX = Math.cos((5*1))*3;
      // p.shadowOffsetY = Math.sin((5*1))*3;
      // p.shadowBlur = 2
      // p.shadowColor = "black";


      //p.rect(x-150,y-50,300,100,20,20,20,20)
      p.ellipse(x,y,180,180);
      p.fill(255, 255, 255);
      p.textSize(18);
      p.text(name,x,y+10);
      //p.text("Page",x,y+20);
      p.fill(176, 48, 150);
    }

    var drawcoreelements = function(x,y,h,c1,d1,u1){
      p.stroke(200)
      y-=50;
      p.noStroke()

      p.fill(200)
      p.rect(x,y+.5,300,1.5)
      p.fill(35, 198, 239);
      p.rect(x,y,300,1)
      // p.line(x,y,x+300,y);
      y+=100;
      p.fill(200)
      p.rect(x,y+.5,300,1.5)
      p.fill(35, 198, 239);
      p.rect(x,y,300,1)
      // p.line(x,y,x+300,y);
      y-=50;
      p.fill(200)
      p.rect(x-300,y+.5,300,1.5)
      p.fill(35, 198, 239);
      p.rect(x-300,y,300,1)
      // p.line(x,y,x-300,y);

      y+=50;
      p.stroke(23,187,176)
      p.noFill()
      x+=300;
      y-=h/2;
      p.rect(x,y,100,h)
      p.fill(23,187,176)
      p.textSize(14)
      p.text('Conversion',x+50,y+h/2-5)
      p.textSize(18)
      p.text(Math.floor(c1/u1*100)+' %',x+50,y+h/2+15)

      p.stroke(241,46,116)
      p.noFill()
      y-=100;
      p.rect(x,y,100,h)
      p.fill(241,46,116)
      p.textSize(14)
      p.text('Dropout',x+50,y+h/2-5)
      p.textSize(18)
      p.text(Math.floor(d1/u1*100)+' %',x+50,y+h/2+15)

      p.stroke(200)
      p.noFill()
      y+=50;
      x-=700
      p.rect(x,y,100,h)
      p.fill(180)
      p.textSize(14)
      p.text('Users',x+50,y+h/2-5)
      p.fill(100)
      p.textSize(18)
      p.text(u1,x+50,y+h/2+15)
    }

    var drawNodeAndEdge = function(x,y,i,len,name,tcount,count,drop,conv,flipx,flipy){
      // p.strokeWeight(1)
      // p.stroke(230)
      // flipy ? p.line(x+2,y,x+2,y+len) : p.line(x+2,y,x+2,y-len);
      // p.strokeWeight(2)
      // p.stroke(200)
      p.noStroke()
      p.fill(200)
      flipy ? p.rect(x+.5,y+.5,1.5,len) : p.rect(x+.5,y+.5-len,1.5,len);
      p.fill(35, 198, 239);
      flipy ? p.rect(x,y,1,len) : p.rect(x,y-len,1,len);
      // p.rect(x,y,1,len)
      // flipy ? p.line(x,y,x,y+len) : p.line(x,y,x,y-len);
      flipy ? y+=len : y-=len;
      drawedge(x,y,35,count,Math.floor(count/tcount*100),flipx,flipy)
      flipx ? x+=200 : x-=200
      drawnode(x,y,250,70,name.split('.').pop(),conv,Math.floor(conv/count*100),drop,Math.floor(drop/count*100),flipx);
      flipx ? x-=20 : x-=250;
      y-=35;
      clickListenerCoordinates[i]=[x,y,250+20,70,name];
    }

    //var json = JSON.parse(jsonstr);
    // if (activity==null) {
    //   activity = 'com.net.pvr.ui.NowShowingNewActivity'
    // };
    //console.log(json['com.net.pvr.ui.TicketBookedActivity'])
     p.draw = function() {
      }
    var clickListenerCoordinates=[];
    p.mouseMoved = function(){
      for (var i = 0; i < clickListenerCoordinates.length && clickListenerCoordinates[i]; i++) {
        var elem = clickListenerCoordinates[i];
       // console.log(elem)
        if (overRect(elem[0],elem[1],elem[2],elem[3])) {
          //update()
              p.noFill();
              p.stroke(200)
              p.rect(elem[0]-20,elem[1]-20,elem[2]+40,elem[3]+40)
          }
          else{
              p.noFill();
              p.stroke(255)
              p.rect(elem[0]-20,elem[1]-20,elem[2]+40,elem[3]+40)
          }
          
        };
    }

    p.mousePressed = function(){
      for (var i = 0; i < clickListenerCoordinates.length && clickListenerCoordinates[i]; i++) {
        var elem = clickListenerCoordinates[i];
        if (overRect(elem[0],elem[1],elem[2],elem[3])) {
          if (activity != elem[4]) {
            activity = elem[4];
            console.log(activity)
            //p.exit();
            //$('#canvas1').unbind();
            $('#canvas1').remove();
            $("#canvas-container").prepend('<canvas id="canvas1"></canvas>');
            var canvas = document.getElementById("canvas1");
            var context = canvas.getContext('2d');
            context.clearRect(0, 0, canvas.width, canvas.height);
            new Processing(canvas, sketchProc);
            
        };
          };
          
      };
      
    }
    
    // var update =  function(){
    console.log(activity)
    // console.log(screendata[activity]);
    
    if (screendata[activity]) {
      SelectedActivity = screendata[activity];
    }

    for (var i = 0; i < SelectedActivity.in.length; i++) {
       if (SelectedActivity.in[i].conv==undefined) {
        SelectedActivity.in[i].conv=0;
       };
        if (SelectedActivity.in[i].drop==undefined) {
        SelectedActivity.in[i].drop=0;
       };
    };

    for (var i = 0; i < SelectedActivity.out.length; i++) {
       if (SelectedActivity.out[i].conv==undefined) {
        SelectedActivity.out[i].conv=0;
       };
        if (SelectedActivity.out[i].drop==undefined) {
        SelectedActivity.out[i].drop=0;
       };
    };

    if (BasedOnFilter==1) {
      SelectedActivity.in.sort(function(a,b) {return b.conv-a.conv});
    SelectedActivity.out.sort(function(a,b) {return b.conv-a.conv});
    }
    else if (BasedOnFilter==2) {
      SelectedActivity.in.sort(function(a,b) {return b.drop-a.drop});
    SelectedActivity.out.sort(function(a,b) {return b.drop-a.drop});
    }
    else{
      SelectedActivity.in.sort(function(a,b) {return b.count-a.count});
    SelectedActivity.out.sort(function(a,b) {return b.count-a.count});
    }
   
    var lenIn = SelectedActivity.in.length;
    var lenOut = SelectedActivity.out.length;
    lenIn>LenInFilter ? lenIn=LenInFilter : lenIn;
    lenOut>LenOutFilter ? lenOut=LenOutFilter : lenOut;
    clickListenerCoordinates = new Array(lenIn+lenOut);
    //p.background(255)
    p.height=(150 + lenIn*60)+(150 + lenOut*60);
    p.width=1200;
    p.textAlign(p.CENTER);
    p.background(255)
    p.smooth();
    p.frameRate(1);

    var totalDrops=0;
    var totalConvs=0;


    drawcoreshadow(p.width/2,150 + lenIn*60);

    for (var i = 0; i < lenIn; i++) {
      var node = SelectedActivity.in[i];
      var len = 150 + i*60;
      //lenIn=4
      var pad;
      var spacing=200/lenIn;
      if (lenIn%2==0) {
        pad = spacing/2+spacing*Math.ceil((lenIn-i-2)/2);
        if (i%2==0) {pad=-pad};
      }else{
        pad = spacing*Math.floor((lenIn-i)/2);
        if (i%2==0) {pad=-pad};
      }
      drawNodeAndEdge(p.width/2+pad,150 + lenIn*60,i,len,node.name,SelectedActivity.count,node.count || 0,node.drop || 0,node.conv || 0,i%2==1,false)
      //break
    };

    for (var i = 0; i < SelectedActivity.in.length; i++) {
      var node = SelectedActivity.in[i];
      totalDrops+=node.drop || 0;
      totalConvs+=node.conv || 0;
     }

    for (var i = 0; i < lenOut; i++) {
      var node = SelectedActivity.out[i];
      var len = 150 + i*60;
      var pad;
      var spacing=200/lenOut;
      if (lenOut%2==0) {
        pad = spacing/2+spacing*Math.ceil((lenOut-i-2)/2);
        if (i%2==0) {pad=-pad};
      }else{
        pad = spacing*Math.floor((lenOut-i)/2);
        if (i%2==0) {pad=-pad};
      }
      drawNodeAndEdge(p.width/2+pad,150 + lenIn*60,lenIn+i,len,node.name,SelectedActivity.count,node.count || 0,node.drop || 0,node.conv || 0,i%2==1,true)
      //break
    };
    console.log(lenIn)
    console.log(clickListenerCoordinates)
    drawcoreelements(p.width/2,150 + lenIn*60,70,totalConvs,totalDrops,SelectedActivity.count);
    drawcore(p.width/2,150 + lenIn*60,activity.split('.').pop());
    // }

    // update();

    
  
}

//console.log(p.externals.sketch.options)
//p.externals.sketch.options.crispLines = true;