var box2D={};
var stage, canvas,debug;
var SCALE=30;
var Sbody=[];//Static Bodies Walls
var nodesObj={};
var totalballs=0;
var max=200;

function init(){
    setTimeout(setup,100);
}
init();

// To setup the box of the canvas

function setup(){
     box2D = {
        b2Vec2:Box2D.Common.Math.b2Vec2,
        b2BodyDef:Box2D.Dynamics.b2BodyDef,
        b2Mjoint:Box2D.Dynamics.Joints.b2MouseJoint,
        b2MjointDef:Box2D.Dynamics.Joints.b2MouseJointDef,
        b2Body:Box2D.Dynamics.b2Body,
        b2FixtureDef:Box2D.Dynamics.b2FixtureDef,
        b2Fixture:Box2D.Dynamics.b2Fixture,
        b2World:Box2D.Dynamics.b2World,
        b2MassData:Box2D.Collision.Shapes.b2MassData,
        b2PolygonShape:Box2D.Collision.Shapes.b2PolygonShape,
        b2CircleShape:Box2D.Collision.Shapes.b2CircleShape,
        b2DebugDraw:Box2D.Dynamics.b2DebugDraw
    };

    canvas=document.getElementById("mycanvas");
    stage=new createjs.Stage(canvas);
    createjs.Touch.enable(stage);
    stage.enableMouseOver(10);
    stage.mouseMoveOutside = true;
    createjs.Ticker.addEventListener('tick',tick);
    createjs.Ticker.setFPS(60);
    createjs.Ticker.useRAF = true;
    debug=document.getElementById("testcanvas");

    setupPhysics();
}

  function createballs(){
      var b=new Ball();
      b.setsize(40);
      stage.addChild(b.view._container);
  }





function setupPhysics(){
    world=new box2D.b2World(new box2D.b2Vec2(0,0),true);

    var _width=canvas.width;
    var _height=canvas.height;

    //Creating Static Body1
    bodyDef1=new box2D.b2BodyDef();
        bodyDef1.type=box2D.b2Body.b2_staticBody;
        bodyDef1.position.x=(_width/2)/SCALE;
        bodyDef1.position.y=(_height)/SCALE;

    //Setting up fixture Defination for body1
    fixDef= new box2D.b2FixtureDef();
        fixDef.density=1;
        fixDef.friction=.5;
        fixDef.shape=new box2D.b2PolygonShape();
        fixDef.shape.SetAsBox((_width/2)/SCALE,20/SCALE);

    //Add body1 to world
    var body=world.CreateBody(bodyDef1).CreateFixture(fixDef);
    Sbody.push(body.m_body)

    //Body 2 Code start
    bodyDef2=new box2D.b2BodyDef();
        bodyDef2.type=box2D.b2Body.b2_staticBody;
        bodyDef2.position.x=0/SCALE;
        bodyDef2.position.y=0;

    fixDef2= new box2D.b2FixtureDef();
        fixDef2.density=1;
        fixDef2.friction=.5;
        fixDef2.shape=new box2D.b2PolygonShape();
        fixDef2.shape.SetAsBox(10/SCALE,_height/SCALE);

    var body=world.CreateBody(bodyDef2).CreateFixture(fixDef2);
    Sbody.push(body.m_body)
    //Body 2 code finish

    //Creating Body3 code Start
    bodyDef3=new box2D.b2BodyDef();
        bodyDef3.type=box2D.b2Body.b2_staticBody;
        bodyDef3.position.x=_width/SCALE;
        bodyDef3.position.y=0;

    fixDef3= new box2D.b2FixtureDef();
        fixDef3.density=1;
        fixDef3.friction=.5;
        fixDef3.shape=new box2D.b2PolygonShape();
        fixDef3.shape.SetAsBox(10/SCALE,_height/SCALE);

    var body=world.CreateBody(bodyDef3).CreateFixture(fixDef3);
    Sbody.push(body.m_body);

    //Body3 code finish
    var debugDraw = new box2D.b2DebugDraw();
    debugDraw.SetSprite(debug.getContext('2d'));
    debugDraw.SetDrawScale(SCALE);
    debugDraw.SetFillAlpha(.5);
    debugDraw.SetFlags(box2D.b2DebugDraw.e_shapeBit | box2D.b2DebugDraw.e_jointBit);
    world.SetDebugDraw(debugDraw);
  }

  function tick(){
      stage.update();
      world.DrawDebugData();
      world.Step(1/60,10,10);
      world.ClearForces();
  }
