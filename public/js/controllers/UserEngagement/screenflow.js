/**
 * Updated by Abhishek Kumar Gupta
 *
*/
var LenInFilter,LenOutFilter,BasedOnFilter;
var screenflw = angular.module('Controllers')
screenflw.controller('ScrnFlwController',['$scope','$rootScope','$q','JettyService','UtilitiesService','JSONService',function($scope,  $rootScope, $q, JettyService, UtilitiesService, JSONService) {
    /* global variables which we use inside functions */
    var today =  new Date();
    var currentdate = new Date(today.getUTCFullYear(),today.getUTCMonth(),today.getUTCDate());
    var app = $rootScope.app.app_secret;
    var timeZone = "IST";

    var WatchDate = function(){
        $scope.$watch('daterange.date',function(nv,ov)
         {
            $rootScope.daterange.date.startDate = new Date(nv.startDate.getFullYear(),nv.startDate.getMonth(),nv.startDate.getDate());
            $rootScope.daterange.date.endDate = new Date(nv.endDate.getFullYear(),nv.endDate.getMonth(),nv.endDate.getDate());
            $rootScope.daterange.endGap = Math.floor((currentdate.getTime() - $rootScope.daterange.date.endDate.getTime())/(1000*60*60*24));
            $rootScope.daterange.noDays = Math.floor(($rootScope.daterange.date.endDate.getTime() - $rootScope.daterange.date.startDate.getTime())/(1000*60*60*24) + 1);
            $scope.endGap = $rootScope.daterange.endGap;
            $scope.noDays = $rootScope.daterange.noDays;
            run();
        })
    };

        var getscreendata = function() {
            var deferred = $q.defer();
            JettyService.cummulative('ScreenflowCounts',app,$scope.endGap,$scope.noDays,2,"screenjson",timeZone).then(function(data){
                try
                {
                    if (data==undefined || data=='null') {data=[]};
                      // console.log(data);
                      screendata=data;
                      // var screendata = JSON.parse(data)
                      deferred.resolve();
                }catch(err)
                {
                    deferred.resolve();
                }
            });
            return deferred.promise;
        };


        var getScreenFlowData = function(){
          var deffered = $q.defer();
          JettyService.cummulativeTest('AllInScreenCounts',app,$scope.endGap,$scope.noDays,2,"screenjson",timeZone).then(function(data){
            console.log('working cummulativeTest');
            try{
              var activitys = [];
              if(data == undefined || data=='null'){data = [];}
              for(var i=0;i<data.length;i++){
                activitys.push(data[i].x1);
              }
              for(var i=0;i<data.length;i++){
                activitys.push(data[i].x2);
              }

              // unique activities
              $scope.unique_activities = activitys.unique();
              var activities_data = [];
              for(var i=0;i<$scope.unique_activities.length;i++){
                 var t = $scope.unique_activities[i];
                 activities_data.push({
                    id:get_activity_id(t),
                    label:get_label_activity(t),
                    in_activity:in_data(t,data,'data'),
                    out_activity:out_data(t,data,'data'),
                    in_count:in_data(t,data,'count'),
                    out_count:out_data(t,data,'count'),
                    total_count:in_data(t,data,'count') + out_data(t,data,'count'),
                    namespace:get_namespace(t)
                  });
              }
              activities_data.sort(function(a,b){
                if(a.total_count > b.total_count){
                  return -1;
                }
                if(a.total_count < b.total_count){
                  return 1;
                }
                return 0;
              });

              // set colors
              var k = 0;
              for(var i=0;i<activities_data.length;i++){
                activities_data[i]["color"] = colors[i].color;
              }
              $scope.activities_data = activities_data;
              console.log($scope.activities_data);
              create_circles($scope.activities_data);
              deffered.resolve();
            }catch(err){
              deffered.resolve();
            }
            return deffered.promise;
          });
        }

        $scope.screenflow_activity = function(key){
          console.log('[+] In ScreenFlow activity[+]');
          create_circles(key);
          console.log('created your circle');
        }

        $scope.screenflow_count = function(key){
          console.log('[+] In ScreenFlow activity[+]');

        }
        var getscreenflow = function() {
            var deferred = $q.defer();
            JettyService.cummulative('ScreenflowFlows',app,$scope.endGap,$scope.noDays,2,"screenjson",timeZone).then(function(data){
                try
                {
                    if (data==undefined || data=='null') {data=[]};
                    // console.log(data)
                    screenflow=data;
                    // var screenflow = JSON.parse(data)
                    drawouter();
                    deferred.resolve();
                }
                catch(err)
                {
                    deferred.resolve();
                }
            });
            return deferred.promise;
        };


        var run= function()
        {
          getscreenflow();
          getscreendata();
          getScreenFlowData();
        }
        WatchDate();

}]);
