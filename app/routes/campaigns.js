module.exports = function(app) {

    var Campaign      = require('../models/campaign')(app);

    app.post('/addcampaign', function(req, res) {
    	campaign = req.body
      	new Campaign(campaign).save().then(function(model) {
		    res.end();
		});
    });

    app.post('/checkcampaignkey', function(req, res) {
        var campaignkey = req.body.campaignkey;
        new Campaign({ 'campaignkey' :  campaignkey}).fetch().then(function(campaigns1) {
            if(!campaigns1)
            {
                res.end(JSON.stringify({available : "campaignkey not taken"}));
            }
            else
            {
                res.end();
            }
        })
    });

    app.post('/getcampaigns', function(req, res) {
        var campaign = req.body;
        new Campaign().where({ 'app_secret' :  campaign.app_secret}).fetchAll().then(function(campaigns) {
            if(campaigns) {
                res.end(JSON.stringify(campaigns.toJSON()));
            }
            else
                res.end();
        })
    });

    app.post('/deletepush', function(req, res) {
        var campaign = req.body;
        console.log(campaign)
         var request = require('request');
             //request.del({url: "http://pushapi.rocq.io/push", 
              request.del({url: "http://pushapi.rocq.io/push", 
             qs: {app_secret:campaign.app_secret ,
                            ref: campaign.ref}},
            function(error, response, body){
               console.log(body);
               if (!error && response.statusCode == 200) {
                                res.send(body);
                            }
            });
        
    });

       

    
};