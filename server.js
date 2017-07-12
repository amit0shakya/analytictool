// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var morgan   = require('morgan');

// set up our express application
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(morgan('dev')); // log every request to the console

// For serving static content using express
app.use(express.static(__dirname + '/public'));

// routes ======================================================================
require('./app/routes')(app);

// redirect all others to the index (HTML5 history)
app.get('*', function(req, res){
	res.render('index.html');
});

// launch ======================================================================
var port     = process.env.PORT || 3000;
app.listen(port);
console.log('The magic happens on port ' + port);

