  var pushreport = angular.module('Controllers')
  pushreport.controller('PushReportCtrl',['$scope','$rootScope','$q','$http','JettyService','UtilitiesService','JSONService',function($scope, $rootScope, $q, $http, JettyService, UtilitiesService, JSONService) {
    
    
        var today =  new Date();
        var currentdate = new Date(today.getUTCFullYear(),today.getUTCMonth(),today.getUTCDate()); 
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




    $rootScope.push={selected_campaign:undefined}
    $scope.campaign_loading='false'
    $scope.stepslength=[{},{}];
    $scope.step0="Push Open".split('.').pop();
    // $scope.step1="com.net.pvr.ui.NowShowingNewActivity".split('.').pop();
    // $scope.step2="com.net.pvr.ui.MovieDetailsActivity".split('.').pop();
    // $scope.step3="com.net.pvr.ui.SelectSeatActivity".split('.').pop();
    // $scope.step4="com.net.pvr.ui.AddFNBActivity".split('.').pop();
    // $scope.step5="com.net.pvr.ui.PayNowActivity".split('.').pop();


    
    //$scope.noofsteps=[];
    
    
     
  var funnelobj={};
  $scope.getFunnelData=function(index){
    $("html, body").animate({ scrollTop: 0 }, "slow");
   if (index==undefined) {index=0};
   $scope.index=index;
      $('#selected_campaign').html($scope.campaignslist[index].src+'<i class="fa fa-angle-down">')
      JettyService.get('Funnel',$scope.campaignslist[index].ref).then(function(data) {
            if (data==undefined) {data={x:"[]"}};
            data=JSON.parse(data.x);
            if (data==undefined) {data=[]};
            funnelobj={};
            for (var i = 0; i < data.length; i++) {
              data[i].x=data[i].x.split('.').pop();
              funnelobj[data[i].x]=data[i].y;
            };
            data.sort(function(a,b) {return a.x.localeCompare(b.x)});
            $scope.EventScreenList=data;
            $scope.funnelstep=[];
            for (var i = 0; i < 5; i++) {
              $scope.funnelstep.push(" ");
            };
            $scope.showFunnel();
      });
}

  $scope.saveFunnel= function(option){
    var funnel= {};
    if (option=='saveasnew') {
      funnel.app_secret=$rootScope.app.app_secret;
      funnel.funnelname= $scope.newfunnelname;
      for (var i = 1; i < $scope.noofsteps.length; i++) {
        if ($scope['step'+i]==' ') {
          return;
        };
        funnel['step'+i]=$scope['step'+i]
      };
      // funnel.step1=$scope.step1;
      // funnel.step2=$scope.step2;
      // funnel.step3=$scope.step3;
      // funnel.step4=$scope.step4;
      // funnel.step5=$scope.step5;
       // if($scope.newfunnelname == null || $scope.newfunnelname=="" || funnel.step1==" " || funnel.step2==" " || funnel.step1==null || funnel.step1==null)
       //  {
       //      return;
       //  }
    }
    else{
      funnel.app_secret=$rootScope.app.app_secret;
      funnel.funnelname= $scope.funnelname;
      if($scope.funnelname == null || $scope.funnelname=="")
        {
            $("#error-msg").html("Please enter the Funnel Name");
            $("#Error").show();
            $("#Success").hide();
            return;
        }

      for (var i = 0; i < $scope.stepslength.length; i++) {
        if ($scope.funnelstep[i]==' ') {
           $("#error-msg").html("Please Select Step "+(i+1));
            $("#Error").show();
            $("#Success").hide();
            return;
        };
        funnel['step'+(i+1)]=$scope.funnelstep[i];
      };
      // funnel.step1=$scope.funnelstep[0];
      // funnel.step2=$scope.funnelstep[1];
      // funnel.step3=$scope.funnelstep[2];
      // funnel.step4=$scope.funnelstep[3];
      // funnel.step5=$scope.funnelstep[4];
       
        // if (funnel.step1==" " || funnel.step2==" " || funnel.step1==null || funnel.step1==null) {
        //     $("#error-msg").html("Choose at least 2 Steps");
        //     $("#Error").show();
        //     $("#Success").hide();
        //     return;
        // };
    }
   
   
    $http.post('/addfunnel', funnel).success(function(response) {
        if(response == "null")
        {
          response=[];
        }
        else
        {
          // $scope.adminapps = response;
          $("#success-msg2").html('Funnel created successfully');
          $("#Error2").hide();
          $("#Success2").show();
          setTimeout(function(){
            $("#Success2").fadeOut();
          },5000)

        }
        $scope.showCreateNewFunnel=false;
          $scope.showSaveAs='false'
      $scope.getFunnel();
      $scope.resetfunnelfields()
        // deferred.resolve();
      }).error(function(response) {
        $scope.error = response.message;
        // deferred.resolve();
      });
  }



  $scope.getFunnel= function(){
          var deferred = $q.defer();


    $http.post('/getfunnel', {app_secret:$rootScope.app.app_secret}).success(function(response) {
      $scope.showCreateNewFunnel=(response.length==0);
        if(response == "null")
        {
          response=[];

        }
        else
        {
          $scope.funnellist = response.reverse();
        }
        $scope.updateFunnelStep(0);
         deferred.resolve();
      }).error(function(response) {
        $scope.error = response.message;
        // deferred.resolve();
      });
      return deferred.promise;
  }




  $scope.deleteFunnel= function(){
    swal({   title: "Are you sure?", 
          text: "You want to delete the funnel",   
          type: "warning",   showCancelButton: true,  
           confirmButtonColor: "#DD6B55",  
            confirmButtonText: "Yes, delete it!",  
            allowOutsideClick: true,
            animation:false,
             closeOnConfirm: true }, 
             function(){  $http.post('/deletefunnel', {app_secret:$rootScope.app.app_secret, id: $scope.funnellist[$scope.currentFunnelindex].id}).success(function(response) {
       $scope.getFunnel();
            $("#success-msg2").html("Deleted Successfully");
            $("#Error2").hide();
            $("#Success2").show();
             setTimeout(function(){
                 $("#Success2").fadeOut();
              },5000)
      }).error(function(response) {
        $("#error-msg2").html("An Error occured");
            $("#Error2").show();
            $("#Success2").hide();
            setTimeout(function(){
                 $("#Error2").fadeOut();
              },5000)
        })
     });

  }


$scope.addstep=function(){
  if($scope.stepslength.length < 5)
// for( var i=0 ; i <$scope.stepslength[5] ; i++)
{   
  $scope.stepslength.push({})
  //$scope.$digest();
  if($scope.stepslength.length==5)
  {
    $("#add").hide();
  }
}

}

  $scope.deletestep=function(index){
     $scope.funnelstep.splice(index,1);
     $scope.funnelstep.push(" ");
  $scope.stepslength.pop()
   //$scope.$digest();

}

    $scope.showFunnel=function(){
      var screennames = [];
      for (var i = 0; i < $scope.noofsteps.length; i++) {
        screennames.push($scope['step'+i]);
      };
      var funnel_data=[];
        for (var i = 0; i < screennames.length; i++) {
          funnel_data.push({x:screennames[i],y:funnelobj[screennames[i]]});
        };
        var graph = bargraph(funnel_data,push_report_funnel_style);
        $scope.selectedCampaign=$scope.campaignslist[$scope.index].src;
       UtilitiesService.draw_chart(graph,'funnel.swf','ScreenFunnel','75%','400');
    }
    
    $scope.getcampaigns = function(){
            if ($scope.endGap==1) {$scope.endGap=-1000;$scope.noDays+=1001};
          if ($scope.endGap==0) {$scope.endGap=-1000;$scope.noDays+=1000};
      var deffered = $q.defer();
        JettyService.campaignstats($scope.endGap,$scope.noDays,$rootScope.app.app_secret).then(function(response) {
            $scope.table1loaded=true;

           if ( $scope.campaign_loading=='true') {
             $('#camp_table').fadeTo('fast', 0).fadeTo('fast', 1)
          };
          $scope.campaign_loading='false';
          if(response == "null" || response==undefined)
          {
            $scope.total_campaigns = 0;
            response=[];
          }
          else
          {
            $scope.campaignslist = response;
            $scope.total_campaigns = $scope.campaignslist.length;
          }
          var index=0;
          var currdate = new Date();
          currdate.setHours(0,0,0,0);
          for (var i = 0; i < $scope.campaignslist.length; i++) {
            if ($scope.campaignslist[i].PushReqTimestamp<currdate) {
              index=i;
              break;
            };
             
          };
          for (var i = 0; i < $scope.campaignslist.length; i++) {
              if (!parseInt($scope.campaignslist[i].PushReqTimestamp)) {
                  $scope.campaignslist[i].date="Multiple Dates"
                  $scope.campaignslist[i].csf='-'
              }
              else{
                  $scope.campaignslist[i].date=moment(Number($scope.campaignslist[i].PushReqTimestamp)).format('DD-MM-YYYY, HH:mm');
                  if ($scope.campaignslist[i].csf=='completed' && $scope.campaignslist[i].crt) {
                    $scope.campaignslist[i].status=$scope.campaignslist[i].csf
                    $scope.campaignslist[i].csf=' in '+convertToTime(($scope.campaignslist[i].crt/1000).toFixed(0))
                  }
                  else{
                    $scope.campaignslist[i].status=$scope.campaignslist[i].csf
                  }
              }
            };
          $scope.itemsPerPage = 10
          $scope.currentPage_tab1 = 1;
          $scope.maxSize_tab1 = 5;
          $scope.totalItems_tab1 = $scope.total_campaigns;
          $scope.$watch('currentPage_tab1 + itemsPerPage', function() {
              var begin = (($scope.currentPage_tab1 - 1) * $scope.itemsPerPage),
              end = begin + $scope.itemsPerPage;
              $scope.filteredcampaignslist =  $scope.campaignslist.slice(begin,end);
                
          });
//console.log($scope.campaignslist)
$scope.filteredcampaignslistCSV=[];
      
      for (var i = 0; i <  $scope.campaignslist.length; i++) {
                  $scope.filteredcampaignslistCSV.push({
                    a: $scope.campaignslist[i].src,
                    b: $scope.campaignslist[i].date,
                    c: $scope.campaignslist[i].cpc,
                    d: $scope.campaignslist[i].csc,
                    e: $scope.campaignslist[i].coc,
                    f: $scope.campaignslist[i].csf,
                    g: $scope.campaignslist[i].mt,


                  })
                }
                // for (var i = 0; i <  $scope.filteredcampaignslistCSV.length; i++) {
                //      delete $scope.filteredcampaignslistCSV[i].segment;
                //      delete $scope.filteredcampaignslistCSV[i].ref;
                //      delete $scope.filteredcampaignslistCSV[i].message;
                //      delete $scope.filteredcampaignslistCSV[i].ifc;
                //      delete $scope.filteredcampaignslistCSV[i].fc;
                //      delete $scope.filteredcampaignslistCSV[i].crt;
                //      delete $scope.filteredcampaignslistCSV[i].PushReqTimestamp;
                //      delete $scope.filteredcampaignslistCSV[i].ic;

                // };




          deffered.resolve(index);
        })
        return deffered.promise;
  };


      var convertToTime = function(seconds){
      //mm:ss
      return ("00"+(Math.floor((seconds)/60))).slice(-2)+":"+("00"+seconds%60).slice(-2);
      }


    //$scope.deleteFunnel();


    $scope.updateFunnelStep = function(index)
    {  
     $('#selected_funnel').html($scope.funnellist[index].funnelname+'<i class="fa fa-angle-down">')
    $scope.currentFunnelindex= index;
    $scope.noofsteps=[];
    $scope.noofsteps.push({});
        for (var i = 1; i < 6; i++) {
          if ($scope.funnellist[index]['step'+i]) {
             $scope['step'+i]=$scope.funnellist[index]['step'+i].split(".").pop();
             $scope.noofsteps.push({});
          }
          else{
            $scope['step'+i]=" ";
          }
        };
    $scope.showFunnel();

    }



    $scope.editFunnel = function()
    {
       var funnel= {};
       
    funnel.app_secret=$rootScope.app.app_secret;
    funnel.id=$scope.funnellist[$scope.currentFunnelindex].id ;
    funnel.funnelname= $scope.funnellist[$scope.currentFunnelindex].funnelname;
    for (var i = 1; i < $scope.noofsteps.length; i++) {
      funnel['step'+i] = $scope['step'+i];
    };
   

    $http.post('/editfunnel', funnel).success(function(response) {
        

      $scope.getFunnel();
            $("#success-msg2").html("Funnel Updated Successfully");
            $("#Error2").hide();
            $("#Success2").show();
            setTimeout(function(){
                 $("#Success2").fadeOut();
            },5000)
      }).error(function(response) {
        $scope.error = response.message;
      });

    }

    $scope.resetfunnelfields=function()
    {
      $scope.stepslength=[{},{}];
      $scope.funnelstep=[]
       for (var i = 0; i < 5; i++) {
            $scope.funnelstep.push(" ");
          };
        $scope.funnelname="";
            $("#Error").hide();
            $("#Success").hide();
        if ($scope.funnellist.length>0) {
          $scope.showCreateNewFunnel=false;
        };
    }

    $scope.initializepopover=function(){
      $('[data-toggle=\'popover\']').popover();
    }

     //$scope.getcampaigns().then($scope.getFunnelData);
     $scope.getFunnel();
        var run = function(){
         $scope.getcampaigns().then($scope.getFunnelData);
    }

    WatchDate();



  }]);
  

  