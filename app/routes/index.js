module.exports = function(app,express) {

    app.use('/views',express.static('views'))

    app.get('/login', function(req, res){
        res.render('index.html');
    });

    app.get('/index2',function(req,res){
      res.render('index2.html')
    });
    app.get('/partials/:name', function(req, res){
        res.render('partials/' + req.params.name);
    });
};