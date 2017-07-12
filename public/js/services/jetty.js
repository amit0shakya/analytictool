/**
 * Updated by Abhishek Kumar Gupta
 *
*/
var jetty = angular.module('Services');
jetty.service('JettyService',['$http','$rootScope','$q',function($http,$rootScope,$q) {

    var URL="http://api.rocq.io:8085/";

    this.city_code = function(name,value,callback) {
        $http(
        {
            url: URL +'getcode',//'http://148.251.42.156:1729/getcode',
            method: 'GET',
            params:
            {
                city: name
            }
        }).success(function(data) {
            var data_point = {"x":data,"y":value}
            callback(data_point)
        });
    };





    this.state_code = function(name,value,callback) {
        var data = {"andaman and nicobar islands" : "001" , "andhra pradesh" : "002" , "arunachal pradesh" : "003" , "assam" : "004" , "bihar" : "005" , "chandigarh" : "006" , "chhattisgarh" : "007" , "dadra and nagar haveli" : "008" , "daman and diu" : "009" , "delhi" : "010" , "goa" : "011" , "gujarat" : "012" , "haryana" : "013" , "himachal pradesh" : "014" , "jammu and kashmir" : "015" , "jharkhand" : "016" , "karnataka" : "017" , "kerala" : "018" , "lakshadweep" : "019" , "madhya pradesh" : "020" , "maharashtra" : "021" , "manipur" : "022" , "meghalaya" : "023" , "mizoram" : "024" , "nagaland" : "025" , "orissa" : "026" , "pondicherry" : "027" , "punjab" : "028" , "rajasthan" : "029" , "sikkim" : "030" , "tamil nadu" : "031" , "telangana" : "036" , "tripura" : "032" , "uttar pradesh" : "033" , "uttaranchal" : "034" , "west bengal" : "035"};
        var data_point = {"x":{code:data[name], city:name},"y":value};
        callback(data_point)
    };

    // getSources Api Call
    this.getSources = function(domain,app,endGap,key,noDays,noVar,timeZone,type){
        var deffered = $q.defer();
        console.log('[+] JettyService: Get Sources Api Call [+]');
        $http(
        {
            url: URL+'keycummulative',
            method: 'GET',
            params:
            {
              domain: domain,
              app: app,
              endGap: endGap,
              key:key,
              noDays: noDays,
              noVar: noVar,
              timeZone: timeZone,
              type: type,
            }
        }
        ).success(function(data) {
            deffered.resolve(data);
            console.log(data);
        }).error(function(){
            deffered.reject('[-] GetSources:Failed to get the data [-]')
        });

        return deffered.promise;
    }



    this.cohortSourceWise = function(domain,app,endGap,gran,key,noDays,noVar,timeZone,type){
      console.log('[+] JettyService: cohortSourceWise [+]');
      console.log('Calling cohort source wise');
      var deffered = $q.defer();
      if (app == '3974ba7380') {
          try {
               var jsondata = cloneObject(eval(domain + '_granwise'));
               var dataunit, array = [];
               var curr_date = new Date();
               var length =jsondata.length;
               curr_date = new Date(Number(curr_date) - 86400000 * (endGap+range-1));
               var date = curr_date.getDate();
               if(typeof jsondata[0].z == 'string'){ // cohort data
                        for (var i = date; i < range+date; i++) {
                             dataunit = {z: "",a: []};
                             dataunit.z = curr_date.toUTCString().split(" ")[2]+' '+curr_date.getUTCDate();
                              dataunit.a=jsondata[i%length].a;

                             array.push(dataunit);
                             curr_date = new Date(Number(curr_date) + 86400000);
                         }
                  }else{
                        for (var i = date; i < range+date; i++) {
                             dataunit = {x: "",y: ""};
                             dataunit.x = curr_date.toUTCString().split(" ")[2]+' '+curr_date.getUTCDate();
                             if(jsondata[0].y.indexOf('__')>=0)
                                 {
                                     dataunit.y=modifyNumbers(jsondata[i % length].y.split('__')[0]*range/32)+'__'+modifyNumbers(jsondata[i % length].y.split('__')[1]);
                                 }
                             else   // its a number in string format
                                 {
                                     dataunit.y = String(modifyNumbers(jsondata[i % length].y));
                                 }
                             array.push(dataunit);
                             curr_date = new Date(Number(curr_date) + 86400000);
                            }
                  }
      //          console.log('var '+domain+'_granwise = '+JSON.stringify(array)+';');
                 deffered.resolve(array);
                 return deffered.promise;
         } catch (err) {
             console.log(err.message);
         }
      }
      $http(
      {
          url: URL+'keygranwise',
          method: 'GET',
          params:
          {
              app: app,
              domain: domain,
              endGap: endGap,
              gran: gran,
              key:key,
              noDays: noDays,
              noVar: noVar,
              timeZone: timeZone,
              type: type
          }
      }
      ).success(function(data) {
          console.log('changing the data',data);
          deffered.resolve(data);
      }).error(function(error){
          deffered.reject('[-] Cohort Source wise : Failed to get the data [-]');
      });
      return deffered.promise;
    }

     this.granwise = function(domain,app,endGap,range,gran,noVar,type,timeZone) {
        var deffered = $q.defer();
        // what is app == '3974ba7380'

          if (app == '3974ba7380') {
        try {
             var jsondata = cloneObject(eval(domain + '_granwise'));
             var dataunit, array = [];
             var curr_date = new Date();
             var length =jsondata.length;
             curr_date = new Date(Number(curr_date) - 86400000 * (endGap+range-1));
             var date = curr_date.getDate();
             if(typeof jsondata[0].z == 'string')  // cohort data
                   {
                      for (var i = date; i < range+date; i++) {
                           dataunit = {z: "",a: []};
                           dataunit.z = curr_date.toUTCString().split(" ")[2]+' '+curr_date.getUTCDate();
                            dataunit.a=jsondata[i%length].a;

                           array.push(dataunit);
                           curr_date = new Date(Number(curr_date) + 86400000);
                       }
                   }
            else
                {
                   for (var i = date; i < range+date; i++) {
                       dataunit = {x: "",y: ""};
                       dataunit.x = curr_date.toUTCString().split(" ")[2]+' '+curr_date.getUTCDate();
                       if(jsondata[0].y.indexOf('__')>=0)
                           {
                               dataunit.y=modifyNumbers(jsondata[i % length].y.split('__')[0]*range/32)+'__'+modifyNumbers(jsondata[i % length].y.split('__')[1]);
                           }
                       else   // its a number in string format
                           {
                               dataunit.y = String(modifyNumbers(jsondata[i % length].y));
                           }
                       array.push(dataunit);
                       curr_date = new Date(Number(curr_date) + 86400000);
                   }
                }
  //          console.log('var '+domain+'_granwise = '+JSON.stringify(array)+';');
           deffered.resolve(array);
           return deffered.promise;

       } catch (err) {
           console.log(err.message);
       }
   }
        $http(
        {
            url: URL+'granwise',
            method: 'GET',
            params:
            {
                domain: domain,
                app: app,
                endGap: endGap,
                noDays: range,
                gran: gran,
                noVar: noVar,
                type: type,
                timeZone: timeZone
            }
        }
        ).success(function(data) {
            deffered.resolve(data);
        });
        return deffered.promise;
    };

    function cloneObject(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    var temp = obj.constructor(); // give temp the original obj's constructor
    for (var key in obj) {
        temp[key] = cloneObject(obj[key]);
    }

    return temp;
}

    function modifyNumbers(num) {
        var increasePercentage = 3 + Math.random()*12;
        increasePercentage=0;
        num*=(1+increasePercentage/100);
        return Math.round(num);
    }

    this.cummulative = function(domain,app,endGap,range,noVar,type,timeZone) {
        var deffered = $q.defer();

            if (app == '3974ba7380') {
        try {
           var jsondata = cloneObject(eval(domain + '_cummulative'));

            if(typeof jsondata.x == 'number')
            {
                jsondata.x=jsondata.x*range;
                jsondata.x=modifyNumbers((jsondata.x/(32+(endGap+domain.length+(domain.charCodeAt(0)))%17)).toFixed(0));
            }
            else if(typeof jsondata.x == 'string')
            {
                jsondata.x=modifyNumbers(jsondata.x.split('__')[0]*range/32)+'__'+modifyNumbers(jsondata.x.split('__')[1]);
            }
            else if(jsondata[0].x5 != null)    // for revenue city stats
            {
             for (var i = 0; i < jsondata.length; i++)
             {
                jsondata[i].x2=jsondata[i].x2*range;
                jsondata[i].x2=modifyNumbers((jsondata[i].x2/(32+(i*11+endGap+domain.length+(domain.charCodeAt(0)/5))%17)).toFixed(0));
                 jsondata[i].x3=jsondata[i].x3*range;
                jsondata[i].x3=modifyNumbers((jsondata[i].x3/(32+(i*11+endGap+domain.length+(domain.charCodeAt(0)/5))%17)).toFixed(0));
                 jsondata[i].x4=jsondata[i].x4*range;
                jsondata[i].x4=modifyNumbers((jsondata[i].x4/(32+(i*11+endGap+domain.length+(domain.charCodeAt(0)/5))%17)).toFixed(0));
                 jsondata[i].x5=jsondata[i].x5*range;
                jsondata[i].x5=modifyNumbers((jsondata[i].x5/(32+(i*11+endGap+domain.length+(domain.charCodeAt(0)/5))%17)).toFixed(0));
             }
            }
            else if(typeof jsondata[0].z == 'number')
            {
             for (var i = 0; i < jsondata.length; i++)
             {
                jsondata[i].z=jsondata[i].z*range;
                jsondata[i].z=modifyNumbers((jsondata[i].z/(32+(i*11+endGap+domain.length+(domain.charCodeAt(0)/5))%17)).toFixed(0));
             }
            }
            else if(typeof jsondata[0].y == 'number')
            {
             for (var i = 0; i < jsondata.length; i++)
             {
                jsondata[i].y=jsondata[i].y*range;
                jsondata[i].y=modifyNumbers((jsondata[i].y/(32+(i*11+endGap+domain.length+(domain.charCodeAt(0)/5))%17)).toFixed(0));
             }
            }
            else if(typeof jsondata[0].z == 'string')
            {
             for (var i = 0; i < jsondata.length; i++)
             {
                 jsondata[i].z=modifyNumbers(jsondata[i].z.split('__')[0]*range/32)+'__'+modifyNumbers(jsondata[i].z.split('__')[1]);
             }
            }
            else if(typeof jsondata[0].y == 'string')
            {
             for (var i = 0; i < jsondata.length; i++)
             {
                 jsondata[i].y=modifyNumbers(jsondata[i].y.split('__')[0]*range/32)+'__'+modifyNumbers(jsondata[i].y.split('__')[1]);
             }
            }

    //        console.log('var '+domain+'_cummulative = '+JSON.stringify(jsondata)+';');
           deffered.resolve(jsondata);
           return deffered.promise;

       } catch (err) {
           console.log(err.message);
       }
   }

        $http(
        {
            url: URL+'cummulative',
            method: 'GET',
            params:
            {
                domain: domain,
                app: app,
                endGap: endGap,
                noDays: range,
                noVar: noVar,
                type: type,
                timeZone: timeZone
            }
        }).success(function(data) {
            deffered.resolve(data);
        }).error(function(data) {
            deffered.resolve();
        });
        return deffered.promise;
    };

    this.cummulativeTest = function(domain,app,endGap,range,noVar,type,timeZone){
      var deffered = $q.defer();
      $http(
      {
          url: 'http://78.46.40.232:8082/'+'cummulative',
          method: 'GET',
          params:
          {
              domain: domain,
              app: app,
              endGap: endGap,
              noDays: range,
              noVar: noVar,
              type: type,
              timeZone: timeZone
          }
      }).success(function(data) {
          deffered.resolve(data);
      }).error(function(data) {
          deffered.resolve();
      });
      return deffered.promise;
    }
    this.overview = function(domain,app,callback) {
        $http(
        {
            url: URL+'overview',
            method: 'GET',
            params:
            {
                domain: domain,
                app: app
            }
        }
        ).success(function(data) {
            callback(data);
        }).error(function(data) {
            deffered.resolve();
        });
    };



    this.keygranwise = function(domain,app,key,endGap,range,gran,noVar,type,timeZone) {
        var deffered = $q.defer();
                  if (app == '3974ba7380') {

        try {

            key =  key.replace(/-/g, "");
            key =  key.replace(/ /g, "");
            key =  key.replace(/\./g, "");
           var jsondata = cloneObject(eval(domain + '_keygranwise_'+key));
            var length =jsondata.length;
           var dataunit, array = [];
           var curr_date = new Date();
           curr_date = new Date(Number(curr_date) - 86400000 * endGap);
            var date = curr_date.getDate();
           for (var i = date; i < range+date; i++) {
               dataunit = {x: "",y: ""};
               dataunit.x = curr_date.toUTCString().split(" ")[2]+' '+curr_date.getUTCDate();
               dataunit.y = jsondata[i % length].y;
               if(jsondata[0].y.indexOf('__')>=0)
                   {
                       dataunit.y=modifyNumbers(jsondata[i % length].y.split('__')[0]*range/32)+'__'+modifyNumbers(jsondata[i % length].y.split('__')[1]);
                   }
               else   // its a number in string format
                   {
                      dataunit.y = String(modifyNumbers(jsondata[i % length].y));
                   }
               array.push(dataunit);
               curr_date = new Date(Number(curr_date) - 86400000);
           }
   //         console.log('var '+domain+'_keygranwise_'+key+' = '+JSON.stringify(array)+';');
           deffered.resolve(array);
           return deffered.promise;

       } catch (err) {
           console.log(err.message);
       }
   }
        $http(
        {
            url: URL+'keygranwise',
            method: 'GET',
            params:
            {
                domain: domain,
                app: app,
                key: key,
                endGap: endGap,
                noDays: range,
                gran: gran,
                noVar: noVar,
                type: type,
                timeZone: timeZone
            }
        }
        ).success(function(data) {
            deffered.resolve(data);
        }).error(function(data) {
            deffered.resolve();
        });
        return deffered.promise;
    };

    this.keycummulative = function(domain,app,key,endGap,range,noVar,type,timeZone) {
        var deffered = $q.defer();
                  if (app == '3974ba7380') {
        try {
             key =  key.replace(/-/g, "");
            key =  key.replace(/ /g, "");
            key =  key.replace(/\./g, "");
           var jsondata = cloneObject(eval(domain + '_keycummulative_'+key));
           if(typeof jsondata.x == 'number')   // for TotalRevenue
            {
                jsondata.x=jsondata.x*range;
                jsondata.x=modifyNumbers((jsondata.x/32).toFixed(0));
            }
           else if(typeof jsondata[0].y == 'number')
            {
             for (var i = 0; i < jsondata.length; i++)
             {
                jsondata[i].y=jsondata[i].y*range;
                jsondata[i].y=modifyNumbers((jsondata[i].y/32).toFixed(0));
             }
            }
     //       console.log('var '+domain+'_keycummulative_'+key+' = '+JSON.stringify(jsondata)+';');
           deffered.resolve(jsondata);
           return deffered.promise;

       } catch (err) {
           console.log(err.message);
       }
   }
        $http(
        {
            url: URL+'keycummulative',
            method: 'GET',
            params:
            {
                domain: domain,
                app: app,
                key: key,
                endGap: endGap,
                noDays: range,
                noVar: noVar,
                type: type,
                timeZone: timeZone
            }
        }
        ).success(function(data) {
            deffered.resolve(data);
        }).error(function(data) {
            deffered.resolve();
        });
        return deffered.promise;
    };

    this.keycummulativestring = function(domain,app,key,endGap,range,noVar,type,timeZone) {
        var deffered = $q.defer();
           if (app == '3974ba7380') {
        try {
             key =  key.replace(/-/g, "");
            key =  key.replace(/ /g, "");
            key =  key.replace(/\./g, "");
           var jsondata = cloneObject(eval(domain + '_keycummulativestring_'+key));
         //   console.log('var '+domain+'_keycummulativestring_'+key+' = '+JSON.stringify(jsondata)+';');
           deffered.resolve(jsondata);
           return deffered.promise;

       } catch (err) {
           console.log(err.message);
       }
   }
        $http(
        {
            url: URL+'keycummulativestring',
            method: 'GET',
            params:
            {
                domain: domain,
                app: app,
                key: key,
                endGap: endGap,
                noDays: range,
                noVar: noVar,
                type: type,
                timeZone: timeZone
            }
        }
        ).success(function(data) {
            deffered.resolve(data);
        }).error(function(data) {
            deffered.resolve();
        });
        return deffered.promise;
    };

    this.pushlaunch = function(campaigndata) {
        var deffered = $q.defer();
        if ($rootScope.app.app_secret == '3974ba7380') {
            deffered.resolve();
            return deffered.promise;
        }
        var dt=JSON.stringify(
            {
                app_secret: $rootScope.app.app_secret,
                OS: $rootScope.app.ostype,
                message: campaigndata.message,    // 200
                segment: campaigndata.segment,
                url: campaigndata.url,            // 500
                ref: campaigndata.campaignkey,
                src: campaigndata.campaignname,         // 50
                ciu:campaigndata.image || campaigndata.ImageUrl || undefined,  //500
                rq_param:campaigndata.keyValuepairs,  //100 8
                schedule:campaigndata.timestamp,
                title: campaigndata.title,  // 50
                //ImageUrl: campaigndata.ImageUrl,
                rq_in_msg: campaigndata.rq_in_msg,   //200
                rq_in_title: campaigndata.rq_in_title, //50
                rq_in_img: campaigndata.rq_in_img,   //500
                rq_btn_text: campaigndata.rq_btn_text,  //20
                rq_btn_action: campaigndata.rq_btn_action,
                rq_in_url: campaigndata.iamurl || undefined,
                rq_msgtype: campaigndata.rq_msgtype,
                rq_ed: campaigndata.rq_expire,
                rq_in_pg: campaigndata.rq_in_pg || undefined,
                rq_in_td: campaigndata.rq_in_td,
                segmentId: campaigndata.segmentId,
                rq_id: campaigndata.rq_id,
                prod_img: campaigndata.prod_img || undefined,
                notif_action_radio: campaigndata.landing,
                button_action_radio: campaigndata.button_action_radio
            });

        $http(
        {
            //url: 'http://static.130.122.76.144.clients.your-server.de:5074/push',
            url: 'http://pushapi.rocq.io/push',
            method: 'POST',
            headers: { 'Content-Type': 'text/plain; charset=utf-8'},
            data: dt
        }
        ).success(function(response) {
          console.log(response)
            deffered.resolve(response);
        }).error(function(response) {
           console.log(response)
            deffered.resolve(response);
        });
        return deffered.promise;
    };

    // this.deletepush = function(campaignkey) {
    //     var deffered = $q.defer();
    //     console.log("efe")
    //      console.log(campaignkey)
    //     $http(
    //     {
    //         url: 'http://static.157.42.251.148.clients.your-server.de:5081/push',
    //         method: 'POST',
    //         params:
    //         {
    //             app_secret: $rootScope.app.app_secret,
    //             ref: campaignkey
    //         }
    //     }
    //     ).success(function(data) {
    //        console.log("e");
    //       console.log(data);
    //         deffered.resolve(data);
    //     }).error(function(data) {
    //       console.log("e3");
    //       console.log(data);
    //         deffered.resolve();
    //     });
    //     return deffered.promise;
    // };

    // used in send push table and resend button
    //cs param is used in resend button
    this.campaignstats = function(gap,nodays,app,src,cs) {
        var deffered = $q.defer();
          if ($rootScope.app.app_secret == '3974ba7380') {
            var data=campaignstats_data;
            deffered.resolve(data);
            return deffered.promise;
          }
          // if cs is there make sure not to send app_secret
            if (cs) {
              gap=nodays=app=src=undefined;
            };
        $http(
        {
            //url: 'http://static.130.122.76.144.clients.your-server.de:5074/campaignInfo',
            url: 'http://pushapi.rocq.io/campaignInfo',
            method: 'GET',
            params:
            {
                app_secret: app,
                endGap:   gap,
                noDays: nodays,
                rows:   1000,
                index: 0,
                src: src,
                cs: cs
            }
        }
        ).success(function(data) {
            deffered.resolve(data);
        }).error(function(data) {
            deffered.resolve();
        });
        return deffered.promise;
    };

    this.getPushImages = function(app,index,row) {
        var deffered = $q.defer();
        $http(
        {
            url: 'http://img.rocq.io/image',
            method: 'GET',
            params:
            {
              app_secret  : $rootScope.app.app_secret,
              index       : index,
              rows        : row,
              type        : 'downloadMultiple'
            }
        }
        ).success(function(data) {
            deffered.resolve(data);
        }).error(function(data) {
            deffered.resolve();
        });
        return deffered.promise;
    };

    this.get = function(domain,campaignid) {
        var deffered = $q.defer();
         if ($rootScope.app.app_secret == '3974ba7380') {
            var data;
            if (campaignid=='1') {
              data= [{x:"Push Open",y:108633},{x:"com.net.pvr.ui.NowShowingNewActivity",y:66211},{x:"com.net.pvr.ui.MovieDetailsActivity",y:18105},{x:"com.net.pvr.ui.SelectSeatActivity",y:9052},{x:"com.net.pvr.ui.AddFNBActivity",y:5042},{x:"com.net.pvr.ui.PayNowActivity",y:2235}];
            }
            else if (campaignid=='2') {
              data=[{x:"Push Open",y:119874},{x:"com.net.pvr.ui.NowShowingNewActivity",y:89937},{x:"com.net.pvr.ui.MovieDetailsActivity",y:54984},{x:"com.net.pvr.ui.SelectSeatActivity",y:10492},{x:"com.net.pvr.ui.AddFNBActivity",y:5932},{x:"com.net.pvr.ui.PayNowActivity",y:2200}];
            }
            else if (campaignid=='3') {
              data= [{x:"Push Open",y:223764},{x:"com.net.pvr.ui.NowShowingNewActivity",y:195941},{x:"com.net.pvr.ui.MovieDetailsActivity",y:117970},{x:"com.net.pvr.ui.SelectSeatActivity",y:19992},{x:"com.net.pvr.ui.AddFNBActivity",y:6235},{x:"com.net.pvr.ui.PayNowActivity",y:2223}];
            }
            else if (campaignid=='4') {
              data= [{x:"Push Open",y:123545},{x:"com.net.pvr.ui.NowShowingNewActivity",y:99937},{x:"com.net.pvr.ui.MovieDetailsActivity",y:194984},{x:"com.net.pvr.ui.SelectSeatActivity",y:71492},{x:"com.net.pvr.ui.AddFNBActivity",y:5532},{x:"com.net.pvr.ui.PayNowActivity",y:12200}];
            }
            else if (campaignid=='5') {
              data= [{x:"Push Open",y:218545},{x:"com.net.pvr.ui.NowShowingNewActivity",y:200000},{x:"com.net.pvr.ui.MovieDetailsActivity",y:666666},{x:"com.net.pvr.ui.SelectSeatActivity",y:333333},{x:"com.net.pvr.ui.AddFNBActivity",y:70025},{x:"com.net.pvr.ui.PayNowActivity",y:20200}];
            }
            data={x:JSON.stringify(data)}
            deffered.resolve(data);
            return deffered.promise;
          }
        $http(
        {
            url: URL+'get',
            method: 'GET',
            params:{
              domain    : domain,
              app       :  $rootScope.app.app_secret,
              index       :  campaignid,
            }
        }
        ).success(function(data) {
            deffered.resolve(data);
        }).error(function(data) {
            deffered.resolve();
        });
        return deffered.promise;
    };
}]);
