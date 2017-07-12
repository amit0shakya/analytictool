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
          //console.log(activity)
            var deferred = $q.defer();
            JettyService.cummulative('ScreenflowCounts',app,$scope.endGap,$scope.noDays,2,"screenjson",timeZone).then(function(data){
                try
                {
                    if (data==undefined || data=='null') {data=[]};
                    
                    console.log(data);
                    screendata=data;
                    // var screendata = JSON.parse(data)
                    deferred.resolve();
                }
                catch(err)
                {
                    deferred.resolve();
                }    
            });
            return deferred.promise;
        };

        var getscreenflow = function() {
            var deferred = $q.defer();
            JettyService.cummulative('ScreenflowFlows',app,$scope.endGap,$scope.noDays,2,"screenjson",timeZone).then(function(data){
                try
                {
                    if (data==undefined || data=='null') {data=[]};
                    console.log(data)
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

        $scope.numberFilterOptions=[{x:"Top 5 Entry and Exit Screens",y:{in:5,out:5}},{x:"Top 5 Entry Screens",y:{in:5,out:0}},{x:"Top 5 Exit Screens",y:{in:0,out:5}},{x:"All screens",y:{in:5000,out:5000}}]
        $scope.numberFilter=$scope.numberFilterOptions[0];
        $scope.$watch('numberFilter',function(nv,ov) {
            LenInFilter=nv.y.in;
            LenOutFilter=nv.y.out;
            $('#canvas1').remove();
            $("#canvas-container").prepend('<canvas id="canvas1"></canvas>');
            var canvas = document.getElementById("canvas1");
            var context = canvas.getContext('2d');
            context.clearRect(0, 0, canvas.width, canvas.height);
            new Processing(canvas, sketchProc);
        })

        $scope.BasedOnFilterOptions=[{x:"Based on Users",y:0},{x:"Based on conversions",y:1},{x:"Based on dropouts",y:2}]
        $scope.BasedOnFilter=$scope.BasedOnFilterOptions[0];
        $scope.$watch('BasedOnFilter',function(nv,ov) {
            BasedOnFilter=nv.y;
            // console.log(BasedOnFilter)
            $('#canvas1').remove();
            $("#canvas-container").prepend('<canvas id="canvas1"></canvas>');
            var canvas = document.getElementById("canvas1");
            var context = canvas.getContext('2d');
            context.clearRect(0, 0, canvas.width, canvas.height);
            new Processing(canvas, sketchProc);
        })

       
   



var run= function()
{
  getscreenflow();
  getscreendata();
}
 

    WatchDate();
}]);