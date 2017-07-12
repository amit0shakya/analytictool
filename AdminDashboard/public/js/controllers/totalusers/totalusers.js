var totalusers = angular.module('Controllers',[]);
totalusers.controller('TotalusersController', ['$scope', '$rootScope', '$modal', '$http', '$location','JettyService','localStorageService','$q', function($scope, $rootScope, $modal, $http, $location,JettyService,localStorageService,$q)
    {
  

  var URL="http://api.rocq.io/";
    var TotalUsersAppwise = function(){
             JettyService.getusers('TotalUsersAdmin','all').then(function(data) {

                    TotalUsersAppwise = data;

                for (var i = 0; i <TotalUsersAppwise.length; i++) {
                       if (TotalUsersAppwise[i].x==null)
                       {

                        TotalUsersAppwise.splice(i,1)
                        i--;
                       }
                    };
                   
                 //  TotalUsersAppwise= JSON.parse(TotalUsersAppwise);
                   $scope.new_users_Appwise = TotalUsersAppwise;
                   console.log($scope.new_users_Appwise)
                    var totalusers=0, WindowUsers=0, IosUsers=0, AndroidUsers=0;
                    for (var i = 0; i <TotalUsersAppwise.length; i++) {
                        totalusers+=Number(TotalUsersAppwise[i].y);
                    };
                    for (var i = 0; i <TotalUsersAppwise.length; i++) {
                        if (TotalUsersAppwise[i].z=="Android") {
                            AndroidUsers+=Number(TotalUsersAppwise[i].y);
                        };
                    };
                    for (var i = 0; i <TotalUsersAppwise.length; i++) {
                        if (TotalUsersAppwise[i].z=="iOS") {
                            IosUsers+=Number(TotalUsersAppwise[i].y);
                        };
                    };
                    for (var i = 0; i <TotalUsersAppwise.length; i++) {
                        if (TotalUsersAppwise[i].z=="Windows") {
                            WindowUsers+=Number(TotalUsersAppwise[i].y);
                        };
                    };
                   
                    $scope.new_users = numberFormat(totalusers);
                    $scope.Android_Users = numberFormat(AndroidUsers);
                    $scope.Ios_Users = numberFormat(IosUsers);
                    $scope.Window_Users = numberFormat(WindowUsers);

                     TotalUsersAppwise.sort(function(a,b){return b.y-a.y});
                    for (var i = 0; i <TotalUsersAppwise.length; i++) {
                        TotalUsersAppwise[i].y= numberFormat(TotalUsersAppwise[i].y);
                    };
        });

    };

    var TotalSessions = function(){
             JettyService.overview('TotalSessionsAdmin','all__0').then(function(data) {
                    $scope.totalSessions = numberFormat(data.x);
        });

    };

     var TotalEvents = function(){
             JettyService.overview('TotalEventsAdmin','all__0').then(function(data) {
                    $scope.totalEvents = numberFormat(data.x);
        });

    };

     var Pushdata = function(){
             $http(
        {
            url: 'http://pushapi.rocq.io/services?otherServices=adminData',
            method: 'GET'
        }
        ).success(function(data) {
            $scope.PushNotifications=numberFormat(data.DisplayPushCount);
            $scope.PingSent=numberFormat(data.TotalPingSent);
            // deffered.resolve(data);
        }).error(function(data) {
            // deffered.resolve();
        });

    };

    CommaSeparatedNumberFormat = function(labelValue) {
        // uncomment this line line to get comma separation after 3 digits.
    //  return labelValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        x=labelValue.toString();
        var lastThree = x.substring(x.length-3);
        var otherNumbers = x.substring(0,x.length-3);
        if(otherNumbers != '')
        lastThree = ',' + lastThree;
        return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    };

    numberFormat = function(labelValue) {
        var val = Math.abs(Number(labelValue)) >= 1.0e+9 ? Math.abs(Number(labelValue)) / 1.0e+9 + " B"
           : Math.abs(Number(labelValue)) >= 1.0e+6 ? Math.abs(Number(labelValue)) / 1.0e+6 + " M"
           : Math.abs(Number(labelValue)) >= 1.0e+3 ? Math.abs(Number(labelValue)) / 1.0e+3 + " K"
           : Math.abs(Number(labelValue));
        if(labelValue<1000) {
            return Math.round(val);
        }
        else {
            return parseFloat(val).toPrecision(3) + val.replace(/[^ B| M| K]/g,"");
        }
    };


var getapps = function(){
            // var deferred = $q.defer();
            $http.post('/getapps', {'username' :'hello@rocq.io'}).success(function(response) {
                // console.log(response)
                if(response == "null")
                {
                    $scope.total_apps = 0;
                }
                else
                {
                    $scope.apps = response;
                    $scope.total_apps = $scope.apps.length;
console.log($scope.apps)
                    //Getting Current Installs for each app
                    // for (var i = 0; i < $scope.apps.length; i++) {
                    //  var app=$scope.apps[i].app_secret;
                    //  if (app=='3974ba7380') 
                    //  {$scope.apps[i].CurrentUsers=UtilitiesService.numberFormat(84868);
                    //   continue;};

                    //  $http({url: URL+'overview',method: 'GET',
                    //          params:{ domain: 'CurrentInstalls',app: $scope.apps[i].app_secret, i : i }
                    //         }).success(function(data, status, headers, config) {
                    //           if (data=="null") {data={x:0}};
                    //          $scope.apps[config.params.i].CurrentUsers=UtilitiesService.numberFormat(data.x) || "-";
                    //         });
                    // };

                    //Getting MAU for each app
                  //  if ($rootScope.user.username=='hello@rocq.io') {
                            $scope.apps.forEach(function(item){
                                cummulative('AU',item.app_secret,1,30,2,"hll",'IST').then(function(data) {
                                if (data=="null") {data={x:0}};
                                item.CurrentUsers=numberFormat(data.x || 0) || "-";
                            });
                            })



                            $scope.apps.forEach(function(item){
                                if ($scope.endGap==1) {$scope.endGap=-1000;$scope.noDays+=1001};
                                      if ($scope.endGap==0) {$scope.endGap=-1000;$scope.noDays+=1000};
                                    campaignstats(-1000,1030,item.app_secret).then(function(data) {
                                        if (data=="null") {data=[]};
                                        item.pn=data.length;
                                        })
                            })
                //    };


                    // Getting Total Downloads for each app
                    
                    $http({url: URL+'getusers',method: 'GET', params: 
                                { domain: 'TotalUsersAdmin',app: "all",index: 0}
                            }).success(function(data) {
                                data.push({"x":"Demo","y":"136735","z":"Android"})
                                for (var i = 0; i < $scope.apps.length; i++) {
                                    for (var j = 0; j < data.length; j++) {
                                        if (data[j].x==$scope.apps[i].application)
                                         {
                                            $scope.apps[i].TotalDownload=numberFormat(data[j].y || 0);
                                            break;
                                         }
                                         else
                                         {
                                            $scope.apps[i].TotalDownload="-";
                                         }
                                    }
                                };
                            });
                                                   

                             $scope.apps.forEach(function(item){
                            $http({url: 'http://pushapi.rocq.io/push-report',method: 'GET', params: 
                                  { app_secret: item.app_secret,endGap: 0,noDays: 30}
                                    }).success(function(data) {
                                        item.totalnotif=numberFormat(data[0].total)
                                          item.imageservernotif=numberFormat(data[0].imageServer)
                                         item.totalimagenotif=numberFormat(data[0].TotalImage)
                                          item.normalnotif=numberFormat(data[0].normal)
                                          item.imgURLnotif=numberFormat(data[0].imgURL)
                                          item.inAppCampaignnotif=numberFormat(data[0].inAppCampaign)
                                           item.inAppnotif=numberFormat(data[0].inApp)
                                               
                                    });
                     })
                    console.log($scope.apps)

                }
              //  deferred.resolve();
            }).error(function(response) {
                $scope.error = response.message;
              //  deferred.resolve();
            });
         //   return deferred.promise;
        }


          var cummulative = function(domain,app,endGap,range,noVar,type,timeZone) {
        var deffered = $q.defer();
          
           

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

    var campaignstats = function(gap,nodays,app) {
        var deffered = $q.defer();
         
            
        $http(
        {
            //url: 'http://static.130.122.76.144.clients.your-server.de:5081/campaignInfo',
            url: 'http://pushapi.rocq.io/campaignInfo',
            method: 'GET',
            params:
            {
                app_secret: app || $rootScope.app.app_secret,
                endGap:   gap,
                noDays: nodays,
                rows:   1000,
                index: 0
            }
        }
        ).success(function(data) {
            deffered.resolve(data);
        }).error(function(data) {
            deffered.resolve();
        });
        return deffered.promise;
    };
$scope.initializepopover=function(){
      $('[data-toggle=\'popover\']').popover({html:true,container:'body'});
    }

    // Toggle for Details and Hide Text
    $(".toggletextdelegate").undelegate();
    $(".toggletextdelegate").delegate(".toggletext","click",function(){
        if(!$(this).closest('.toggletextdelegate2').find('.toggletextref').hasClass('collapsing'))
        {
            if ($(this).closest('.toggletextdelegate2').find('.toggletextref').hasClass('in')) {
                $(this).html('Details')
            }
            else{
                $(this).html('Hide')
            }
        }
    })

 TotalUsersAppwise();
 TotalSessions();
 TotalEvents();
 Pushdata();
 getapps();

 }]);  
