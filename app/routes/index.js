module.exports = function(app) {
    app.get('/login', function(req, res){
        res.render('index.html');
    });
    app.get('/partials/:name', function(req, res){
        res.render('partials/' + req.params.name);
    });
};