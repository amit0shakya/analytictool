/*  Controller for Cohort Page
 *  Updated by Abhishek Kumar Gupta
 *
*/

'use strict';

console.log('cohort controller');
var cohort = angular.module('Controllers')
cohort.controller('CohortCtrl',['$scope','$rootScope','JettyService','UtilitiesService','JSONService',function($scope, $rootScope, JettyService, UtilitiesService, JSONService) {

    /* global variables which we use inside functions */
    var today =  new Date();
    var currentdate = new Date(today.getUTCFullYear(),today.getUTCMonth(),today.getUTCDate());
    var app = $rootScope.app.app_secret;
    var timeZone = "IST";



    /*  if the user uses the date picker and changes the date, inner function gets called
        Trigger function sets the endGap and noDays based on the new date and loads the page again
    */
    var WatchDate = function(){
        $scope.$watch('daterange.date',function(nv,ov) {
            $rootScope.daterange.date.startDate = new Date(nv.startDate.getFullYear(),nv.startDate.getMonth(),nv.startDate.getDate());
            $rootScope.daterange.date.endDate = new Date(nv.endDate.getFullYear(),nv.endDate.getMonth(),nv.endDate.getDate());
            $rootScope.daterange.endGap = Math.floor((currentdate.getTime() - $rootScope.daterange.date.endDate.getTime())/(1000*60*60*24));
            $rootScope.daterange.noDays = Math.floor(($rootScope.daterange.date.endDate.getTime() - $rootScope.daterange.date.startDate.getTime())/(1000*60*60*24) + 1);
            $scope.endGap = $rootScope.daterange.endGap;
            $scope.noDays = $rootScope.daterange.noDays;
            run();
        })
    };

    /* Initialized the default date range and sets the endGap and noDays */
    var Start = function() {
        $scope.date = {startDate: new Date(Date.UTC(2015,0,1)), endDate: new Date(Date.UTC(2015,0,8))};
        $scope.endGap = Math.abs(currentdate.getTime() - $scope.date.endDate.getTime())/(1000*60*60*24);
        $scope.noDays = Math.abs($scope.date.endDate.getTime() - $scope.date.startDate.getTime())/(1000*60*60*24) + 1;
    };


    var soucres = function(){
      JettyService.getSources('SourceList',app,$scope.endGap,'source',$scope.noDays,3,timeZone,'string').then(function(data){
        console.log('[+] CohortJs: function=> sources[+]');
        $scope.sources_list = data;
        console.log(data);
      });
    }



    $scope.cohort_source = function(key){
      console.log(key);
      JettyService.cohortSourceWise('CohortSourceWise',app,$scope.endGap,2,key,$scope.noDays,3,timeZone,'string').then(function(data){
        $scope.itemsPerPage = 10;
        $scope.currentPage_tab1 = 1;
        $scope.maxSize_tab1 = 5;
        console.log(key);
        for(i=0; i<data.length; i++) {
            var codeWise = [];
            for(j=0; j<=10; j++)
                codeWise = codeWise.concat({"x":j,"y":0})
            data[i].a = JSON.parse(data[i].a);
            var map = {};
            for(j=0; j<data[i].a.length; j++)
                map[data[i].a[j].x]=data[i].a[j].y;
            for(j=0; j<codeWise.length; j++) {
                if(map[codeWise[j].x])
                    codeWise[j].y=map[codeWise[j].x];
                    codeWise[j]["total_user"] = map[codeWise[0].x];
            }
            for(j=1; j<codeWise.length; j++)
                codeWise[j].y = ((codeWise[j].y*100)/codeWise[0].y).toFixed(2);
            data[i].a = codeWise;
        }
        $scope.CohortCSV = jQuery.extend(true,[], data);
        for (var i = 0; i < $scope.CohortCSV.length; i++) {
            for (var j = 0; j < $scope.CohortCSV[i].a.length; j++) {
                $scope.CohortCSV[i].a[j]=$scope.CohortCSV[i].a[j].y;
            };
        };

        $scope.totalItems_tab1 = data.length;
        $scope.$watch('currentPage_tab1 + itemsPerPage', function() {
            var begin = (($scope.currentPage_tab1 - 1) * $scope.itemsPerPage),
            end = begin + $scope.itemsPerPage;
            $scope.filteredcohortlist =  data.slice(begin, end);
            DrawCohortChart($scope.filteredcohortlist)
        });
        //$scope.cohort = data;

      });
    };

    /* Cohort List Table in the Cohort page*/
    var cohort = function(){
        JettyService.granwise('Cohort',app,$scope.endGap,$scope.noDays,2,3,"long",timeZone).then(function(data) {
              // $scope.table1loaded=true;
            console.log('[+] CohortJs: function=> cohort [+]');
            console.log(data);
            $scope.itemsPerPage = 10
            $scope.currentPage_tab1 = 1;
            $scope.maxSize_tab1 = 5;

            if(data != undefined || data.length >0){
              for(i=0; i<data.length; i++) {
                  var codeWise = [];
                  for(j=0; j<=10; j++)
                      codeWise = codeWise.concat({"x":j,"y":0});
                  data[i].a = JSON.parse(data[i].a);
                  var map = {};
                  for(j=0; j<data[i].a.length; j++)
                      map[data[i].a[j].x]=data[i].a[j].y;
                  for(j=0; j<codeWise.length; j++) {
                      if(map[codeWise[j].x])
                          codeWise[j].y=map[codeWise[j].x];
                          codeWise[j]["total_user"] = map[codeWise[0].x];
                  }
                  for(j=1; j<codeWise.length; j++)
                      codeWise[j].y = ((codeWise[j].y*100)/codeWise[0].y).toFixed(2);

                  data[i].a = codeWise;
              }
              $scope.CohortCSV = jQuery.extend(true,[], data);
              for (var i = 0; i < $scope.CohortCSV.length; i++) {
                  for (var j = 0; j < $scope.CohortCSV[i].a.length; j++) {
                      $scope.CohortCSV[i].a[j]=$scope.CohortCSV[i].a[j].y;
                  };
              };
            }


            $scope.totalItems_tab1 = data.length;
            $scope.$watch('currentPage_tab1 + itemsPerPage', function() {
                var begin = (($scope.currentPage_tab1 - 1) * $scope.itemsPerPage),
                end = begin + $scope.itemsPerPage;
                $scope.filteredcohortlist =  data.slice(begin, end);

            });
            //$scope.cohort = data;
        });
    };

    // Start();

    var run = function(){
        soucres();
        cohort();
    };

    WatchDate();

}]);
