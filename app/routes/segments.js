module.exports = function(app) {

    var Segment      = require('../models/segment')(app);

    app.post('/getsegments', function(req, res) {
    	var segment = req.body;
        if (segment.app_secret=='3974ba7380') {
            var list = [ { id: 1,
            segmentname: 'All',
            domainname: '',
            app_secret: '3974ba7380' },
            { id: 2,
            segmentname: '3 Day inactive',
            domainname: '',
            app_secret: '3974ba7380' },
            { id: 3,
            segmentname: '14 Day inactive',
            domainname: '',
            app_secret: '3974ba7380' },
            { id: 4,
            segmentname: '30 Day inactive',
            domainname: '',
            app_secret: '3974ba7380' },
            { id: 5,
            segmentname: 'Users who purchased electronics',
            domainname: '',
            app_secret: '3974ba7380' },
            { id: 6,
            segmentname: 'Users from Delhi',
            domainname: '',
            app_secret: '3974ba7380' },
            { id: 7,
            segmentname: 'Users who bought something',
            domainname: '',
            app_secret: '3974ba7380' } ];
            res.end(JSON.stringify(list));
        };
    	new Segment().where({ 'app_secret' :  segment.app_secret}).fetchAll().then(function(segments) {
            if(segments) {
                var segs = segments.toJSON();
                // if(!does_segemts_contain_given_segment(segs,'All'))
                // {
                //     segs.unshift({ id: 100,
                //     segmentname: 'All',
                //     domainname: 'all',
                //     app_secret: segment.app_secret })
                // }
                if(!does_segemts_contain_given_segment(segs,'Dormant0_30'))
                {
                    segs.push({ id: 101,
                    segmentname: '30 days Dormant Users ',
                    domainname: 'Dormant0_30',
                    app_secret: segment.app_secret })
                }
                if(!does_segemts_contain_given_segment(segs,'Dormant30_14'))
                {
                    segs.push({ id: 102,
                    segmentname: '14 days Dormant Users ',
                    domainname: 'Dormant30_14',
                    app_secret: segment.app_secret })
                }
                 if(!does_segemts_contain_given_segment(segs,'Dormant14_7'))
                {
                    segs.push({ id: 103,
                    segmentname: '7 days Dormant Users ',
                    domainname: 'Dormant14_7',
                    app_secret: segment.app_secret })
                }
                if(!does_segemts_contain_given_segment(segs,'Dormant7_3'))
                {
                    segs.push({ id: 104,
                    segmentname: '3 days Dormant Users ',
                    domainname: 'Dormant7_3',
                    app_secret: segment.app_secret })
                }
                console.log(segs)
      		    res.end(JSON.stringify(segs));
            }
            else
                res.end();
      	})
    });

        var does_segemts_contain_given_segment = function(segs,segname)
        {
            for (var i = 0; i < segs.length; i++) {
                   if(segs[i].segmentname.toUpperCase()==segname.toUpperCase())
                   {
                    return true;
                   }
            };
            return false;
        }
        
};