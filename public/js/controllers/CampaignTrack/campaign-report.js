var campaignreport = angular.module('Controllers')
campaignreport.controller('CampaignReportCtrl',['$scope','$rootScope','$q','$http','JettyService','UtilitiesService','JSONService',function($scope,  $rootScope, $q, $http, JettyService, UtilitiesService, JSONService) {

    var today =  new Date();
    var currentdate = new Date(today.getUTCFullYear(),today.getUTCMonth(),today.getUTCDate());
    var app = $rootScope.app.app_secret;
    var timeZone = "IST";
    $scope.campaign_loading='true'
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

    $scope.localLang = {
    selectAll       : "Select all",
    selectNone      : "Select none",
    reset           : "Undo all",
    search          : "Type here to search...",
    nothingSelected : "Select Campains"
}
   

      $scope.listCampaignStats = function() {
          $http.post('/listTrackerStats', {o:$rootScope.app.app_secret,endGap:$scope.endGap,noDays:$scope.noDays}).success(function(response) {
            
              $scope.table1loaded=true;
              $scope.campaign_loading='false';

              for (var i = 0; i < response.length; i++) {
                if (response[i].dt==0) {
                  response[i].rate='0 %';
                }else{
                  response[i].rate=(response[i].du/response[i].dt*100).toFixed(1)+' %'
                };
              };

              $scope.campaignliststats=response.reverse();

              for (var i = 0; i < $scope.campaignliststats.length; i++) {
                $scope.campaignliststats[i].x=$scope.campaignliststats[i].do
                $scope.campaignliststats[i].events=JSON.parse($scope.campaignliststats[i].eventCmpgnDetails || '[]');
                
                if (i==0) {
                  $scope.campaignliststats[i].ticked=true;
                };

                if($scope.campaignliststats[i]=="Social Campaign") {
                   $scope.campaignliststats[i]="SL Social Campaign";
                 };
              };

              $scope.noOfCampaigns=$scope.campaignliststats.length;
              $scope.noOfActiveCampaigns=$scope.campaignliststats.filter(function(a){ return a.status=='active'}).length;
              $scope.publishers={};

              $scope.campaignliststats.forEach(function(a){ 
                $scope.publishers[a.dp]=($scope.publishers[a.dp]||0)+a.du;
              })

              $scope.noOfPublishers=Object.keys($scope.publishers).length
              $scope.noOfInstalls=$scope.campaignliststats.map(function(a){ return a.du}).reduce(function(a,b){ return a+b},0)

              $scope.topPublishers=Object.keys($scope.publishers).map(function(name){
              
              var nm;

                if(name=="Social Campaign") {
                   nm="SL Social Campaign";
                 }else{
                    nm=name;
                 }

              return {x:nm,y:$scope.publishers[name]}}).sort(function(a,b){ return b.y-a.y});

              $scope.itemsPerPage = $scope.campaignliststats.length;//20
              $scope.currentPage_tab1 = 1;
              $scope.maxSize_tab1 = 5;
              $scope.totalItems_tab1 = $scope.campaignliststats.length;
              $scope.$watch('currentPage_tab1 + itemsPerPage', function() {

              var begin = (($scope.currentPage_tab1 - 1) * $scope.itemsPerPage), end = begin + $scope.itemsPerPage;

              if($rootScope.app.app_secret=="5ae8aebd7c" || $rootScope.app.app_secret=="784b8c2995"){

              var campaignData=$scope.campaignliststats.slice(begin, end);   

              var removeCampaign=["sm FB campaign","sm fb campaign","FHM India DishTv","Digidesk - registration campaign","Digidesk Installs","Digidesk installs 2","FHMIndia registration mXpresso","Campaign 1","Campaign 2"];
              
              var lgt=parseInt($scope.campaignliststats.length);

              var campaignOutput=[];

               for(var i=0;i<lgt; i++){

                var campaignName=campaignData[i].do+"";

                 if((campaignName=="Social Campaign") && (campaignData[i].dp=="Social Campaign")){
                  campaignData[i].do = "SL Social Campaign";
                  campaignData[i].dp = "SL";
                 }//else{
                  /*
                   if(((campaignName=="sm fb campaign") || (campaignName=="sm FB campaign")) && (campaignData[i].dp == "fb")){
                     campaignData[i].do = "Social Campaign";
                     campaignData[i].dp = "Social Media";
                   }else{*/
                    var showdata=true;

                    for(var j=0;j<removeCampaign.length;j++){
                      var rc=removeCampaign[j]+"";
                      if(campaignName==rc){
                        //console.log("remove>>"+rc);
                        //campaignData.splice(i,1);
                        //lgt = parseInt(campaignData.length);
                         //i--;
                         showdata=false;
                         break;
                      }
                     }

                     if(showdata){
                       campaignOutput.push(campaignData[i]);
                     }

                   //}
                 }
                //}
    
                console.log("IF// CAMPAIGN REPORT")
                 $scope.filteredcampaignsliststats =  campaignOutput;//campaignData;
                }else{

                console.log("ELSE// CAMPAIGN REPORT")
                  
                   $scope.filteredcampaignsliststats =  $scope.campaignliststats.slice(begin, end);
                }
      });
      

          }).error(function(response) {
          });
      };


      $scope.dateWiseCampgnReport = function(campid) {
          $http.post('/dateWiseCampgnReport', {cmpgnId:campid,endGap:$scope.endGap,noDays:$scope.noDays}).success(function(data) {
               $scope.table1loaded=true;
              $scope.campaign_loading='false'
              console.log(data)
              // data = JSONService.fill(data,$scope.endGap,$scope.noDays);
               //console.log(data)
                var data1=[],data2=[];
               for(i=0;i<data.length;i++)
                {
                    data1 = data1.concat({"x":data[i].date, "y":data[i].clicksCount+''});
                }

                for(i=0;i<data.length;i++)
                {
                    data2 = data2.concat({"x":data[i].date, "y":data[i].convCount+''});
                }
              console.log(data1)
              console.log(data2)
              mod_data = JSONService.merge(data1,data2,'Click','Install',$scope.endGap,$scope.noDays);
              console.log(mod_data)
                UtilitiesService.draw_chart(multiLine(mod_data,2,CampaignReportClickVSInstall_multiline_style),"MSLine.swf","CampaignTrends","100%","353");
            
      

          }).error(function(response) {
          });
      };

      $scope.$watch('{x:selected_campaign,y:daterange.date}',function(nv,ov) {
              if (nv && nv.x.length!=ov.x.length || nv.y!=ov.y) {
                if(nv.x.length == 1)
                {
                  console.log(nv)
                  $scope.dateWiseCampgnReport(nv.x[0].cmpgnId);
                }
               else
                {
                mod_data=[];
                var click=[],install=[],dropout=[];goal1=[];goal2=[];goal1name=[];goal2name=[];
                for (var i = 0; i < $scope.selected_campaign.length; i++) {
                   click.push({y:$scope.selected_campaign[i].dt,x:$scope.selected_campaign[i].do})
                   install.push({y:$scope.selected_campaign[i].du,x:$scope.selected_campaign[i].do})
                   dropout.push({y:$scope.selected_campaign[i].dt-$scope.selected_campaign[i].du,x:$scope.selected_campaign[i].do})
                   try{
                      goal1.push({y:$scope.campaignliststats[i].events[0].evntCount,x:$scope.selected_campaign[i].do})
                   }
                   catch(err){
                      goal1.push({y:0,x:$scope.selected_campaign[i].do})
                   }
                   try{
                      goal1name.push($scope.campaignliststats[i].events[0].evntName)
                   }
                   catch(err){
                      goal1name.push('')
                   }
                   try{
                      goal2.push({y:$scope.campaignliststats[i].events[1].evntCount,x:$scope.selected_campaign[i].do})
                   }
                   catch(err){
                      goal2.push({y:0,x:$scope.selected_campaign[i].do})
                   }
                   try{
                      goal2name.push($scope.campaignliststats[i].events[1].evntName)
                   }
                   catch(err){
                      goal2name.push('')
                   }
                  };
               mod_data.push({z:'Click',a:click,goalname:'Click'})
               mod_data.push({z:'Install',a:install,goalname:'Install'})
               // mod_data.push({z:'Dropout',a:dropout})
               mod_data.push({z:'Goal 1',a:goal1,goalname:goal1name})
               mod_data.push({z:'Goal 2',a:goal2,goalname:goal2name})
            UtilitiesService.draw_chart(multiLineCampaignReport(mod_data,campaign_report_comparison_multibar_style),'MSColumn2d.swf','CampaignTrends','100%','353');
             }
              };
            
        })

      $scope.checked={}
      $scope.checked.Campaigns={};

      $scope.editstatus = function(status) {
        var arr=Object.keys($scope.checked.Campaigns).filter(function(key){ return $scope.checked.Campaigns[key] })
            arr.forEach(function(key,i){
                  if ($scope.checked.Campaigns[key]) {
                    $http.post('/editstatus', {cmpgnId:key,newStatus:status}).success(function(data) {
                    if (i==arr.length-1) {
                      $scope.listCampaignStats();
                    }
                  })
                }
            })
      };

  

       var run = function(){
          $scope.listCampaignStats();
           //$scope.dateWiseCampgnReport();
       }


       WatchDate();

}]);