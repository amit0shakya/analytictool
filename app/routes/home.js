module.exports = function(app,express) {

        app.use('/home', express.static('Home'));

        app.get('/', function(req, res){
            res.render('../Home/index.html');
        });

        // app.get('/blog', function(req, res){
        //     res.render('../Home/blog/index.html');
        // });

         app.get('/pricing.html', function(req, res){
            res.render('../Home/pricing.html');
        });
          app.get('/features.html', function(req, res){
            res.render('../Home/features.html');
        });
           app.get('/customer-stories.html', function(req, res){
            res.render('../Home/customer-stories.html');
        });

           app.get('/faq.html', function(req, res){
            res.render('../Home/faq.html');
        });

            app.get('/thankyou.html', function(req, res){
            res.render('../Home/thankyou.html');
        });

              app.get('/contact.html', function(req, res){
            res.render('../Home/contactus.html');
        });

            app.get('/home/blog/:name', function(req, res){
            res.render('../Home/blog_post/'+ req.params.name);
        });

        //   app.get('/why-rocq', function(req, res){
        //     res.render('../Home/why-rocq.html');
        // });

        //    app.get('/why-rocq-engage', function(req, res){
        //     res.render('../Home/why-rocq-engage.html');
        // });

        //     app.get('/why-rocq-discover', function(req, res){
        //     res.render('../Home/why-rocq-discover.html');
        // });


        app.post('/contactus', function(req, res) {
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
                //from:"Rocq<hello@rocq.io>",
                to: 'contact@rocq.io',
                subject: 'Contact User', // Subject line
                text: JSON.stringify(req.body,null,'\t'), // plaintext body
                //html: req.body.message // html body
            };
            // send mail with defined transport object
            transporter.sendMail(mailOptions, function(error, info){
                if(error){
                   return console.log(error);
                }
                res.end('success');
                console.log('Message sent: ' + info.response);
            });
    }); 
};