var bcrypt   = require('bcrypt-nodejs');

module.exports = function(app, passport) {
    var User      = require('../models/user')(app);
    var UserActivation      = require('../models/useractivation')(app);

    // passport authentication for login
    app.post('/signin', passport.authenticate('local-login'), function(req, res) {
      	res.send(req.user);
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.end();
    });

    // required in invitation page to check if user exist before sending mail
    app.post('/userexists', function(req, res) {
        username = req.body
        new User({'username' : username.username}).fetch().then(function(user1){
            if(user1)
            {
                res.end('yes');
            }
            else
            {
               res.end('no');
            }
        })
        
    });

    app.post('/signup', function(req, res) {
    	user = req.body
        new User({'username' : user.username}).fetch().then(function(user1){
            if(user1)
            {
                res.end(JSON.stringify({error : "Username already taken"}));
            }
            else
            {
            
                 var crypto = require('crypto');
                       user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(8), null);
                       crypto.randomBytes(20, function(err, buf) {
                           var token = buf.toString('hex');
                              var name =user.firstname;
                              console.log(name);
                           user.token=token;
                           user.timeout=Date.now() + 86400000;
                           new UserActivation(user).save().then(function(model) {
                                if (model) {
                                 sendmail(user.username,'Activate your rocQ Account!', 
'<html xmlns="http://www.w3.org/1999/xhtml"> <head> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/> <title>Emailer | Rocq </title> </head> <body style="background-color:#f3f3f3;"> <table width="650" border="0" cellspacing="0" cellpadding="0" style="margin:0 auto;"> <tr> <td>&nbsp;</td></tr><tr> <td><img src="http://dashboard.rocq.io/images/logo-rocq.png" width="127" height="48"/></td></tr><tr> <td>&nbsp;</td></tr><tr> <td> <table width="100%" border="0" cellspacing="0" cellpadding="0"> <tr> <td width="80%" style="background-color:#3566b0; height:5px;"></td><td width="20%" style="background-color:#f58220;"></td></tr></table> </td></tr><tr> <td style="background-color:#fff; padding:40px; border:1px solid #ddd;"> <p style="font-family:Arial, Helvetica, sans-serif; font-size:16px; color:#333; padding-bottom:15px;">Hi <strong>'+name+',</strong></p><p style="font-family:Arial, Helvetica, sans-serif; font-size:16px; color:#333; padding-bottom:15px; line-height:24px;"> Thanks for setting up your account on rocQ, a radical mobile analytics platform for connected devices. </p><p style="font-family:Arial, Helvetica, sans-serif; font-size:16px; color:#333; padding-bottom:15px; line-height:24px;"> We’ll help you track your app uninstalls, discover your users’ behavior and engage the right users with the right insights. </p><p style="font-family:Arial, Helvetica, sans-serif; font-size:16px; color:#333; padding-bottom:15px; line-height:24px;"> To activate your rocQ account, please click the following button:</p><a href="http://dashboard.rocq.io/activate/'+token+'"style="background-color:#f58220; color:#fff; font-size:20px; font-weight:normal; padding:10px; border:0; text-decoration:none; border-radius:4px; margin-bottom:20px; margin-top:15px;">Activate Your Account</a> <p style="font-family:Arial, Helvetica, sans-serif; font-size:13px; color:#333; padding-bottom:5px; line-height:24px; padding-top:20px; color:#888;"> </br> In case, the button above does not work, copy and paste the following URL in a new browser window instead. </p><p style="font-family:Arial, Helvetica, sans-serif; font-size:16px; color:#333; padding-bottom:15px; line-height:24px; color:#3566b0; "> http://dashboard.rocq.io/activate/'+token+'</p></td></tr><tr> <td align="center"> <p style="font-family:Arial, Helvetica, sans-serif; font-size:11px; color:#787878; padding:5px 0; ">Copyright © 2015 rocQ All rights reserved</p></td></tr></table> </body></html>' 

)
                                res.end(JSON.stringify({email:user.username}));
                            }
                            else{
                                res.end(JSON.stringify({error : "Unknown Error has occured"}));
                            }
                        });
                       });
               //  new UserActivation({'username' : user.username}).fetch().then(function(user2){
               //      if (user2 && user2.toJSON.timout<Date.now()) {
               //          res.end(JSON.stringify({error : "User already exists"}));
               //      }
               //      else{
               //          var crypto = require('crypto');
               //         user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(8), null);
               //         crypto.randomBytes(20, function(err, buf) {
               //             var token = buf.toString('hex');
               //             user.token=token;
               //             user.timeout=Date.now() + 86400000;
               //             new UserActivation(user).save().then(function(model) {
               //                  if (model) {
               //                   sendmail(user.username,'Activate your rocQ Account!', 
               //                  '<html xmlns="http://www.w3.org/1999/xhtml"> <head> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/> <title>Emailer | Rocq </title> </head> <body style="background-color:#f3f3f3;"> <table width="650" border="0" cellspacing="0" cellpadding="0" style="margin:0 auto;"> <tr> <td>&nbsp;</td></tr><tr> <td><img src="http://rocq.io/images/logo-rocq.png" width="127" height="48"/></td></tr><tr> <td>&nbsp;</td></tr><tr> <td> <table width="100%" border="0" cellspacing="0" cellpadding="0"> <tr> <td width="80%" style="background-color:#3566b0; height:5px;"></td><td width="20%" style="background-color:#f58220;"></td></tr></table> </td></tr><tr> <td style="background-color:#fff; padding:40px; border:1px solid #ddd;"> <p style="font-family:Arial, Helvetica, sans-serif; font-size:16px; color:#333; padding-bottom:15px;">Hi <strong>New User,</strong></p><p style="font-family:Arial, Helvetica, sans-serif; font-size:16px; color:#333; padding-bottom:15px; line-height:24px;"> Thanks for setting up your account on rocQ, a radical mobile analytics platform for connected devices. </br></br> We’ll help you track your app uninstalls, discover your users’ behavior and engage the right users with the right insights. </br></br></p><a href="http://rocq.io/activate/'+token+'"style="background-color:#f58220; color:#fff; font-size:16px; font-weight:normal; padding:10px; border:0; text-decoration:none; border-radius:4px; margin-bottom:20px;">Activate</a> </td></tr><tr> <td align="center"> <p style="font-family:Arial, Helvetica, sans-serif; font-size:11px; color:#787878; padding:5px 0; ">Copyright © 2015 rocQ All rights reserved</p></td></tr></table> </body></html>'                                )
               //                  res.end();
               //              }
               //              else{
               //                  res.end(JSON.stringify({error : "Unknown Error has occured"}));
               //              }
               //          });
               //         });
               //     }
               // });
            }
        })
});

    app.get('/activate/:token', function(req, res) {
         var token = req.params.token;
         new UserActivation({'token' : token}).fetch().then(function(user1){
           
            if (user1==null) {
                res.end('Invalid URL or Your account is already activated')
            }
            else if (!user1.toJSON().timeout || user1.toJSON().timeout<Date.now()) {

                res.end('Your activation link has expired. Please Try Again.')
            }
            else{
                user1=user1.toJSON();
                new User({'username' : user1.username}).fetch().then(function(user2){
                    if (user2) {
                        res.end('Your account is already activated')
                    }
                    else{
                        delete user1['token'];
                        delete user1['timeout'];
                        console.log(user1);
                        new User(user1).save().then(function(model) {
                            if (model) {
                                 new UserActivation().where({'username' : user1.username}).destroy().then(function(model) {
                                });
                                res.redirect("/verified");
                            }
                            else{
                                res.end('An error has occured')
                            }
                        });
                    }
                })
            }
         }).catch(function(e) {
            console.log(e);
               res.end('Unable to connect to server')
            });
    });

var sendmail = function(email,subject,body) {
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
                to: email,
                subject: subject, // Subject line
                //text: 'Hello world ', // plaintext body
                html: body // html body
            };
                  
            // send mail with defined transport object
            transporter.sendMail(mailOptions, function(error, info){
                if(error){
                    return console.log(error);
                }
                console.log('Message sent: ' + info.response);
            });
    };


};