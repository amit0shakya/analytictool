/*  Controller for OverallAnalysis Overview Page 
    Function Names matches the section headings of the dashboard which they effect 
*/

var overallAnalysis = angular.module('Controllers');
overallAnalysis.controller('OAoverviewCtrl',['$scope','$rootScope','$q','JettyService','UtilitiesService','JSONService',function($scope, $rootScope, $q, JettyService, UtilitiesService, JSONService) {
    /* global variables which we use inside functions */
    var today =  new Date();
    var currentdate = new Date(today.getUTCFullYear(),today.getUTCMonth(),today.getUTCDate());
    var app = $rootScope.app.app_secret;
    var new_users_raw;
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
        $scope.date = {startDate: new Date(currentdate.getTime() - 8*1000*60*60*24), endDate: new Date(currentdate.getTime() - 2*1000*60*60*24)};
        // $scope.date = {startDate: new Date(Date.UTC(2015,0,1)), endDate: new Date(Date.UTC(2015,0,8))};
        $scope.endGap = Math.abs(currentdate.getTime() - $scope.date.endDate.getTime())/(1000*60*60*24);
        $scope.noDays = Math.abs($scope.date.endDate.getTime() - $scope.date.startDate.getTime())/(1000*60*60*24) + 1;
    };

    /*  Helper Function 
        Most Functions below are dependent on this for new_users_raw this should execute before them
    */
    var NewUsers = function() {
        var deferred = $q.defer();
        JettyService.cummulative('NU',app,$scope.endGap,$scope.noDays,2,"long",timeZone).then(function(data) {
            try
            {
                new_users_raw = data.x;
                deferred.resolve();
            }
            catch(err)
            {
                deferred.resolve();
            }
            
        });
        return deferred.promise;
    };
    
    var AU = function() {
        var deferred = $q.defer()
        JettyService.cummulative('AU',app,$scope.endGap,$scope.noDays,2,"hll",timeZone).then(function(data) {
            $scope.active_users_raw = data.x
            $scope.active_users = UtilitiesService.numberFormat($scope.active_users_raw);
            deferred.resolve();
        });
        return deferred.promise;
    };

    /* Top Device and Top 4 Devices sections */
    var TopDevices = function() {
        JettyService.cummulative('NUTop20Models',app,$scope.endGap,$scope.noDays,3,"long",timeZone).then(function(data) {
            var mod_data = (UtilitiesService.descending(data,3)).slice(0,5);
            $scope.top_devices = mod_data.slice(1,5);
            $scope.top_model = mod_data[0].x;
            $scope.top_manufacturer = mod_data[0].y;
            $scope.width4 = mod_data[1].z / new_users_raw * 100;
            $scope.width3 = mod_data[2].z / new_users_raw * 100;
            $scope.width2 = mod_data[3].z / new_users_raw * 100;
            $scope.width1 = mod_data[4].z / new_users_raw * 100;
        })
    };

    /* Top 2 Manufacturers percent section */
    var TopManu = function() {
        JettyService.cummulative('NUTop20Manufacturers',app,$scope.endGap,$scope.noDays,3,"long",timeZone).then(function(data) {
            $scope.top_manu = (UtilitiesService.descending(data,2)).slice(0,2);
            $scope.top_manu_percent = [];
            $scope.top_manu_percent.push($scope.top_manu[0].y / new_users_raw * 100);
            $scope.top_manu_percent.push($scope.top_manu[1].y / new_users_raw * 100);
        })
    };

    /* Network Operator Pie Chart section */
    var NetworkOperator = function() {
        JettyService.cummulative('NUTop20Operators',app,$scope.endGap,$scope.noDays,3,"long",timeZone).then(function(data) {
            var count = 0;
            mod_data = (UtilitiesService.descending(data,2)).slice(0,5);
            $scope.top_operator = mod_data[0].x;
            for(i=0;i<mod_data.length;i++)
            {
                count += mod_data[i].y;
            }
            mod_data = mod_data.concat({"x":"Others", "y": new_users_raw - count});
            UtilitiesService.draw_chart(piechart_singlediv(mod_data,oa_network_operator_pie_chart_style),"doughnut2d.swf","top5Operators","100%","250")
        });
    };

    /* Network Type Pie Chart section */
    var NetworkType = function() {
        JettyService.cummulative('NUNetworkType',app,$scope.endGap,$scope.noDays,3,"long",timeZone).then(function(data) {
            var mod_data = UtilitiesService.descending(data,2);
            var network_type = [];
            for(i=0;i< mod_data.length && i<5;i++) {
                network_type = network_type.concat({"x": mod_data[i].x, "y": mod_data[i].y });
            }
            UtilitiesService.draw_chart(piechart_op(network_type, oa_overview_network_type_pie_chart_style),"pie2d.swf","OANetwork","100%","250");
        })
    };

    var TopStates = function() {
        var deferred = $q.defer();
        JettyService.cummulative('AUState',app,$scope.endGap,$scope.noDays,3,"hll",timeZone).then(function(data) {
            $scope.topStatesAU = UtilitiesService.descending(data,2);
            $scope.totalItems_tab3 = $scope.topStatesAU.length;
            $scope.itemsPerPage5 = 5
            $scope.currentPage_tab3 = 1;
            $scope.maxSize_tab3 = 5;
            $scope.$watch('currentPage_tab4 + itemsPerPage5', function() {
                var begin = (($scope.currentPage_tab3 - 1) * $scope.itemsPerPage5),
                end = begin + $scope.itemsPerPage5;
                $scope.filteredstatewiselist = $scope.topStatesAU.slice(begin, end);
            });
            deferred.resolve();
        });
        return deferred.promise;
    };

   

    /* Change state to state code in the data for drawing the graph */
    var GetStateCode = function(state,count){
        var deferred = $q.defer();
        JettyService.state_code(state,count,function(data){
            deferred.resolve(data);
        });
        return deferred.promise;
    };

    /* Draws the state map for india */
    var StateMap = function() {
        var deferred = $q.defer();
        var mod_data = [];
        var promises = [];
        var map_data=[]
        for(i=0;i<$scope.topStatesAU.length ;i++)
        {
            var state = $scope.topStatesAU[i];
            promise = GetStateCode(state.x,state.y);
            promise.then(function(data) {
                if (data.x.code != null) {
                    var data_point = {"x" : data.x.code, "y" : data.y}
                    map_data=map_data.concat(data_point)
                }
            });
            promises.push(promise);
        }
        $q.all(promises).then(function(){
            UtilitiesService.draw_map(map(map_data,$scope.active_users_raw / $scope.topStatesAU.length, $scope.topStatesAU[0].y,test_map_style),"maps/india",'mapStates','100%','358');   
            deferred.resolve();
        });
        return deferred.promise;
    };

   

    var block1 = function(){
        TopDevices();
        TopManu();
        NetworkOperator();

    }
    var run = function() {
        NewUsers().finally(block1);
        AU()
        .finally(TopStates)
        .finally(StateMap);
        NetworkType();
       
    }

    //Start();
    WatchDate();
}])