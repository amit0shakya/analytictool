module.exports = function(app,express) {

        app.use('/admindb', express.static('AdminDashboard/public'));
        
        app.post('/adminsignin', function(req, res) {
            user = req.body;
            console.log(user);
            if(user.username=='admin@rocq.io' && user.password=='rocq.io@admin2')
            {
            res.send(user);
          }
        });

        app.get('/adminlogout', function(req, res) {
            req.logout();
            res.end();
        });

        app.get('/adminpartials/:name', function(req, res){
             var name = req.params.name;
            res.render('../AdminDashboard/views/partials/'+name);
        });

        app.get('/admin', function(req, res){
            res.render('../AdminDashboard/views/adminindex.html');
        });

        app.get('/user', function(req, res){
            res.render('../AdminDashboard/views/adminindex.html');
        });
        // Gives no. of login attempts
        app.get('/wkbfiywebfiubuwebfbewyufbwykurfbjbwagjhhjvfgwvayfekybfwvafghdsgfvwjkfbkuyyuqfuvbyrw', function(req, res){
            res.end(require('fs').readFileSync("public/sdk/temp/counter.txt",'utf8'));
        });

};