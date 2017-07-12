var trends = angular.module('Controllers')
trends.controller('ToverviewCtrl',['$scope','JettyService','UtilitiesService','JSONService',function($scope, JettyService, UtilitiesService, JSONService) {
    JettyService.timewise('S',"2665c38c69",30,1,2,2,function(data) {
        $scope.avg_session_length = (parseFloat((data[0].y).split('__')[1])/60000).toFixed(2)
    })
    JettyService.timewise('NU',"2665c38c69",50,1,2,2,function(data1) {
        $scope.new_users = data1[0].y;
        console.log(data1);
        JettyService.timewise('AU',"2665c38c69",50,1,2,2,function(data2) {
            $scope.active_users = data2[0].y
            $scope.returning_users = UtilitiesService.numberFormat($scope.active_users-$scope.new_users)
            $scope.new_users = UtilitiesService.numberFormat($scope.new_users)
        })
    })
    JettyService.overall('OAUMonthlyAverage',"2665c38c69", function(data) {
        $scope.avg_monthly_users = data.x
    })
    JettyService.timewise('S',"2665c38c69",100,30,2,2,function(data) {
        for (i=0; i<data.length; i++) {
            data[i].y = (parseFloat((data[i].y).split('__')[1])/60000).toFixed(2)
        }
        UtilitiesService.draw_chart(line(data),"Line.swf","avgSessionLengthTrend","100%","353")
    })
    JettyService.timewise('Cohort',"2665c38c69",60,7,2,3,function(data) {
        console.log(data);
        for(i=0; i<data.length; i++) {
            var codeWise = []
            for(j=0; j<=10; j++) 
                codeWise = codeWise.concat({"x":j,"y":0})
            data[i].a = JSON.parse(data[i].a);
            var map = {};
            for(j=0; j<data[i].a.length; j++) 
                map[data[i].a[j].x]=data[i].a[j].y
            for(j=0; j<codeWise.length; j++) {
                if(map[codeWise[j].x])
                    codeWise[j].y=map[codeWise[j].x]
            }
            for(j=1; j<codeWise.length; j++)
                codeWise[j].y = ((codeWise[j].y*100)/codeWise[0].y).toFixed(2)
            data[i].a = codeWise;
        }
        $scope.cohort = data
    })
}])