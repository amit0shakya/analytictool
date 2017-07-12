var cohort = angular.module('Controllers')
cohort.controller('CohortCtrl',['$scope','JettyService','UtilitiesService','JSONService',function($scope, JettyService, UtilitiesService, JSONService) { 
    $scope.date = {startDate: new Date(2014,10,17), endDate: new Date(2014,10,23)};
    var today =  new Date();
    $scope.currentdate = new Date(today.getFullYear(),today.getMonth()+1,today.getDate());
    var endgap = Math.abs($scope.currentdate.getTime() - $scope.date.endDate.getTime())/(1000*60*60*24);
    var range = Math.abs($scope.date.endDate.getTime() - $scope.date.startDate.getTime())/(1000*60*60*24);
    JettyService.timewise('Cohort',"2665c38c69",endgap,range,2,3,function(data) {
        console.log(data);
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
            }
            for(j=1; j<codeWise.length; j++)
                codeWise[j].y = ((codeWise[j].y*100)/codeWise[0].y).toFixed(2);
            data[i].a = codeWise;
        }
        $scope.cohort = data;
        console.log($scope.cohort);
    });
}])