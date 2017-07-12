// var globaldate = angular.module('Controllers');
// globaldate.controller('DateCtrl', ['$scope','$rootScope','$q','JettyService','UtilitiesService','JSONService',function($scope, $rootScope, $q, JettyService, UtilitiesService, JSONService) {

	
// 	var today =  new Date();
//     var currentdate = new Date(Date.UTC(today.getUTCFullYear(),today.getUTCMonth(),today.getUTCDate()));

// 	/* Initialized the default date range and sets the endGap and noDays */
//     var Start = function() {
// 	    if($rootScope.daterange.date == '')
// 	    {
// 	    	$rootScope.daterange.date = {startDate: new Date(currentdate.getTime() - 7*1000*60*60*24), endDate: new Date(currentdate.getTime() - 1*1000*60*60*24)};		
// 	        $rootScope.daterange.endGap = Math.floor((currentdate.getTime() - $rootScope.daterange.date.endDate.getTime())/(1000*60*60*24));
// 	        $rootScope.daterange.noDays = Math.floor(($rootScope.daterange.date.endDate.getTime() - $rootScope.daterange.date.startDate.getTime())/(1000*60*60*24) + 1);
// 	    }
//     };

//     if($rootScope.daterange == undefined)
// 	{
// 		$rootScope.daterange = {
// 			date: '',
// 			endGap: '',
// 			noDays:''
// 		}
// 		Start();
// 	}
    
	    
// }]);