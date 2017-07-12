var dashboard = angular.module('Controllers',['daterangepicker']);
dashboard.controller('DoverviewCtrl',['$scope','JettyService','UtilitiesService','JSONService',function($scope, JettyService, UtilitiesService, JSONService) {
    JettyService.timewise('AU',"2665c38c69",30,1,2,2,function(data) {
        $scope.active_users = data[0].y
    })
    JettyService.timewise('NU',"2665c38c69",30,1,2,2,function(data) {
        $scope.new_users = data[0].y
    })
    JettyService.overall('ODownloads',"2665c38c69",function(data) {
        $scope.downloads = data.x
    })
    JettyService.timewise('NU',"2665c38c69",30,15,2,2,function(data) {
        mod_data = JSONService.cummulative(data)
        UtilitiesService.draw_chart(line(mod_data),"Line.swf","newUsersTrend","100%","353")
    })
    JettyService.timewise('AUDeviceModel',"2665c38c69",30,1,2,3,function(data) {
        mod_data = JSONService.parse(data)
        UtilitiesService.draw_chart(line(mod_data[0].a),"Line.swf","topDevices","100%","353")
    })
    JettyService.timewise('IPaid',"91c556949f",50,13,2,2,function(data1) {
        endGap = 50;
        noDays = 13;
        gran = 2;
        noVar = 2;
        JettyService.timewise('IOrganic',"91c556949f",endGap,noDays,gran,noVar,function(data2) {
            mod_data = JSONService.merge(data1,data2,'paid','organic',endGap,noDays)
            UtilitiesService.draw_chart(multiLine(mod_data,2),"MSLine.swf","downloadTriggers","100%","353")
        })
    })
}])