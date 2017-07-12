module.exports = function(app) {

    var App      = require('../models/application')(app);
    var Q = require('q');
    app.post('/addapp', function(req, res) {
        apps=[];
        app = req.body
        if (app.length==undefined) 
            {apps.push(app)}
        else {apps=app}
            var promises=[];
        apps.forEach(function(item){
         var promise = new App().where({'username' :  item.username,'app_secret' :  item.app_secret}).destroy().then(function() {
             return new App(item).save();
         })
         promises.push(promise);
     });
        Q.all(promises).then(function(){
            res.end();
        })

    });


    app.post('/deleteappentry', function(req, res) {
       var userandapp = req.body;
        new App().where(userandapp).destroy().then(function(model) {
            res.end();
        });
    });

   
    app.post('/getapps', function(req, res) {
        
    	var user = req.body;
         if(user.username=="hello@rocq.io")
         { 
            new App().fetchAll().then(function(apps) {
                if(apps) {   
                        var list =apps.toJSON()    
                        list.sort(function(a,b) { 
                        return a.app_secret.localeCompare(b.app_secret)
                        });

                        var last_name=null;
                        for(var i =0; i<list.length; i++)
                        {
                            list[i].accesstype='RocqTeam'
                            if(list[i].app_secret==last_name)
                            {
                             list.splice(i,1);
                             i--;
                            }
                            else{
                                last_name=list[i].app_secret;
                            }

                        }
                        list.sort(function(a,b) { 
                        return a.application.localeCompare(b.application)
                        });
                        res.end(JSON.stringify(list));
                }
                else
                    res.end();
            })               
         }
         else
         {
        	new App().where(user).fetchAll().then(function(apps) {
                if(apps) {
                    var list =apps.toJSON()
                     // list[0].app_secret=''
                     // list[0].application=''
                    console.log(user)
          		    res.end(JSON.stringify(list));
                }
                else
                    res.end();
          	})
    }
    });

    app.post('/getusers', function(req, res) {
        var app = req.body;
        // console.log(app)
        new App().where({ 'app_secret' :  app.app_secret}).fetchAll().then(function(users) {
            if(users) {
                // console.loqg(users.toJSON())
                res.end(JSON.stringify(users.toJSON()));
            }
            else
                res.end();
        })
    });


    app.post('/checkappsecret', function(req, res) {
        var secret = req.body.secret;
        new App({ 'app_secret' :  secret}).fetch().then(function(apps1) {
            if(!apps1)
            {
                res.end(JSON.stringify({available : "app_secret not taken"}));
            }
            else
            {
                res.end();
            }
        })
    });


    var fs = require("fs");
    var JSZip = require("jszip");

    app.post('/downloadsdk', function(req, res) {

        var secret = req.body.app_secret;
        var os_type = req.body.os_type;
        var sdkfilename,docsfilename,xmlfilename;
        var files = fs.readdirSync("public/sdk/");
        var androidsdk,iossdk;
        for (var i = 0; i < files.length; i++) {
            if (files[i].indexOf('.jar')>-1) {
                androidsdk=files[i];
            };
            if (files[i].indexOf('.a')>-1) {
                iossdk=files[i];
            };
        };
        if (os_type=='Android') 
        {
            sdkfilename=androidsdk
            docsfilename="ROCQ ANALYTICS-Android_v6.2.pdf"
            xmlfilename="rocq.xml"
        }
        else if(os_type=='iOS')
        {
             sdkfilename=iossdk
             docsfilename="ROCQ ANALYTICS-iOS_v5.2.pdf"
             xmlfilename="rocqAnalytics.h"
        }
        fs.readFile("public/sdk/"+sdkfilename, function(err, data1) {
            if (err) console.log(err);
            fs.readFile("public/sdk/"+docsfilename, function(err, data2) {
                if (err) console.log(err);
                fs.readFile("public/sdk/"+xmlfilename, function(err, data3) {
                   if (err) console.log(err);
                    var zip = new JSZip();
                    var rocq = zip.folder("Rocq");
                    rocq.file("App_Secret.txt", "Your App secret is: "+secret+" \nPlease Keep it Safe.");
                    rocq.file(sdkfilename, data1);
                    rocq.file(docsfilename, data2);
                    rocq.file(xmlfilename, data3);
                    var buffer = zip.generate({type:"nodebuffer"});
                    if (!fs.existsSync("public/sdk/temp")){
                        fs.mkdirSync("public/sdk/temp");
                    }
                    fs.writeFile("public/sdk/temp/files_"+secret+".zip", buffer, function(err) {
                      if (err) console.log(err);
                      res.end();
                    });
                });
            });
        });

    });


    app.post('/deletezip', function(req, res) {
        var secret = req.body.app_secret;
        var fs = require('fs');
        var filePath = "public/files_"+secret+".zip" ; 
        fs.unlinkSync(filePath);
     });
     app.post('/sendmail', function(req, res) {
            var nodemailer = require('nodemailer');
            var generator = require('xoauth2').createXOAuth2Generator({
                user: "hello@rocq.io", // Your gmail address.
                clientId: "825139729500-2lagm7tpdvurihndqovr8js0mrbcr0lf.apps.googleusercontent.com",
                clientSecret: "3Rcl9w0KmqJDVFhveh6q4AjH",
                refreshToken: "1/tAjl1hmexG7VZ_qKn3wHAUBtL6Ef-ClGiFOO10ETsWA",
            });

            // login
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    xoauth2: generator
                }
            });

            var mailOptions = {
                from:"Rocq<hello@rocq.io>",
                to: req.body.username,
                subject: req.body.sub , // Subject line
                //text: 'Hello world ', // plaintext body
                html: req.body.message // html body
            };
                  
            // send mail with defined transport object
            transporter.sendMail(mailOptions, function(error, info){
                if(error){
                   
                    return console.log(error);
                }
                res.end();
                console.log('Message sent: ' + info.response);
            });
    });


};