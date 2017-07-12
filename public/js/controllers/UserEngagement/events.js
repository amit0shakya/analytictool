var Events = angular.module('Controllers')
Events.controller('EventsCtrl',['$scope','$filter','$rootScope','$q','JettyService','UtilitiesService','JSONService','$http',function($scope,$filter,  $rootScope, $q, JettyService, UtilitiesService, JSONService,$http) {
    /* global variables which we use inside functions */
    var today =  new Date();
    var currentdate = new Date(today.getUTCFullYear(),today.getUTCMonth(),today.getUTCDate()); 
    var app = $rootScope.app.app_secret;
    var timeZone = "IST";

    $scope.table1loaded=true;
    $scope.table2loaded=true;
    $scope.table3loaded=true;
    var WatchDate = function(){
        $scope.$watch('daterange.date',function(nv,ov)
         {
            $rootScope.daterange.date.startDate = new Date(nv.startDate.getFullYear(),nv.startDate.getMonth(),nv.startDate.getDate());
            $rootScope.daterange.date.endDate = new Date(nv.endDate.getFullYear(),nv.endDate.getMonth(),nv.endDate.getDate());
            $rootScope.daterange.endGap = Math.floor((currentdate.getTime() - $rootScope.daterange.date.endDate.getTime())/(1000*60*60*24));
            $rootScope.daterange.noDays = Math.floor(($rootScope.daterange.date.endDate.getTime() - $rootScope.daterange.date.startDate.getTime())/(1000*60*60*24) + 1);
            $scope.endGap = $rootScope.daterange.endGap;
            $scope.noDays = $rootScope.daterange.noDays;
            run();
        })
    };


     var EventsCount = function() {
            var deferred = $q.defer();
            
            JettyService.granwise("ECount",app,$scope.endGap,$scope.noDays,2,2,"long",timeZone).then(function(data) {

                try
                {
                    data = JSONService.fill(data,$scope.endGap,$scope.noDays);
                    new_users_data = data;
                    UtilitiesService.draw_chart(line(data,event_line_style),'Line.swf','Events_line_chart','100%','253');
                    deferred.resolve();
                }
                catch(err)
                {
                    deferred.resolve();
                }
                
            });
            return deferred.promise;
        };

        $scope.getEventsNameGranwise = function(index,pg) {

            var ename= $scope.filteredEventsNameList[index+((pg-1)*10)].x
            $scope.selectedeventname=ename;
            var deferred = $q.defer();
            JettyService.granwise("ENameCount",app,$scope.endGap,$scope.noDays,2,3,"long",timeZone).then(function(data) {
                Eventdata=[];
                for (var i = 0; i < data.length; i++) {
                    var el = JSON.parse(data[i].a)
                    for (var j = 0; j < el.length; j++) {
                        if (el[j].x==ename) {
                            Eventdata.push({x:data[i].z,y:el[j].y})
                            break;
                        };
                    };
                };
                Eventdata=JSONService.fill(Eventdata,$scope.endGap,$scope.noDays);
                UtilitiesService.draw_chart(line(Eventdata,event_line_style),'Line.swf','Events_line_chart','100%','253');

                deferred.resolve();
            });
            return deferred.promise;
        };

         var getEventsName = function() {
            $scope.table1loaded=false;
            $scope.itemsPerPage1 = 10
            $scope.currentPage_tab1 = 1;
            $scope.maxSize_tab1 = 5;
            var deferred = $q.defer();
            $scope.EventsNameList=[]
            $scope.filteredEventsNameList=[]
            JettyService.cummulative("ENameCount",app,$scope.endGap,$scope.noDays,3,"long",timeZone).then(function(data) {
                 $scope.table1loaded=true;
                 if (data==null || data=='null') {
                data=[]
                 }
                 data.sort(function(a,b) {return b.y-a.y});
                $scope.EventsNameList=data;
                $scope.filteredEventsNameList=$scope.EventsNameList
               for (var i = 0; i < $scope.filteredEventsNameList.length; i++) {
                    $scope.filteredEventsNameList[i].y=UtilitiesService.CommaSeparatedNumberFormat($scope.filteredEventsNameList[i].y)
                };
                deferred.resolve();
            });
            return deferred.promise;
        };

        $scope.updateFilteredeventList = function() {
        $scope.filteredEventsNameList = $filter("filter")($scope.EventsNameList, $scope.eventquery);
        if ($scope.filteredEventsNameList.length==0) {
            $scope.EventsNameListSlice=[];
        };
      };

        $scope.$watch('currentPage_tab1 + itemsPerPage1 + filteredEventsNameList', function() {

                        var begin = (($scope.currentPage_tab1 - 1) * $scope.itemsPerPage1),
                        end = begin + $scope.itemsPerPage1;
                        // if ($scope.filteredEventsNameList && $scope.filteredEventsNameList.length) {
                        $scope.totalItems_tab1 = $scope.filteredEventsNameList.length;
                        $scope.EventsNameListSlice =  $scope.filteredEventsNameList.slice(begin, end);
                        
                        // };
            });

         var getOtherParamEventsName = function(ename) {
            $scope.itemsPerPage2 = 10
            $scope.currentPage_tab2 = 1;
            $scope.maxSize_tab2 = 5;
            $scope.propquery=''
            $scope.EventsOtherParamName=[];
            $scope.EventsOtherParamVal=[];
            $scope.filteredpropList=[];
            
            var deferred = $q.defer();
            if (ename==undefined) {ename=$scope.filteredEventsNameList[0].x};
            if (ename==undefined) {return}
            $scope.table2loaded=false;
             $scope.selectedEvent=ename;
            JettyService.keycummulativestring("ENameOtherparam",app,ename,$scope.endGap,$scope.noDays,2,"string",timeZone).then(function(data) {
                $scope.table2loaded=true;
                try
                {
                    var data = JSON.parse(data.x);
                    data.sort(function(a,b) {return a.x.localeCompare(b.x)});
                    $scope.EventsOtherParamName=data;
                    $scope.filteredpropList=$scope.EventsOtherParamName
                    for (var i = 0; i < $scope.filteredpropList.length; i++) {
                    $scope.filteredpropList[i].y=UtilitiesService.CommaSeparatedNumberFormat($scope.filteredpropList[i].y)
                };
                    getOtherParamEventsCount();
                   
                    deferred.resolve();
                }
                catch(err)
                {
                    deferred.resolve();
                }
                
                    
                
            });

            return deferred.promise;
        };

        $scope.updateFilteredpropList = function() {
        $scope.filteredpropList = $filter("filter")($scope.EventsOtherParamName, $scope.propquery);
        if ($scope.filteredpropList.length==0) {
            $scope.EventsOtherParamNameSlice=[];
        };
      };

        $scope.$watch('currentPage_tab2 + itemsPerPage2 + filteredpropList', function() {
                        $scope.EventsOtherParamNameSlice=[];
                        $scope.EventsOtherParamValSlice=[];
                        var begin = (($scope.currentPage_tab2 - 1) * $scope.itemsPerPage2),
                        end = begin + $scope.itemsPerPage2;
                        if ($scope.filteredpropList && $scope.filteredpropList.length) {
                        $scope.totalItems_tab2 = $scope.filteredpropList.length;
                        $scope.EventsOtherParamNameSlice =  $scope.filteredpropList.slice(begin, end);
                        

                        };
            });

        var promise;
        var getOtherParamEventsCount = function(opname) {
            $scope.table3loaded=false;
            $scope.itemsPerPage3 = 10;
            $scope.currentPage_tab3 = 1;
            $scope.maxSize_tab3 = 5;
            $scope.EventsOtherParamVal=[];
            $scope.filteredvalueList=[];
            $scope.valuequery=''
            if (opname==undefined) {opname=$scope.selectedEvent+"__"+$scope.EventsOtherParamName[0].x};
            $scope.ParamCountFileName=opname+'.csv'
            $scope.selectedOtherParam=opname;
            promise = JettyService.keycummulative("ENameOtherparamCount",app,opname,$scope.endGap,$scope.noDays,3,"long",timeZone);
            var func = function(data) {
                $scope.table3loaded=true;
                if ($scope.selectedOtherParam!=arguments.callee.prototype.opname) {console.log('revoked');return};
                data.sort(function(a,b) {return b.y-a.y});
                $scope.EventsOtherParamVal=data;
                $scope.filteredvalueList=$scope.EventsOtherParamVal
               for (var i = 0; i < $scope.filteredvalueList.length; i++) {
                    $scope.filteredvalueList[i].y=UtilitiesService.CommaSeparatedNumberFormat($scope.filteredvalueList[i].y)
                }; 
                
            }
            func.prototype.opname=opname;
            promise.then(func);
        };

         $scope.updateFilteredvalueList = function() {
        $scope.filteredvalueList = $filter("filter")($scope.EventsOtherParamVal, $scope.valuequery);
        if ($scope.filteredvalueList.length==0) {
            $scope.EventsOtherParamValSlice=[];
        };
      };

        $scope.$watch('currentPage_tab3 + itemsPerPage3 + filteredvalueList', function() {
                        $scope.EventsOtherParamValSlice=[];
                        var begin = (($scope.currentPage_tab3 - 1) * $scope.itemsPerPage3),
                        end = begin + $scope.itemsPerPage3;
                        if ($scope.filteredvalueList && $scope.filteredvalueList.length) {
                        $scope.totalItems_tab3 = $scope.filteredvalueList.length;
                        $scope.EventsOtherParamValSlice =  $scope.filteredvalueList.slice(begin, end);
                        


                        };
                 });


    $('#Enametable').delegate("tr[id^='Ename']","click",function(){
        $("tr[id^='Ename']").removeClass("active");
        $(this).addClass("active");
        var index=$(this).attr("id").slice(5);
        index = ($scope.currentPage_tab1 - 1)*10+Number(index)
        getOtherParamEventsName($scope.filteredEventsNameList[index].x)

    });

    $('#OtherParamtable').delegate("tr[id^='OPname']","click",function(){
        $("tr[id^='OPname']").removeClass("selected");
        $(this).addClass("selected");
        var index=$(this).attr("id").slice(6);
        index = ($scope.currentPage_tab2 - 1)*10+Number(index)
        getOtherParamEventsCount($scope.selectedEvent+"__"+$scope.filteredpropList[index].x)
    });     


    $scope.realtimeevents=function(){
        $scope.rtevents=[]
            $http.post('realtimeevents').success(function(response) {
                $scope.rtevents=response || [{"eventName":"button click","eventPropKey":"postion","eventPropVal":"store","eventPropCnt":1,"totEventCnt":1}]
                    console.log(response)
            })
    }
    $scope.realtimeevents();
                 

    var run = function(){
          $scope.selectedeventname=undefined;
          EventsCount();
          getEventsName().then(getOtherParamEventsName);
    }

    WatchDate();
   
}]);