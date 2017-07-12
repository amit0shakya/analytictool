var acquisition = angular.module('Controllers');
acquisition.controller('AoverviewCtrl', ['$scope','JettyService','UtilitiesService','JSONService',function($scope, JettyService, UtilitiesService, JSONService) {
    JettyService.timewise('IPaid','91c556949f',10,1,4,2,function(data) {
        $scope.p_installs = data[0].y;
        $scope.paid_installs = UtilitiesService.numberFormat(data[0].y);
        JettyService.timewise('I','91c556949f',10,1,4,2,function(data) {
            $scope.total_installs = UtilitiesService.numberFormat(data[0].y);
            $scope.organic_installs = UtilitiesService.numberFormat(data[0].y-$scope.p_installs);
        });
    });
    JettyService.timewise('U','91c556949f',10,1,4,2,function(data) {
        $scope.uninstalls = UtilitiesService.numberFormat(data[0].y);
    });
    JettyService.timewise('IPaid',"91c556949f",12,13,2,2,function(data1) {
        endGap = 12;
        noDays = 13;
        gran = 2;
        noVar = 2;
        JettyService.timewise('I',"91c556949f",endGap,noDays,gran,noVar,function(data2) {
            for(i=0;i<data2.length;i++) {
                data2[i].y = data2[i].y-data1[i].y;
            }
            mod_data = JSONService.merge(data1,data2,'paid','organic',endGap,noDays)
            UtilitiesService.draw_chart(multiLine(mod_data,2),"MSLine.swf","PaidVsOrganic","100%","353")
        })
    });
    JettyService.timewise('I',"91c556949f",12,13,2,2,function(data1) {
        endGap = 12;
        noDays = 13;
        gran = 2;
        noVar = 2;
        JettyService.timewise('U',"91c556949f",endGap,noDays,gran,noVar,function(data2) {
            mod_data = JSONService.merge(data1,data2,'installs','uninstalls',endGap,noDays)
            UtilitiesService.draw_chart(multiLine(mod_data,2),"MSLine.swf","InstallsVsUninstalls","100%","353")
        })
    });
    JettyService.timewise('IPaidTop5Sources','91c556949f',10,1,4,3,function(data) {
        mod_data = JSONService.parse(data);
        mod_data = UtilitiesService.descending(mod_data[0].a);
        $scope.paid_source = mod_data[0].x;
        $scope.paid_count = UtilitiesService.numberFormat(mod_data[0].y);
        UtilitiesService.draw_chart(piechart_op(mod_data.slice(0,5)),"doughnut2d.swf","paidSources","100%","400")
    });
    JettyService.timewise('ITop20Terms','91c556949f',10,1,4,3,function(data) {
        mod_data = JSONService.parse(data);
        mod_data = UtilitiesService.descending(mod_data[0].a);
        $scope.top_term = mod_data[0].x;
        $scope.term_count = UtilitiesService.numberFormat(mod_data[0].y);
        UtilitiesService.draw_chart(piechart_op(mod_data.slice(0,5)),"doughnut2d.swf","topKeyWords","100%","400")
    })
    JettyService.timewise('UPaidTop20Sources','91c556949f',10,1,4,3,function(data) {
        mod_data = JSONService.parse(data);
        mod_data = UtilitiesService.descending(mod_data[0].a);
        $scope.uninstall_source = mod_data[0].x;
        $scope.uninstall_count = UtilitiesService.numberFormat(mod_data[0].y);
        UtilitiesService.draw_chart(piechart_op(mod_data.slice(0,5)),"doughnut2d.swf","uninstallSources","100%","400")
    });
}]);