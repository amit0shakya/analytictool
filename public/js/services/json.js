var json = angular.module('Services');
json.service('JSONService', function() {
    this.cummulative = function(data) {
        var temp = 0;
        var mod_data = [];
        for (i=0; i<data.length; i++) {
            temp += parseInt(data[i].y);
            mod_data = mod_data.concat({'x':data[i].x,'y':temp});
        }
        return mod_data;
    };
    this.parse = function(data) {
        for(i=0; i<data.length; i++) {
            data[i].a = JSON.parse(data[i].a);
        }
        return data;
    };
    /* fills the missing dates of the array with value 0 */
    this.fill = function(data,endGap,noDays) {
        var date = new Date()
        date.setDate(date.getDate()-endGap);
        date.setDate(date.getDate()-noDays+1);
        /* creating a map */
        var map = {};
        for(i=0; i<noDays; i++) {
            var month = date.toDateString().split(" ")[1];
            var day = date.getDate();
            map[month+" "+day]={"x":0}
            date.setDate(date.getDate()+1);
        }
        for(i=0;i<data.length;i++) {
            map[data[i].x].x=data[i].y;
        }
        date = new Date();
        date.setDate(date.getDate()-endGap);
        date.setDate(date.getDate()-noDays+1);
        var mod_data = [];
        for(i=0;i<noDays;i++) {
            var month = date.toDateString().split(" ")[1];
            var day = date.getDate();
            var key = month + " " + day;
            mod_data=mod_data.concat({'x':key,'y':map[key].x});
            date.setDate(date.getDate()+1);
        }
        return mod_data;
    }
    /* input is 
        data1 : [ {
                    'x' : 'Nov 3',
                    'y' : 100
                   }
                ]
        data2 : [ {
                    'x' : 'Nov 3',
                    'y' : 200
                   }
                ]
        key1 : 'installs'
        key2 : 'uninstalls'
        output is 
            mod_data : [ {
                            'z' : 'Nov 3',
                            'a' : [ {
                                        'x' : 'installs'
                                        'y' : 100
                                    },
                                    {
                                        'x' : 'uninstalls'
                                        'y' : 200
                                    }
                                  ]
                          }
                        ]
      * from mod_data we can plot those two as multiline graph
      */
    this.merge = function(data1,data2,key1,key2,endGap,noDays) {
        var date = new Date()
        date.setDate(date.getDate()-endGap);
        date.setDate(date.getDate()-noDays+1);
        console.log(data1);
        console.log(data2);
        /* creating a map */
        var installs = {};
        for(i=0; i<noDays; i++) {
            var month = date.toDateString().split(" ")[1];
            var day = date.getDate();
            installs[month+" "+day]={"x":0,"y":0}
            date.setDate(date.getDate()+1);
        }
        console.log(installs);
        for(i=0;i<data1.length;i++) {
            installs[data1[i].x].x=data1[i].y;
        }
        for(i=0;i<data2.length;i++) {
            installs[data2[i].x].y=data2[i].y;
        }
        /* constructing the merged array */ 
        date = new Date();
        date.setDate(date.getDate()-endGap);
        date.setDate(date.getDate()-noDays+1);
        var mod_data = [];
        for(i=0;i<noDays;i++) {
            var month = date.toDateString().split(" ")[1];
            var day = date.getDate();
            var key = month + " " + day;
            var types = [];
            var paid = {"x":key1,"y":installs[key].x};
            var organic = {"x":key2,"y":installs[key].y};          
            types=types.concat(paid);
            types=types.concat(organic);
            mod_data=mod_data.concat({"z":month+" "+day,"a":types});
            date.setDate(date.getDate()+1);
        }
        /* Making the array to store cumulative count */
        temp1 = 0;
        temp2 = 0;
        for(i=0;i<mod_data.length;i++) {
            temp1 += parseInt(mod_data[i].a[0].y);
            temp2 += parseInt(mod_data[i].a[1].y);
            mod_data[i].a[0].y = temp1;
            mod_data[i].a[1].y = temp2;
        }
        return mod_data;
    };
})