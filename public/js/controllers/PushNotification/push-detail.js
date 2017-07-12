// /*  Controller for Revenue Page */

// var revenue = angular.module('Controllers')
// revenue.controller('PushDetailCtrl',['$scope','$rootScope','$q','$http','JettyService','UtilitiesService','JSONService',function($scope,  $rootScope, $q,$http, JettyService, UtilitiesService, JSONService) {

//     /* global variables which we use inside functions */
//     var today =  new Date();
//     var currentdate = new Date(today.getUTCFullYear(),today.getUTCMonth(),today.getUTCDate()); 
//     var app = $rootScope.app.app_secret;
//     var timeZone = "IST";
//     $scope.campaign_loading='false'


//     /*  if the user uses the date picker and changes the date, inner function gets called
//         Trigger function sets the endGap and noDays based on the new date and loads the page again
//     */
//     var WatchDate = function(){
//         $scope.$watch('daterange.date',function(nv,ov) {
//             $rootScope.daterange.date.startDate = new Date(nv.startDate.getFullYear(),nv.startDate.getMonth(),nv.startDate.getDate());
//             $rootScope.daterange.date.endDate = new Date(nv.endDate.getFullYear(),nv.endDate.getMonth(),nv.endDate.getDate());
//             $rootScope.daterange.endGap = Math.floor((currentdate.getTime() - $rootScope.daterange.date.endDate.getTime())/(1000*60*60*24));
//             $rootScope.daterange.noDays = Math.floor(($rootScope.daterange.date.endDate.getTime() - $rootScope.daterange.date.startDate.getTime())/(1000*60*60*24) + 1);
//             $scope.endGap = $rootScope.daterange.endGap;
//             $scope.noDays = $rootScope.daterange.noDays;
//             run();
//         })
//     };

//      $scope.getcampaigns = function(){
//           $scope.filteredcampaignslist=[];
//           if ($scope.endGap==1) {$scope.endGap=-1000;$scope.noDays+=1001};
//           if ($scope.endGap==0) {$scope.endGap=-1000;$scope.noDays+=1000};
//         JettyService.campaignstats($scope.endGap,$scope.noDays,$rootScope.app.app_secret,$rootScope.push.selected_campaign).then(function(response) {
//           if ( $scope.campaign_loading=='true') {
//              $('#camp_table').fadeTo('fast', 0).fadeTo('fast', 1)
//           };
//           $scope.campaign_loading='false';
//           if(response == "null")
//           {
//             $scope.total_campaigns = 0;
//           }
//           else
//           {
//             campaignslist = response;
//             $scope.total_campaigns = campaignslist.length;
//           }
//           for (var i = 0; i < campaignslist.length; i++) {
//               if (!parseInt(campaignslist[i].PushReqTimestamp)) {
//                   campaignslist[i].date="Multiple Dates"
//                   campaignslist[i].csf='-'
//               }
//               else{
//                   campaignslist[i].date=moment(Number(campaignslist[i].PushReqTimestamp)).format('DD-MM-YYYY, HH:mm');
//                   if (campaignslist[i].csf=='completed' && campaignslist[i].crt) {
//                     campaignslist[i].status=campaignslist[i].csf
//                     campaignslist[i].csf=' in '+convertToTime((campaignslist[i].crt/1000).toFixed(0))
//                   }
//                   else{
//                     campaignslist[i].status=campaignslist[i].csf
//                   }
//               }
//             };
//           $scope.itemsPerPage = 10
//           $scope.currentPage_tab1 = 1;
//           $scope.maxSize_tab1 = 5;
//           $scope.totalItems_tab1 = $scope.total_campaigns;
          
//           $scope.$watch('currentPage_tab1 + itemsPerPage', function() {
//               var begin = (($scope.currentPage_tab1 - 1) * $scope.itemsPerPage),
//               end = begin + $scope.itemsPerPage;
//               $scope.filteredcampaignslist =  campaignslist.slice(begin, end);
//               mod_data=[];
//           var sent=[],received=[],installs=[];
//           for (var i = 0; i < $scope.filteredcampaignslist.length; i++) {
//            sent.push({y:$scope.filteredcampaignslist[i].cpc,x:$scope.filteredcampaignslist[i].date})
//            received.push({y:$scope.filteredcampaignslist[i].csc,x:$scope.filteredcampaignslist[i].date})
//            installs.push({y:$scope.filteredcampaignslist[i].coc,x:$scope.filteredcampaignslist[i].date})
//           };
//            mod_data.push({z:'Sent',a:sent})
//            mod_data.push({z:'Received',a:received})
//            mod_data.push({z:'Opened',a:installs})
//       UtilitiesService.draw_chart(multiLine2(mod_data,new_user_device_multiline_style),'MSLine.swf','PushCampaignTrends','100%','353');
//       console.log(mod_data)
//           });

//       $scope.filteredcampaignslistCSV=[];
//       console.log(campaignslist)
//       for (var i = 0; i <  campaignslist.length; i++) {
//                   $scope.filteredcampaignslistCSV.push({
//                     a: campaignslist[i].src,
//                     b: campaignslist[i].date,
//                     c: campaignslist[i].cpc,
//                     d: campaignslist[i].csc,
//                     e: campaignslist[i].coc,
//                     f: campaignslist[i].csf,
//                     g: campaignslist[i].mt,

//                   })
//                 }


          
//         })

 
//   };

//    $scope.deleteScheduled = function(campid,index){
//      $http.post('/deletepush', {'app_secret' :$rootScope.app.app_secret,ref:campid}).success(function(response) {
//             console.log(response)
//           $scope.filteredcampaignslist[index].csf='Deleted';
//           $scope.filteredcampaignslist[index].status='Deleted';
//         }).error(function(response) {
//           $scope.error = response.message;
//         });
//   };

  

//   var convertToTime = function(seconds){
//       //mm:ss
//       return ("00"+(Math.floor((seconds)/60))).slice(-2)+":"+("00"+seconds%60).slice(-2);
//   }


    
    

//     var run = function(){
       
//        $scope.getcampaigns()
//     };



//     WatchDate();








// }]);