module.exports = function(app) {

    var Segment      = require('../models/dynamic_segment')(app);
    var Segment_Campaign      = require('../models/segment_campaign')(app);
    app.post('/addpushsegment', function(req, res) {
      var segment = req.body;
      console.log(segment);

      new Segment(segment).save().then(function(segment)
        {
            if(segment) {
                //console.log(segment.toJSON())
              res.end(JSON.stringify(segment.toJSON()));
            }
            else
                res.end();
        }) 

      

    });


      app.post('/getpushsegments', function(req, res) {
      console.log("helloooo");
    	var app_secret = req.body;
      console.log(app_secret);
    	new Segment().where({'app_secret':app_secret.app_secret}).fetchAll().then(function(apps) {
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



    app.post('/deletepushsegment', function(req, res) {
      // console.log("deletefunnel");
       var segment = req.body;
        new Segment().where(segment).destroy().then(function(segment) {
            res.end();
        });
    });

 app.post('/editpushsegment', function(req, res) {
      var segment = req.body;
       console.log(segment);
      new Segment().where({app_secret:segment.app_secret,id:segment.id}).save(segment,{method:'update'}).then(function(segment)
        {
            if(segment) {
                console.log(segment.toJSON())
              res.end(JSON.stringify(segment.toJSON()));
            }
            else
                res.end();
        }) 

      

    });

  // app.post('/addsegcampaign', function(req, res) {
  //     var campaign = req.body;
  //     console.log(campaign);

  //     new Segment_Campaign(campaign).save().then(function(campaign)
  //       {
  //           if(campaign) {
  //               //console.log(segment.toJSON())
  //             res.end(JSON.stringify(campaign.toJSON()));
  //           }
  //           else
  //               res.end();
  //       }) 

      

  //   });



  app.post('/craetesegcampaign', function(req, res) {
        var secret = req.body.secret;
        new Segment_Campaign({ campaign_id :  secret}).save().then(function(data) {
            if(data)
            {
                res.end(JSON.stringify({created : "new campaign_id saved successfully"}));
            }
            else
            {
                res.end();
            }
        }).catch(function(e) {
               res.end();
            });
    });

  


 // app.post('/segmentupdate', function(req, res) {
 //      var segment = req.body;
 //    console.log(segment);
 //      new Segment().where({app_secret:segment.app_secret,id:segment.id}).save(segment,{method:'update'}).then(function(segment)
 //        {
 //            if(segment) {
 //                //console.log(funnel.toJSON())
 //              res.end(JSON.stringify(segment.toJSON()));
 //            }
 //            else
 //                res.end();
 //        }) 

      

 //    });


  }