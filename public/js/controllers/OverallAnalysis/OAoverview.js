var overallAnalysis = angular.module('Controllers');
overallAnalysis.controller('OAoverviewCtrl',['$scope','JettyService','UtilitiesService','JSONService',function($scope, JettyService, UtilitiesService, JSONService) {
    JettyService.timewise('AU',"2665c38c69",30,1,4,2,function(data) {
        $scope.active_users = data[0].y
    })
    JettyService.timewise('OAOTop5Devices',"2665c38c69",30,1,4,3,function(data) {
        mod_data = JSONService.parse(data)
        mod_data = UtilitiesService.ascending(mod_data[0].a)
        $scope.topModel = mod_data[mod_data.length-1].x1
        $scope.topModelManu = mod_data[mod_data.length-1].x2
    })
    JettyService.timewise('OAOTop5Devices',"2665c38c69",30,1,4,3,function(data) {
        mod_data = JSONService.parse(data)
        mod_data = UtilitiesService.ascending(mod_data[0].a)
        $scope.top4Devices = mod_data
        $scope.total = mod_data[4].y + mod_data[3].y + mod_data[2].y + mod_data[1].y
        $scope.width4 = mod_data[4].y / $scope.active_users * 100
        $scope.width3 = mod_data[3].y / $scope.active_users * 100
        $scope.width2 = mod_data[2].y / $scope.active_users * 100
        $scope.width1 = mod_data[1].y / $scope.active_users * 100
    })
    JettyService.timewise('OAONetworkOpTop10',"2665c38c69",30,1,4,3,function(data) {
        mod_data = JSONService.parse(data)
        mod_data = UtilitiesService.ascending(mod_data[0].a)
        $scope.top5Operators = mod_data
        UtilitiesService.draw_chart(piechart_op(mod_data.slice(4,10)),"doughnut2d.swf","top5Operators","100%","250")
    })
    JettyService.timewise('OAONetworkOpTop10',"2665c38c69",30,1,4,3,function(data) {
        mod_data = JSONService.parse(data)
        mod_data = UtilitiesService.ascending(mod_data[0].a)
        if (mod_data[9].x == "") {
            $scope.topOperator = mod_data[8].x
        }
        else {
            $scope.topOperator = mod_data[9].x
        }
    })
    JettyService.timewise('OAONetworkType',"2665c38c69",30,1,4,3,function(data) {
        new_data = JSONService.parse(data)
        new_data = new_data[0].a
        $scope.wifiUsers = new_data[0].y
        $scope.cellularUsers = new_data[1].y
        var val;

        var wifi_data = []
        new_data[0].x = "Wifi"
        new_data[1].x = "Others"
        new_data[0].y = new_data[0].y / (new_data[0].y + new_data[1].y) * 100
        new_data[1].y = 100 - new_data[0].y
        for(i=0;i<2;i++) {
            t = {"x" : new_data[i].x , "y" : new_data[i].y }
            wifi_data = wifi_data.concat(t)
        }

        val = parseInt(new_data[0].y)
        var chart_data = doughnut2d(wifi_data,doughnut_2d_wifi_style,val)
        var myChart = new FusionCharts( "fusionCharts/doughnut2d.swf", 
        "doughnut2d", "100%", "220", "0" )
        myChart.setJSONData(chart_data)
        myChart.render(document.getElementById('wifiDoughnut'))

        var cellular_data = []
        new_data[0].x = "Others"
        new_data[1].x = "Cellular"
        for(i=0;i<2;i++) {
            t = {"x" : new_data[i].x , "y" : new_data[i].y}
            cellular_data = cellular_data.concat(t)
        }

        val = 100-val

        var chart_data = doughnut2d(cellular_data,doughnut_2d_cellular_style,val)
        var myChart = new FusionCharts( "fusionCharts/doughnut2d.swf", 
        "doughnut2d", "100%", "220", "0" )
        myChart.setJSONData(chart_data)
        myChart.render(document.getElementById('cellularDoughnut'))
    })
    JettyService.timewise('OAODeviceManufacturerTop5',"2665c38c69",25,1,4,3,function(data) {
        mod_data = JSONService.parse(data)
        mod_data = UtilitiesService.ascending(mod_data[0].a)
        $scope.top1Manu = mod_data[4].x
        $scope.top2Manu = mod_data[3].x
        $scope.top1ManuPer = mod_data[4].y / $scope.active_users * 100
        $scope.top2ManuPer = mod_data[3].y / $scope.active_users * 100
    })
}])