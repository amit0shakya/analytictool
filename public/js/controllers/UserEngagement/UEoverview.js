var userEngagement = angular.module('Controllers')
userEngagement.controller('UEoverviewCtrl',['$scope','JettyService','UtilitiesService','JSONService',function($scope, JettyService, UtilitiesService, JSONService) {
    JettyService.timewise('UEOTotalEvents',"2665c38c69",30,1,4,2,function(data) {
        $scope.totalEvents = UtilitiesService.numberFormat(data[0].y)
    })
    JettyService.timewise('UEOEventsTop5',"2665c38c69",30,1,4,3,function(data) {
        mod_data = JSONService.parse(data)
        mod_data = UtilitiesService.descending(mod_data[0].a)
        UtilitiesService.draw_chart(bargraph(mod_data.slice(0,3)),"column2d.swf","top3Events","100%","200")
    })
    JettyService.timewise('UEOScreensTop5',"2665c38c69",30,1,4,3,function(data) {
        mod_data = JSONService.parse(data)
        mod_data = UtilitiesService.descending(mod_data[0].a)
        UtilitiesService.draw_chart(piechart(mod_data),"doughnut2d.swf","top5Screens","100%","200")
    })
    JettyService.timewise('UEOEventsTop5',"2665c38c69",30,1,4,3,function(data) {
        mod_data = JSONService.parse(data)
        mod_data = UtilitiesService.descending(mod_data[0].a)
        $scope.topEventName = mod_data[mod_data.length-1].x
        $scope.topEventCount = UtilitiesService.numberFormat(mod_data[mod_data.length-1].y)
    })
    JettyService.timewise('UEOEventsPattern',"2665c38c69",50,30,2,3,function(data) {
        mod_data = JSONService.parse(data)
        UtilitiesService.draw_chart(multiLine(mod_data,5),"MSLine.swf","eventTrend","100%","353")
    })
    JettyService.timewise('UEOEventsTop5',"2665c38c69",30,7,2,3,function(data1) {
        JettyService.timewise('UEOEventsTop5',"2665c38c69",30,1,4,3,function(data2) {
            mod_data = JSONService.parse(data2)
            mod_data = UtilitiesService.descending(mod_data[0].a)
            $scope.topEventName = mod_data[mod_data.length-1].x
            mod_data = []
            new_data = JSONService.parse(data1)
            for(i=0; i<new_data.length; i++) {
                for(j=0; j<5; j++) {
                    if(new_data[i].a[j].x == $scope.topEventName) {
                        mod_data = mod_data.concat({ "x":new_data[i].z, "y":new_data[i].a[j].y })
                    }
                }
            }
            UtilitiesService.draw_chart(line(mod_data),"Line.swf","topEventTrend","100%","200")
        })
    })
    JettyService.timewise('UEOScreensTop5',"2665c38c69",25,1,4,3,function(data) {
        var mod_data = JSONService.parse(data)
        $scope.topScreens = mod_data[0].a
    })
}])