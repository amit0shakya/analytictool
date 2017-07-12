var mouse_joint=false;
console.log('in ball js');
(function(){
    function Ball(){

        var randX=Math.random()*800;
        var randY=Math.random()*400;

        var label="SearchBrowseActivity";
        var count=Math.round(Math.random()*400);

        this.view = new createjs.Shape();
        this.view.graphics.beginFill("#d95b5b").drawCircle(-1, -1, 50);
        this.view._drag=false;

        this.view.text = new createjs.Text(label, "9px Arial", "#000000");
        this.view.text.textBaseline = "alphabetic";
        this.view.text.x=(this.view.text.getBounds().width/2)*(-1);
        this.view.text.mouseChildren=false;
        this.view.text.mouseEnabled=false;

        this.view._container=new createjs.Container();
        this.view._container.x=randX;
        this.view._container.y=randY;
        this.view._container.cursor="pointer";

        this.view.on("rollout",ballout);
        this.view.on("rollover",hover);
        this.view.on("mousedown",mousedown);
        this.view.on("pressup",mouseup);

        var fixDef= new box2D.b2FixtureDef();
            fixDef.density=5;
            fixDef.friction=.5;
            fixDef.restitution=.8;

        var bodyDef=new box2D.b2BodyDef();
            bodyDef.type=box2D.b2Body.b2_dynamicBody;
            bodyDef.position.x=randX/SCALE;
            bodyDef.position.y=(randY+80)/SCALE//0/SCALE;

        fixDef.shape=new box2D.b2CircleShape(50/SCALE);

       // world.CreateBody(bodyDef).CreateFixture(fixDef);

        this.view.body=world.CreateBody(bodyDef);
        this.view.body.CreateFixture(fixDef);
        this.view.addEventListener("tick",tick);

        this.view._container.addChild(this.view);
        this.view._container.addChild(this.view.text);

        this.setsize=function(percent){

        }
    }

    function tick(e){
        _this=e.target

        _this._container.x=_this.body.GetPosition().x*SCALE;
        _this._container.y=_this.body.GetPosition().y*SCALE;
        _this._container.rotation=_this.body.GetAngle()*(180/Math.PI);

    }


    function hover(e){
        var color=e.target.graphics._fill;
            color.style="#1880a7";

        _this=e.target;
        _this.text.color="#fff";

    }

    function ballout(e){

       var color=e.target.graphics._fill;
            color.style="#d95b5b";

        _this=e.target;
        _this.text.color="#000";

    }

    function mousedown(e){
        e.target._drag=true;
    }


    function mouseup(e){

        if(e.target._drag){
           e.target._drag=false;
           mouse_joint=false;
       }
    }

    window.Ball=Ball;
})();
