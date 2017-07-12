/*  Controller for Network Page */

var network = angular.module('Controllers')
network.controller('NetworkCtrl',['$scope','$rootScope','$q','JettyService','UtilitiesService','JSONService',function($scope,  $rootScope, $q, JettyService, UtilitiesService, JSONService) {

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
        $scope.date = {startDate: new Date(currentdate.getTime() - 8*1000*60*60*24), endDate: new Date(currentdate.getTime() - 2*1000*60*60*24)};
        // $scope.date = {startDate: new Date(Date.UTC(2015,0,1)), endDate: new Date(Date.UTC(2015,0,8))};
        $scope.endGap = Math.abs(currentdate.getTime() - $scope.date.endDate.getTime())/(1000*60*60*24);
        $scope.noDays = Math.abs($scope.date.endDate.getTime() - $scope.date.startDate.getTime())/(1000*60*60*24) + 1;
    };

    /* Top Network Operators Bar Graph section */
    var OATop20Operators = function(){
        JettyService.cummulative('NUTop20Operators',app,$scope.endGap,$scope.noDays,3,"long",timeZone).then(function(data) {
            if(data=='null'){data=[]}
            var oa_top20_operators = (UtilitiesService.descending(data,2)).slice(0,5);
            // for (var i = 0; i < oa_top20_operators.length; i++) {
            //     if (oa_top20_operators[i].x=="") {oa_top20_operators[i].y=0};
            // };
            var mod_data = [];
            var unknown=0;
            for(i=0;i< oa_top20_operators.length && i< 5;i++)
            {
                if (oa_top20_operators[i].x=='null') {
                    unknown+=oa_top20_operators[i].y;
                }
                else if (oa_top20_operators[i].x=='carrier') {
                    unknown+=oa_top20_operators[i].y;
                }
                else if (oa_top20_operators[i].x=="") {
                    unknown+=oa_top20_operators[i].y;
                }
                else{
                mod_data = mod_data.concat({"x": oa_top20_operators[i].x, "y": oa_top20_operators[i].y });
                }
            }
            if (unknown>0) {
                mod_data = mod_data.concat({"x": 'Unknown', "y": unknown });
            };
            UtilitiesService.draw_chart(bargraph(mod_data,oa_network_operator_bar_style),"column2d.swf","OATopOperators","100%","400");
        });
    };

    /* Network Type Pie Chart section */
    var OANetworkType = function(){
        JettyService.cummulative('AUNetworkType',app,$scope.endGap,$scope.noDays,3,"hll",timeZone).then(function(data) {
             // $scope.table2loaded=true;
            $scope.itemsPerPage = 5;
            $scope.currentPage_tab2 = 1;
            $scope.maxSize_tab2 = 5;
            var oa_networktype = (UtilitiesService.descending(data,2)).slice(0,5);

            var mod_data = [];
            for(i=0;i< oa_networktype.length && i< 5;i++)
            {
            	mod_data = mod_data.concat({"x": oa_networktype[i].x, "y": oa_networktype[i].y });
            }
            networkTypeList=UtilitiesService.descending(mod_data,2);
            for (var i = 0; i < networkTypeList.length; i++) {
                    networkTypeList[i].y=UtilitiesService.CommaSeparatedNumberFormat(networkTypeList[i].y)
                };
            $scope.OANetworkTypeCSV = networkTypeList;
            $scope.totalItems_tab2 = networkTypeList.length;
            $scope.$watch('currentPage_tab2 + itemsPerPage', function() {
                var begin = (($scope.currentPage_tab2 - 1) * $scope.itemsPerPage),
                end = begin + $scope.itemsPerPage;
                $scope.filterednetworktypelist =  networkTypeList.slice(begin, end);
               
            });
            UtilitiesService.draw_chart(piechart_op(mod_data, oa_network_network_type_pie_chart_style),"pie2d.swf","OANetworkType","100%","400");
        });
    };

    /*  Helper Function
        Given a Page it gives the Network Operators list which falls in that page
    */
    var NetworkOperatorsListForPage = function(){
        var deferred = $q.defer();
        var operatorslist = [];
        JettyService.cummulative('AUOperatorsAll',app,$scope.endGap,$scope.noDays,3,"hll",timeZone).then(function(data) {
                if(data=='null' || data==undefined){data=[]}
                for (var i = 0; i < data.length; i++) {
                    if (data[i].x=="") {data[i].y=0};
                };
                operatorslist = UtilitiesService.descending(data,2);
                for (var i = 0; i < operatorslist.length; i++) {
                    operatorslist[i].y=UtilitiesService.CommaSeparatedNumberFormat(operatorslist[i].y)
                };
                deferred.resolve(operatorslist);
            
        });
        return deferred.promise;
    }

    /* Network Operators List Table with pagination 
       Uses the above Helper function
    */
    var OANetworkOperatorsAll = function(){
        $scope.itemsPerPage = 5;
        $scope.currentPage_tab1 = 1;
        $scope.maxSize_tab1 = 5;
        var promise = NetworkOperatorsListForPage();
        promise.then(function(data){
            $scope.OANetworkOperatorsAllCSV = data;
            $scope.totalItems_tab1 = data.length;
            $scope.$watch('currentPage_tab1 + itemsPerPage', function() {
                var begin = (($scope.currentPage_tab1 - 1) * $scope.itemsPerPage),
                end = begin + $scope.itemsPerPage;
                $scope.filteredoperatorslist =  data.slice(begin, end);
                // $scope.table1loaded=true;
            });
        })
    };

    var run = function(){
    	OATop20Operators();
        OANetworkType();
        OANetworkOperatorsAll();
    };

    //Start();
    WatchDate();

}]);