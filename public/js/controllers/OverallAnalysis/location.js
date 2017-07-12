var location1 = angular.module('Controllers')
location1.controller('LocationCtrl',['$scope','$rootScope','$q','JettyService','UtilitiesService','JSONService',function($scope, $rootScope, $q, JettyService, UtilitiesService, JSONService) {
    
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

    var NU = function() {
        var deferred = $q.defer()
        JettyService.cummulative('NU',app,$scope.endGap,$scope.noDays,2,"long",timeZone).then(function(data) {
            $scope.new_users_raw = data.x
            $scope.new_users = UtilitiesService.numberFormat($scope.new_users_raw);
            deferred.resolve();
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

    var NULanguage = function() {
        var deferred = $q.defer()
        JettyService.cummulative('NULanguage',app,$scope.endGap,$scope.noDays,3,"long",timeZone).then(function(data) {
             // $scope.table3loaded=true;
            var mod_data = UtilitiesService.descending(data,2);
            $scope.topLanguages = data;
            $scope.nutop5Languages = mod_data;
            for (var i = 0; i < $scope.nutop5Languages.length; i++) {
                    $scope.nutop5Languages[i].y=UtilitiesService.CommaSeparatedNumberFormat($scope.nutop5Languages[i].y)
                };
            $scope.percent_top5_lang_nu = [];
            var count=0;
            $scope.colors =["blue","red","yellow","green","purple"]
            $scope.col =["b","r","y","g","p"]
            for(i=0;i<mod_data.length;i++)
                count+=mod_data[i].y;
            var lang_len = $scope.nutop5Languages.length;
            for(i=0; i< 5 && i<lang_len; i++)
            {
                $scope.percent_top5_lang_nu[i] = ($scope.nutop5Languages[i].y /count)*100;
                $scope.percent_top5_lang_nu[i] = $scope.percent_top5_lang_nu[i].toFixed(2);
            }
            $scope.NULanguageCSV = $scope.nutop5Languages;
            $scope.totalItems_tab3 = $scope.nutop5Languages.length;
            $scope.itemsPerPages1 = 5;
            $scope.currentPage_tab3 = 1;
            $scope.maxSize_tab3 = 5;
            $scope.$watch('currentPage_tab3 + itemsPerPages1', function() {
            var begin = (($scope.currentPage_tab3 - 1) * $scope.itemsPerPages1);
                end = begin + $scope.itemsPerPages1;
                $scope.filteredlanguagelist = $scope.nutop5Languages.slice(begin,end);
               
            });
            deferred.resolve()
        });
        return deferred.promise
    };

    var TopCities = function() {
        var deferred = $q.defer();
        JettyService.cummulative('NUCity',app,$scope.endGap,$scope.noDays,3,"long",timeZone).then(function(data) {
             // $scope.table2loaded=true;
            $scope.topCities = UtilitiesService.descending(data,2);
            for (var i = 0; i < $scope.topCities.length; i++) {
                    $scope.topCities[i].y=UtilitiesService.CommaSeparatedNumberFormat($scope.topCities[i].y)
                };
            $scope.nutop5Cities = $scope.topCities.slice(0,5);
            $scope.percent_top5_city_nu = [];
            for(i=0; i<5 && $scope.nutop5Cities[i]; i++)
            {
                $scope.percent_top5_city_nu[i] = ($scope.nutop5Cities[i].y /$scope.new_users_raw)*100;
                $scope.percent_top5_city_nu[i] = $scope.percent_top5_city_nu[i].toFixed(2);
            }
            $scope.TopCitiesCSV = $scope.topCities;
            $scope.totalItems_tab1 = $scope.topCities.length;
            $scope.itemsPerPages = 5;
            $scope.currentPage_tab1 = 1;
            $scope.maxSize_tab1 = 5;
            $scope.$watch('currentPage_tab1 + itemsPerPages', function() {
            var begin = (($scope.currentPage_tab1 - 1) * $scope.itemsPerPages);
                end = begin + $scope.itemsPerPages;
                $scope.filteredcitylist = $scope.topCities.slice(begin,end);
               
            });
            deferred.resolve();
        });
        return deferred.promise;
    };

    var TopRegions = function() {
        var deferred = $q.defer();
        JettyService.cummulative('NUState',app,$scope.endGap,$scope.noDays,3,"long",timeZone).then(function(data) {
              // $scope.table1loaded=true;
            $scope.topRegionsNU = UtilitiesService.descending(data,2);
            for (var i = 0; i < $scope.topRegionsNU.length; i++) {
                    $scope.topRegionsNU[i].y=UtilitiesService.CommaSeparatedNumberFormat($scope.topRegionsNU[i].y)
                };
            $scope.TopRegionsCSV = $scope.topRegionsNU;
            $scope.totalItems_tab2 = $scope.topRegionsNU.length;
            $scope.itemsPerPage = 5;
            $scope.currentPage_tab2 = 1;
            $scope.maxSize_tab2 = 5;
            $scope.$watch('currentPage_tab2 + itemsPerPage', function() {
            var begin = (($scope.currentPage_tab2 - 1) * $scope.itemsPerPage);
                end = begin + $scope.itemsPerPage;
                $scope.filteredregionlist = $scope.topRegionsNU.slice(begin,end);
              

            });
            deferred.resolve();
        });
        return deferred.promise;
    };

    var DayWiseForCity = function(city_code,count){
        var deferred = $q.defer();
        JettyService.city_code(city_code,count,function(data){
            deferred.resolve(data);
        });
        return deferred.promise;
    }

    var TopCitiesTrend = function() {
        var deferred = $q.defer();
        var mod_data = [];
        var promises = [];
        $scope.map_data_city=[]

        for(i=0;i<$scope.nutop5Cities.length ;i++)
        {
            var region = $scope.nutop5Cities[i];
            if (region.x.toLowerCase() == $scope.topRegionsNU[0].x.toLowerCase()) {
                promise = DayWiseForCity(region.x,region.y);
            } else {
                continue;
            }

            promise.then(function(data){
                if (data.x.code != null) {
                    var data_point = {"x" : data.x.code, "y" : data.y}
                    $scope.map_data=$scope.map_data.concat(data_point)
                }
            });
            promises.push(promise);
        }
        $q.all(promises).then(function(){
                DrawMap();
                deferred.resolve();
            });
        return deferred.promise;
    };

    var DrawMap  = function() {
        var deferred = $q.defer();
        UtilitiesService.draw_map(map($scope.map_data, $scope.new_users_raw / $scope.topRegionsNU.length, $scope.topRegionsNU[0].y),"maps/"+$scope.topRegionsNU[0].x,'mapTopCity','100%','500');
        deferred.resolve();
        return deferred.promise;
    };

    var run = function()
    {
        NU().finally(AU)
            .finally(NULanguage)
            .finally(TopCities)
            .finally(TopRegions)
            .finally(TopCitiesTrend);
    };

    //Start();
    WatchDate();

}]);