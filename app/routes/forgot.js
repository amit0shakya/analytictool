module.exports = function(app,express) {

var User      = require('../models/user')(app);
var bcrypt   = require('bcrypt-nodejs');
var xoauth2 = require('xoauth2');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
 app.get('/reset/:token', function(req, res) {
     var token = req.params.token;
     new User({'resettoken' : token}).fetch().then(function(user1){
       
        if (user1==null) {
            res.end('Your reset link is invalid. Please Try Again.')
        }
        else if (!user1.toJSON().resettimeout || user1.toJSON().resettimeout<Date.now()) {

            res.end('Your reset link has expired. Please Try Again.')
        }
        else{
            res.redirect("/resetpassword?token="+token+"&email="+user1.toJSON().username);
        }
     })
       
});

 app.post('/resetpassword', function(req, res) {
    var token = req.body.resettoken;
    var pass = req.body.password;
    pass = bcrypt.hashSync(pass, bcrypt.genSaltSync(8), null);
                new User().where({resettoken:token}).save({password:pass,resettimeout:null,resettoken:null},{method:'update'}).then(function(model) {
                    if (model) {
                        res.end('success');
                    }
                    else{
                        res.end('An error has occured');
                    }
                }).catch(function(e) {
                    res.end('Reset url is Invalid');
                    console.log(e)
                });
 })


 app.post('/forgot', function(req, res) {
    

var generator = xoauth2.createXOAuth2Generator({
                user: "hello@rocq.io", // Your gmail address.
                clientId: "825139729500-2lagm7tpdvurihndqovr8js0mrbcr0lf.apps.googleusercontent.com",
                clientSecret: "3Rcl9w0KmqJDVFhveh6q4AjH",
                refreshToken: "1/tAjl1hmexG7VZ_qKn3wHAUBtL6Ef-ClGiFOO10ETsWA",
            });

//create reusable transporter object using SMTP transport
 var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    xoauth2: generator
                }
            });
var token;
crypto.randomBytes(20, function(err, buf) {
         token = buf.toString('hex');
      
// var transporter = nodemailer.createTransport();

// NB! No need to recreate the transporter object. You can use
// the same transporter object for all e-mails

// setup e-mail data with unicode symbols


        username = req.body.email;
        new User({'username' : username}).fetch().then(function(user1){
            if(user1)
            {
                new User().where({'username' : username}).save({resettoken:token,resettimeout:Date.now() + 86400000},{method:'update'}).then(function(user2){
                // console.log(user2)
                if(user2)
                {
                    res.end('success');
                    // send mail with defined transport object
                    var name =user1.toJSON().firstname;
                    var mailOptions = {
                        from:"Rocq<hello@rocq.io>",
        to: req.body.email, // list of receivers
        subject: 'Password Reset ', // Subject line
        //text: 'Hello world ', // plaintext body
        //html: '<p>An absolute URL: <a href="http://localhost:8000/reset/'+token+'">Reset Password</a></p>' // html body
        html: '<html xmlns="http://www.w3.org/1999/xhtml"> <head> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/> <title>Emailer | Rocq </title> </head> <body style="background-color:#f3f3f3;"> <table width="650" border="0" cellspacing="0" cellpadding="0" style="margin:0 auto;"> <tr> <td>&nbsp;</td></tr><tr> <td><img src="http://dashboard.rocq.io/images/logo-rocq.png" width="127" height="48"/></td></tr><tr> <td>&nbsp;</td></tr><tr> <td> <table width="100%" border="0" cellspacing="0" cellpadding="0"> <tr> <td width="80%" style="background-color:#3566b0; height:5px;"></td><td width="20%" style="background-color:#f58220;"></td></tr></table> </td></tr><tr> <td style="background-color:#fff; padding:40px; border:1px solid #ddd;"> <p style="font-family:Arial, Helvetica, sans-serif; font-size:16px; color:#333; padding-bottom:15px;">Hi <strong>'+name+',</strong></p><p style="font-family:Arial, Helvetica, sans-serif; font-size:16px; color:#333; padding-bottom:15px; line-height:24px;"> We have received a password change request for your rocQ account. Please click the button below to reset your password.</p><a href="http://dashboard.rocq.io/reset/'+token+'"style="background-color:#f58220; color:#fff; font-size:16px; font-weight:normal; padding:10px; border:0; text-decoration:none; border-radius:4px; margin-bottom:20px;">Reset Password</a> <p style="font-family:Arial, Helvetica, sans-serif; font-size:13px; color:#333; padding-bottom:5px; line-height:24px; padding-top:20px; color:#888;"> </br> In case, the button above does not work, copy and paste the following URL in a new browser window instead. </p><p style="font-family:Arial, Helvetica, sans-serif; font-size:16px; color:#333; padding-bottom:15px; line-height:24px; color:#3566b0; "> http://dashboard.rocq.io/reset/'+token+'</p></td></tr><tr> <td align="center"> <p style="font-family:Arial, Helvetica, sans-serif; font-size:11px; color:#787878; padding:5px 0; ">Copyright © 2015 rocQ All rights reserved</p></td></tr></table> </body></html>'
 };  
                    transporter.sendMail(mailOptions, function(error, info){
                        if(error){
                           
                            return console.log(error);
                        }
                        else{
                            
                            console.log('Message sent: ' + info.response);
                        }
                        
                    });
                    
                }
                else
                {
                   res.end('An Error Ocurred');
                }
        })
            }
            else
            {
               res.end('This Email is not registered');
            }
        }).catch(function(e) {
            console.log(e);
               res.end('Unable to connect to server')
            });
        
        

  

});
});
};