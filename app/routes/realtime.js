module.exports = function(app) {

var AppURL = require('../models/appurl')(app);

var request = require('request');
     app.post('/realTimeEventReport', function(req, res) {
       var data = req.body;
       // console.log(data)
             request.post(
                        'http://push.rocq.io:8081/realTimeEventReport',
                        {form: data},
                        function (error, response, body) {
                            // console.log(error)
                            if (!error && response.statusCode == 200) {
                                res.send(body);
                            }
                        }
            );
    });

     app.post('/realTimeEventDateWiseReport', function(req, res) {
       var data = req.body;
       // console.log(data)
             request.post(
                        'http://push.rocq.io:8081/realTimeEventDateWiseReport',
                        {form: data},
                        function (error, response, body) {
                            // console.log(error)
                            if (!error && response.statusCode == 200) {
                                res.send(body);
                            }
                        }
            );
    });

     app.post('/realTimeEventPropValReport', function(req, res) {
       var data = req.body;
       // console.log(data)
             request.post(
                        'http://push.rocq.io:8081/realTimeEventPropValReport',
                        {form: data},
                        function (error, response, body) {
                            // console.log(error)
                            if (!error && response.statusCode == 200) {
                                res.send(body);
                            }
                        }
            );
    });

       

};