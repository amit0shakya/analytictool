var Events = angular.module('Controllers')
Events.controller('RealEventsCtrl',['$scope','$filter','$rootScope','$q','JettyService','UtilitiesService','JSONService','$http',function($scope,$filter,  $rootScope, $q, JettyService, UtilitiesService, JSONService,$http) {
    /* global variables which we use inside functions */
    var today =  new Date();
    var currentdate = new Date(today.getUTCFullYear(),today.getUTCMonth(),today.getUTCDate()); 
    var app = $rootScope.app.app_secret;
    var timeZone = "IST";

    $scope.prefs={}
    $scope.prefs.time='30'
    $scope.prefs.timelabel='Last 30 mins'

    var getEventsName = function() {
            $scope.table1loaded=false;
            $scope.event_list=[]
            $scope.itemsPerPage1 = 10
            $scope.currentPage_tab1 = 1;
            $scope.maxSize_tab1 = 5;
            var deferred = $q.defer();
            $scope.EventsNameList=[]
            $scope.filteredEventsNameList=[]
            $http.post('realTimeEventReport',{o:app,timeFrame:$scope.prefs.time,}).success(function(data) {
                $scope.table1loaded=true;
                data=JSON.parse(data[0].eventCount)
                for (var i = 0; i < data.length; i++) {
                    data[i].x=data[i].evntName; delete data[i].evntName
                    data[i].y=data[i].evntCnt; delete data[i].evntCnt
                }
                // console.log(data)
                
                 
                 if (data==null || data=='null') {
                data=[]
                 }
                 data.sort(function(a,b) {return b.y-a.y});
                 $scope.prefs.selected_ev1=$scope.prefs.selected_ev1||data[0].x
                $scope.event_list_all=data;
                $scope.EventListCSV = data;
                $scope.event_items = data.length;
                $scope.items_per_page1 = 10;
                $scope.events_current_page = 1;
                $scope.max_pages = 5;
                $scope.$watch('events_current_page', function() {
                    var begin = (($scope.events_current_page - 1) * $scope.items_per_page1),
                    end = begin + $scope.items_per_page1;
                    $scope.event_list = data.slice(begin, end);
                    // $scope.table2loaded=true;
                });
                deferred.resolve();
            });
            return deferred.promise;
        };

        

      

       $scope.$watch('prefs.selected_ev1+prefs.selected_ev2+prefs.time+prefs.selected_event',function(nv,ov) { 
            if ($scope.prefs.selected_ev1==null) {return;}
            var promises = [];
            var data1=[],data2=[]
            var promise1 = $http.post('realTimeEventDateWiseReport',{o:app,timeFrame:$scope.prefs.time,eventName:$scope.prefs.selected_ev1})
            var promise2 = $http.post('realTimeEventDateWiseReport',{o:app,timeFrame:$scope.prefs.time,eventName:$scope.prefs.selected_ev2})
        
            promise1.success(function(data){
                // console.log(data)
                 if (data==undefined || data=='null') {data=[]};
                for(i=0;i<data.length;i++)
                {
                    data1 = data1.concat({"x":data[i].evntDate, "y":(data[i].evntDateCnt)});
                }
            });

            promise2.success(function(data){
                 if (data==undefined || data=='null') {data=[]};
                for(i=0;i<data.length;i++)
                {
                    data2 = data2.concat({"x":data[i].evntDate, "y":(data[i].evntDateCnt)});
                }
            });

            promises.push(promise1);
            $scope.prefs.selected_ev2 ? promises.push(promise2) : '';

            $q.all(promises).then(function(){
                mod_data=[]
                mod_data = mod_data.concat({'z': $scope.prefs.selected_ev1 , 'a': data1})
                $scope.prefs.selected_ev2 ? mod_data = mod_data.concat({'z': $scope.prefs.selected_ev2 , 'a': data2}) : ''
            if ($scope.prefs.selected_event) {
                refresh_selected_event()
            }
            else{
            UtilitiesService.draw_chart(multiLine2(mod_data,new_user_device_multiline_style),'MSLine.swf','EventsCompareGraph','100%','353');
            }
            });

            if ($scope.prefs.selected_event)
            {
                refresh_selected_event()
            }
        })

        $scope.$watch('prefs.time',function(nv,ov) {
            getEventsName()
        })

        var refresh_selected_event=function(){
            $scope.prefs.selected_prop=null
            $scope.table1loaded=false;
            $http.post('realTimeEventPropValReport',{o:app,timeFrame:$scope.prefs.time,eventName:$scope.prefs.selected_event}).success(function(response) {
                // console.log(response)
                $scope.table1loaded=true;
                $scope.EventPropValData=response;
                var properties=response.map(function(a){return a.evntProp})
                properties=properties.filter(function(item, pos) {
                                return properties.indexOf(item) == pos;
                            })
                $scope.properties_name=properties;
                $scope.prefs.selected_prop=$scope.properties_name[0]

            })
        }

        $scope.$watch('prefs.selected_event',function(nv,ov) {
            if ($scope.prefs.selected_event==null) {return;}
            refresh_selected_event()
        })



        $scope.$watch('prefs.selected_prop',function(nv,ov) {
            if ($scope.prefs.selected_prop==null) {return;}
            var data=$scope.EventPropValData.filter(function(a){return a.evntProp==$scope.prefs.selected_prop})
            for (var i = 0; i < data.length; i++) {
                data[i].x=data[i].evntPropVal; delete data[i].evntPropVal
                data[i].y=data[i].evntPropValCnt; delete data[i].evntPropValCnt
            }
            data.sort(function(a,b) {return b.y-a.y});
            $scope.value_data=data
            $scope.events_current_page=1
            $scope.query=''
            $scope.$watch('events_current_page', function() {
                    var begin = (($scope.events_current_page - 1) * $scope.items_per_page1),
                    end = begin + $scope.items_per_page1;
                    $scope.value_data_list = $scope.value_data.slice(begin, end);
                });
            data=data.slice(0,7)
            UtilitiesService.draw_chart(bargraph(data,dashboard_overview_revenuebysource_bar_style),"column2d.swf","EventsCompareGraph","100%","268");
            
            })


        

        getEventsName();
   
}]);