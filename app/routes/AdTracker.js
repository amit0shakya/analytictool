module.exports = function(app) {

var AppURL = require('../models/appurl')(app);

var request = require('request');
     app.post('/addTracker', function(req, res) {
       var campaign = req.body;
       console.log(campaign)
             request.post(
              //'http://static.53.127.76.144.clients.your-server.de:8080/addcampaign',
                        'http://rq.ai/addcampaign',
                        //'http://static.241.69.251.148.clients.your-server.de:8080/addcampaign',
                        {form: campaign},
                        function (error, response, body) {
                            console.log(error)
                            if (!error && response.statusCode == 200) {
                                res.send(body);
                            }
                        }
            );
    });


     app.post('/listTracker', function(req, res) {
       var campaign = req.body;
       console.log(campaign)
             request.post(
                        'http://rq.ai/campaignlist',
                        //'http://static.53.127.76.144.clients.your-server.de:8080/campaignlist',
                        {form: campaign},
                        function (error, response, body) {
                           console.log(error)
                            if (!error && response.statusCode == 200) {
                              res.send(body);
                            }
                        }
            );
    });

     app.post('/dateWiseCampgnReport', function(req, res) {
       var campaign = req.body;
       console.log(campaign)
             request.post(
                        //'http://static.53.127.76.144.clients.your-server.de:8080/dateWiseCampgnReport',
                        'http://rq.ai/dateWiseCampgnReport',
                        {form: campaign},
                        function (error, response, body) {
                           console.log(error)
                            if (!error && response.statusCode == 200) {
                              res.send(body);
                            }
                        }
            );
    });

      app.post('/listTrackerStats', function(req, res) {
       var campaign = req.body;
       console.log(campaign)
             request.post(
                        'http://rq.ai/campaignsoverview',
                        //'http://static.53.127.76.144.clients.your-server.de:8080/campaignsoverview',
                        {form: campaign},
                        function (error, response, body) {
                           console.log(error)
                            if (!error && response.statusCode == 200) {
                              res.send(body);
                            }
                        }
            );
    });

      app.post('/editstatus', function(req, res) {
       var campaign = req.body;
       console.log(campaign)
             request.post(
                        //'http://rq.ai/campaignsoverview',
                        'http://static.53.127.76.144.clients.your-server.de:8080/editstatus',
                        {form: campaign},
                        function (error, response, body) {
                           console.log(error)
                            if (!error && response.statusCode == 200) {
                              res.send(body);
                            }
                        }
            );
    });


     app.post('/deleteTracker', function(req, res) {
       var campaign = req.body;
       console.log(campaign)
             request.post(
                        'http://rq.ai/deletecampaign',
                        //'http://static.241.69.251.148.clients.your-server.de:8080/deletecampaign',
                        {form: campaign},
                        function (error, response, body) {
                           console.log(error);
                            if (!error && response.statusCode == 200) {
                                 res.send(body);
                            }
                        }
            );
    });



      app.post('/realtimeevents', function(req, res) {
       // var campaign = req.body;
       // console.log(campaign)
             request.post(
                        'http://144.76.127.53:8080/realTimeEventReport',
                        //'http://static.241.69.251.148.clients.your-server.de:8080/deletecampaign',
                        {form: {'o' :'e2595b89b0'}},
                        function (error, response, body) {
                           console.log(error);
                            if (!error && response.statusCode == 200) {
                                 res.send(body);
                            }
                        }
            );
    });



     app.post('/addstoreurl', function(req, res) {
       var body = req.body;
       console.log(body)
             new AppURL().where({'app_secret' :  body.app_secret}).destroy().then(function() {
              new AppURL(body).save();
              res.send(body);
         })
    });

     app.post('/getstoreurl', function(req, res) {
            var body = req.body;
         console.log(body)
        new AppURL().where({ 'app_secret' :  body.app_secret}).fetchAll().then(function(url) {
            if(url) {
                 console.log(JSON.stringify(url.toJSON()))
                 if (url.toJSON().length==0) {
                  res.status(500).send({ error: 'Not Found' });
                  return;
                 };
                res.end(JSON.stringify(url.toJSON()[0]));
            }
            else
                res.status(500).send({ error: 'An error occured' });
        })
    });
       

};