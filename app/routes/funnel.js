module.exports = function(app) {

    var Funnel      = require('../models/funnel')(app);
   
    app.post('/addfunnel', function(req, res) {
      var funnel = req.body;
      console.log(funnel);
      new Funnel(funnel).save().then(function(funnel)
        {
            if(funnel) {
                console.log(funnel.toJSON())
              res.end(JSON.stringify(funnel.toJSON()));
            }
            else
                res.end();
        }) 

      

    });


      app.post('/getfunnel', function(req, res) {
      console.log("helloooo");
    	var app_secret = req.body;
      console.log(app_secret);
    	new Funnel().where({'app_secret':app_secret.app_secret}).fetchAll().then(function(apps) {
            if(apps) {
                console.log(apps.toJSON())
      		    res.end(JSON.stringify(apps.toJSON()));
            }
            else
                res.end();
      	}).catch(function(c)
      {
        console.log(c);
      })
    });



    app.post('/deletefunnel', function(req, res) {
      console.log("deletefunnel");
       var funnel = req.body;
        new Funnel().where(funnel).destroy().then(function(funnel) {
            res.end();
        });
    });

 app.post('/editfunnel', function(req, res) {
      var funnel = req.body;
      // console.log(editfunnel);
      new Funnel().where({app_secret:funnel.app_secret,id:funnel.id}).save(funnel,{method:'update'}).then(function(funnel)
        {
            if(funnel) {
                console.log(funnel.toJSON())
              res.end(JSON.stringify(funnel.toJSON()));
            }
            else
                res.end();
        }) 

      

    });

  }