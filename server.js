// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var morgan   = require('morgan');
//var mongoose = require('mongoose');  // not in use
var passport = require('passport');
var flash    = require('connect-flash');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var configDB = require('./config/database.js');
var compression = require('compression')
var fs = require('fs');
// set up our express application
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'ejs');

app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(compression())
//app.use(require('express-minify')({ mangle: false }));


// configuration ===============================================================
var knex = require('knex')(configDB); // connect to our database
var bookshelf = require('bookshelf')(knex);
app.set('bookshelf', bookshelf);
require('./config/passport')(app,passport); // pass passport for configuration
// For serving static content using express

// required for passport
app.use(session({ secret: 'kumarteja' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
app.use(express.static(__dirname + '/public'));

// if (process.env.NODE_ENV=='pro') {
// console.log("RUNNING IN PRODUCTION MODE")
// app.use(express.static(__dirname + '/public', { maxAge: 1200000 }));
// }
// else{
// console.log("RUNNING IN DEVELOPMENT MODE")
// app.use(morgan('dev')); // log every request to the console
// app.use(express.static(__dirname + '/public'));
// }

// custom middleware to count no of login attemps
app.use(count);
function count(req,res,next) {
	next();
	if (req.url=='/signin') {
		if (!fs.existsSync("public/sdk/temp")){
                        fs.mkdirSync("public/sdk/temp");
                    }
		if (!fs.existsSync("public/sdk/temp/counter.txt")){
                       fs.closeSync(fs.openSync("public/sdk/temp/counter.txt", 'w'));
                    }
	var count = fs.readFileSync("public/sdk/temp/counter.txt",'utf8');
	fs.writeFile("public/sdk/temp/counter.txt", ++count+"")
  };
}

// routes ======================================================================
require('./app/routes')(app,express);
require('./app/routes/auth')(app, passport); // load our routes and pass in our app and fully configured passport
require('./app/routes/applications')(app);
require('./app/routes/segments')(app);
require('./app/routes/campaigns')(app);
require('./app/routes/AdTracker')(app);
require('./app/routes/admin')(app,express);
require('./app/routes/home')(app,express);
require('./app/routes/forgot')(app,express);
require('./app/routes/funnel')(app);
require('./app/routes/dynamic_segment')(app);

// app.get('/rocqdemo', function(req, res){
//   var file = 'RocqDemo.apk';
//   res.download(file); // Set disposition and send it.
// });
// redirect all others to the index (HTML5 history)
app.get('*', function(req, res){
	res.render('index.html');
});

app.set('/views',function(req,res){
    res.render()
})

// launch ======================================================================
var port     = process.env.PORT || 8000;
app.listen(port);
console.log('The magic happens on port ' + port);
