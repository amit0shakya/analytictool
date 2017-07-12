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
        date.setUTCDate(date.getUTCDate()-endGap);
        date.setUTCDate(date.getUTCDate()-noDays+1);
        /* creating a map */
        var map = {};
        for(i=0; i<noDays; i++) {
            var month = date.toUTCString().split(" ")[2];
            var day = date.getUTCDate();
            map[month+" "+day]=0
            date.setUTCDate(date.getUTCDate()+1);
        }
        for(i=0;i<data.length;i++) {
            map[data[i].x]=data[i].y;
        }
        date = new Date();
        date.setUTCDate(date.getUTCDate()-endGap);
        date.setUTCDate(date.getUTCDate()-noDays+1);
        var mod_data = [];
        for(i=0;i<noDays;i++) {
            var month = date.toUTCString().split(" ")[2];
            var day = date.getUTCDate();
            var key = month + " " + day;
            mod_data=mod_data.concat({'x':key,'y':map[key]});
            date.setUTCDate(date.getUTCDate()+1);
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
        date.setUTCDate(date.getUTCDate()-endGap);
        date.setUTCDate(date.getUTCDate()-noDays+1);
        /* creating a map */
        var installs = {};
        for(i=0; i<noDays; i++) {
            var month = date.toUTCString().split(" ")[2];
            var day = date.getUTCDate();
            installs[month+" "+day]={"x":0,"y":0}
            date.setUTCDate(date.getUTCDate()+1);
        }
        for(i=0;i<data1.length;i++) {
            installs[data1[i].x].x=data1[i].y;
        }
        for(i=0;i<data2.length;i++) {
            installs[data2[i].x].y=data2[i].y;
        }
        /* constructing the merged array */
        date = new Date();
        date.setUTCDate(date.getUTCDate()-endGap);
        date.setUTCDate(date.getUTCDate()-noDays+1);
        var mod_data = [];
        for(i=0;i<noDays;i++) {
            var month = date.toUTCString().split(" ")[2];
            var day = date.getUTCDate();
            var key = month + " " + day;
            var types = [];
            var paid = {"x":key1,"y":installs[key].x};
            var organic = {"x":key2,"y":installs[key].y};
            types=types.concat(paid);
            types=types.concat(organic);
            mod_data=mod_data.concat({"z":month+" "+day,"a":types});
            date.setUTCDate(date.getUTCDate()+1);
        }
        /* Making the array to store cumulative count */
        // temp1 = 0;
        // temp2 = 0;
        // for(i=0;i<mod_data.length;i++) {
        //     temp1 += parseInt(mod_data[i].a[0].y);
        //     temp2 += parseInt(mod_data[i].a[1].y);
        //     mod_data[i].a[0].y = temp1;
        //     mod_data[i].a[1].y = temp2;
        // }
        return mod_data;
    };


     // merge function for threevar
    this.merge3 = function(data1,data2,data3,key1,key2,key3,endGap,noDays) {
        var date = new Date()
        date.setUTCDate(date.getUTCDate()-endGap);
        date.setUTCDate(date.getUTCDate()-noDays+1);
        /* creating a map */
        var installs = {};
        for(i=0; i<noDays; i++) {
            var month = date.toUTCString().split(" ")[2];
            var day = date.getUTCDate();
            installs[month+" "+day]={"x":0,"y":0,"z":0}
            date.setUTCDate(date.getUTCDate()+1);
        }
        for(i=0;i<data1.length;i++) {
            installs[data1[i].x].x=data1[i].y;
        }
        for(i=0;i<data2.length;i++) {
            installs[data2[i].x].y=data2[i].y;
        }
        for(i=0;i<data3.length;i++) {
            installs[data3[i].x].z=data3[i].y;
        }
        /* constructing the merged array */
        date = new Date();
        date.setUTCDate(date.getUTCDate()-endGap);
        date.setUTCDate(date.getUTCDate()-noDays+1);
        var mod_data = [];
        for(i=0;i<noDays;i++) {
            var month = date.toUTCString().split(" ")[2];
            var day = date.getUTCDate();
            var key = month + " " + day;
            var types = [];
            var paid = {"x":key1,"y":installs[key].x};
            var organic = {"x":key2,"y":installs[key].y};
            var inorganic = {"x":key3,"y":installs[key].z};
            types=types.concat(paid);
            types=types.concat(organic);
            types=types.concat(inorganic);
            mod_data=mod_data.concat({"z":month+" "+day,"a":types});
            date.setUTCDate(date.getUTCDate()+1);
        }
        /* Making the array to store cumulative count */
        // temp1 = 0;
        // temp2 = 0;
        // for(i=0;i<mod_data.length;i++) {
        //     temp1 += parseInt(mod_data[i].a[0].y);
        //     temp2 += parseInt(mod_data[i].a[1].y);
        //     mod_data[i].a[0].y = temp1;
        //     mod_data[i].a[1].y = temp2;
        // }
        return mod_data;
    };

    // screen flow json formater service

    // total in count for an node : returns number
     this.get_in_count = function(in_data){
      var count = 0;
      for(var i=0;i<in_data.length;i++){
        console.log(in_data);
        count += in_data[i].y;
      }
      return count;
    }

    // total out count for an node : returns number
    this.get_out_count = function(out_data){
      var count = 0;
      for(var i=0;i<out_data.length;i++){
        count += out_data[i].y;
      }
      return count;
    }

    // lable for an activity : return string
     this.get_label_activity = function(unique_activity){
      var t = unique_activity.split('.');
      var t1 = t[t.length-1];
      return t1;
    }

    // id for an activity : returns string
     this.get_activity_id = function(unique_activity){
      var t = unique_activity.split('.');
      var str = '';
      for(var i=0;i<t.length;i++){
        str += t[i]+'_';
      }
      return str;
    }


    //  namespace for an activity : returns string
     this.get_namespace = function(unique_activity){
      return unique_activity;
    }


    // all out activity for a node : returns array
     this.out_data = function(unique_activity,data,key){
        var out_data = [];
        var total_out_count = 0;
        for(var j=0;j<data.length;j++){
          if(unique_activity === data[j].x2){
            out_data.push(data[j])
            total_out_count += data[j].y;
          }
        }
        if(key ==='data'){
          return out_data;
        }else{
          return total_out_count;
        }
      return null;
    }

    // all in activity for a node : returns array
     this.in_data = function(unique_activity,data,key){
      var in_data = [];
      var total_in_count = 0;
        for(var j=0;j<data.length;j++){
          if(unique_activity === data[j].x1){
            in_data.push(data[j]);
            total_in_count += data[j].y;
          }
        }
        if(key === 'data'){
          return in_data;
        }else{
          return total_in_count;
        }
      return null;
    }




});
