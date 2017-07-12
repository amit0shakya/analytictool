var adtracker = angular.module('Controllers')
adtracker.controller('AdTrackerCtrl',['$scope','$rootScope','$q','$http','JettyService','UtilitiesService','JSONService',function($scope,  $rootScope, $q, $http, JettyService, UtilitiesService, JSONService) {

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

    $scope.selectproperty = {
    selectAll       : "Select all",
    selectNone      : "Select none",
    reset           : "Undo all",
    search          : "Type here to search...",
    nothingSelected : "Select Properties"
}

    $scope.ShowEventPostback=false
  $scope.campaigninfo={};
	$scope.campaignlist=[];
    $scope.generateCampaign = function() {
      if ($scope.ShowCustomUrl) {
        for (var key in $scope.param) {
          if ($scope.param.hasOwnProperty(key)) {
            $scope.campaigninfo[key]=$scope.param[key] || undefined;
          }
        }
      };
        $scope.campaigninfo.dw=undefined;
        $scope.campaigninfo.dx=undefined;
        $scope.campaigninfo.event_prop=undefined;
          $scope.campaigninfo.o = $rootScope.app.app_secret;
          $scope.campaigninfo.ds = GenerateUniuqeCampaignId();
          if ( $scope.ShowEventPostback) {
            $scope.campaigninfo.dw=geturlstring();
            $scope.campaigninfo.dx=geteventstring();
            $scope.campaigninfo.event_prop=getpropstring();

          };
          // $scope.campaigninfo.dq = "https://play.google.com/store?hl=en&tab=n8&transaction_id={transaction_id}&campaign_id={campaign_id}"
          // $scope.campaigninfo.dr = "https://play.google.com/store?hl=en&tab=n8&transaction_id={transaction_id}&campaign_id={campaign_id}"
           $scope.addcampaignvalidation={};
           $scope.addcampaignvalidation.cnnil = !$scope.campaigninfo.do
           $scope.addcampaignvalidation.pnnil = !$scope.campaigninfo.dp
           //$scope.addcampaignvalidation.pburlnil = !$scope.campaigninfo.dq
           $scope.campaigninfo.dq=$scope.campaigninfo.dq || undefined;
           $scope.addcampaignvalidation.pburlinvalid= $scope.campaigninfo.dq
              && (($scope.campaigninfo.dq.indexOf("{transaction_id}")<0));
           $scope.validatePSURL();


          
           if ($scope.addcampaignvalidation.pburlnil || $scope.addcampaignvalidation.pburlinvalid || $scope.addcampaignvalidation.psurlnil || $scope.addcampaignvalidation.psurlinvalid) {
            return;
           };
           if ($scope.addcampaignvalidation.cnnil || $scope.addcampaignvalidation.pnnil) {
            return;
           };
          $http.post('/addTracker', $scope.campaigninfo).success(function(response) {
          //  swal("Congratulations!", response, "success")
          
          $scope.CampaignSuccess=true;
           $scope.qr_reader=response.split("Campaign Created SucessFully and Click url is:- ")[1];
           if (!$scope.qr_reader) {
             $("#addCampaignSuccessfull_msg").html(response)
           };
            
            $("#addCampaignSuccessfull").fadeIn();
            listCampaign();
            $scope.listCampaignStats();
            console.log(response);
          }).error(function(response) {
            $("#addCampaignFailed").fadeIn();
            console.log(response);
          });
    };


      var listCampaign = function() {

          $http.post('/listTracker', {o:$rootScope.app.app_secret,endGap:$scope.endGap,noDays:$scope.noDays}).success(function(response) {
              $scope.table2loaded=true;
              $scope.campaignlist=response;
              $scope.Campaignlistlen=$scope.campaignlist.length;
              $scope.listIsEmpty=$scope.Campaignlistlen==0;
              console.log(response)


          $scope.itemsPerPage5 = 5
          $scope.currentPage_tab2 = 1;
          $scope.maxSize_tab2 = 5;
          $scope.totalItems_tab2 = $scope.Campaignlistlen
          $scope.$watch('currentPage_tab2 + itemsPerPage5', function() {
              var begin = (($scope.currentPage_tab2 - 1) * $scope.itemsPerPage5),
              end = begin + $scope.itemsPerPage5;
              $scope.filteredcampaignslist =  $scope.campaignlist.slice(begin, end);
                            console.log(4)
      });
      

          }).error(function(response) {
            console.log(response)
          });
      };

      $scope.listCampaignStats = function() {
          $http.post('/listTrackerStats', {o:$rootScope.app.app_secret,endGap:$scope.endGap,noDays:$scope.noDays}).success(function(response) {
               $scope.table1loaded=true;
 
              $scope.campaign_loading='false'
              for (var i = 0; i < response.length; i++) {
                if (response[i].dt==0) {
                  response[i].rate=null;
                }
                else{
                  response[i].rate=(response[i].du/response[i].dt*100).toFixed(1)+' %'
                }
              };
              $scope.campaignliststats=response.reverse();

              $scope.itemsPerPage = 10
          $scope.currentPage_tab1 = 1;
          $scope.maxSize_tab1 = 5;
          $scope.totalItems_tab1 = $scope.campaignliststats.length;
          $scope.$watch('currentPage_tab1 + itemsPerPage', function() {
              var begin = (($scope.currentPage_tab1 - 1) * $scope.itemsPerPage),
              end = begin + $scope.itemsPerPage;
              $scope.filteredcampaignsliststats =  $scope.campaignliststats.slice(begin, end);
              
                            
      });
      

          }).error(function(response) {
          });
      };

      // var editCampaign = function() {
      //   $http.post('/editcampaign', {o:$rootScope.app.app_secret}).success(function(response) {
      //       console.log(response)
      //   }).error(function(response) {
      //     $scope.error = response.message;
      //   });
      // };

      $scope.deleteCampaign = function(app,campaign_id,index) {
        swal({   title: "Are you sure?", 
          text: "You will not be able to revert this operation",   
          type: "warning",   showCancelButton: true,  
           confirmButtonColor: "#DD6B55",  
            confirmButtonText: "Yes, delete it!",  
            allowOutsideClick: true,
            animation:false,
             closeOnConfirm: true }, 
             function(){    $http.post('/deleteTracker', {o:app,ds:campaign_id}).success(function(response) {
              $scope.Campaignlistlen--;
              $scope.listIsEmpty=$scope.Campaignlistlen==0;
            $("#listitem"+index).fadeOut()(3000);
              console.log(response)
          }).error(function(response) {
            console.log(response)
          }); });
         
      };

      var GenerateUniuqeCampaignId = function(){
        var id = UtilitiesService.generateUUID();
         for (var i = 0; i < $scope.campaignlist.length; i++) {
                if ( $scope.campaignlist[i].ds==id) {
                  return GenerateUniuqeCampaignId();
                };
              };
          return id;
      }

      $scope.validatePSURL=function(){
                $scope.addcampaignvalidation.psurlnil = !$scope.campaigninfo.dr
                 if ($rootScope.app.ostype=='Android') {
                   $scope.addcampaignvalidation.psurlinvalid= $scope.campaigninfo.dr
                    && (($scope.campaigninfo.dr.indexOf("play.google.com")<0) || ($scope.campaigninfo.dr.indexOf("{")>0));
                 }else if ($rootScope.app.ostype=='iOS'){
                   $scope.addcampaignvalidation.psurlinvalid= $scope.campaigninfo.dr
                    && (($scope.campaigninfo.dr.indexOf("itunes.apple")<0) || ($scope.campaigninfo.dr.indexOf("{")>0));
                 }
      }

      // $scope.validateeventURLs=function(url){
      //   return url && url.indexOf("{transaction_id}")<0;
      // }

      $scope.submitURL = function(){
        console.log($scope.campaigninfo.dr)
        $scope.addcampaignvalidation={};
        $scope.validatePSURL();
           if ( $scope.addcampaignvalidation.psurlnil || $scope.addcampaignvalidation.psurlinvalid) {
            return;
           };
           // document.getElementById("gurlform").style.display= "none";
           // document.getElementById("showcminfo").style.display= "block";
          // console.log('e')

        $http.post('/addstoreurl', {app_secret:$rootScope.app.app_secret, url:$scope.campaigninfo.dr}).success(function(response) {
          console.log('rwgr')
              $scope.appurl.showeditor=false
              console.log($scope.appurl)
              // $scope.campaignlist=response;
              // $scope.Campaignlistlen=$scope.campaignlist.length;
              // $scope.listIsEmpty=$scope.Campaignlistlen==0;
              // console.log(response)
          }).error(function(response) {
            // console.log(response)
          });
        
      }

      $scope.getURL = function(){
        $http.post('/getstoreurl', {app_secret:$rootScope.app.app_secret}).success(function(response) {
          console.log(response)
          $scope.campaigninfo.dr=response.url;
          if ($scope.campaigninfo.dr) {
            $scope.appurl={showeditor:false}
          // document.getElementById("gurlform").style.display= "none";
          // document.getElementById("showcminfo").style.display= "block";
          }
          else{
            $scope.appurl={showeditor:true}
            // document.getElementById("gurlform").style.display= "inline-block";
            // document.getElementById("showcminfo").style.display= "none";
          }
          // $('#urlform').css("display", "none");  
          // $('#haveurlform').css("display", "block");  
          }).error(function(response) {
            $scope.appurl={showeditor:true}
            // document.getElementById("gurlform").style.display= "inline-block";
            // document.getElementById("showcminfo").style.display= "none";
            console.log(response)
          });
      }

      $scope.eventarray=[{}];

      $scope.addevent = function(){
       $scope.eventarray.push({url:($scope.eventarray[0] || {})['url']});
      }

       $scope.deleteevent = function(index){
       $scope.eventarray.splice(index,1);
      }

      var geteventstring = function(){
        var string='';
        for (var i = 0; i < $scope.eventarray.length; i++) {
          if (i!=0) {string+='___'};
          string+=$scope.eventarray[i].event || '';
        };
        console.log(string)
        return string || undefined;
      }

      var getpropstring = function(){
        var string='';
        for (var i = 0; i < $scope.eventarray.length; i++) {
          if (i!=0) {string+='___'};
          if ($scope.eventarray[i]['prop'].length==0) {
            string+='rqNOevent';
          };
          for (var j = 0; j < $scope.eventarray[i]['prop'].length; j++) {
            if (j!=0) {string+='_evprop_'};
            string+=$scope.eventarray[i]['prop'][j].x;
          };
        };
        console.log(string)
        return string || undefined;
      }

      var geturlstring = function(){
       var string='';
        for (var i = 0; i < $scope.eventarray.length; i++) {
          if($scope.eventarray[i].url==undefined || $scope.eventarray[i].url=='') continue;
          if (i!=0) {string+='_rqurl_'};
          string+=$scope.eventarray[i].url || '';
        };
        console.log(string)

        return string || undefined;
      }

       var getEventsName = function() {
            $scope.itemsPerPage1 = 10
            $scope.currentPage_tab1 = 1;
            $scope.maxSize_tab1 = 5;
            var deferred = $q.defer();
            JettyService.cummulative("ENameCount",app,0,100,3,"long",timeZone).then(function(data) {
                data.sort(function(a,b) {return b.y-a.y});
                $scope.EventsNameList=data;
                // $scope.filteredEventsNameList=$scope.EventsNameList
                deferred.resolve();
            });
            return deferred.promise;
        };

        $scope.getOtherParamEventsName = function(ename,index) {
            $scope.itemsPerPage2 = 10
            $scope.currentPage_tab2 = 1;
            $scope.maxSize_tab2 = 5;
            $scope.propquery=''
            $scope.EventsOtherParamName=[];
            
            var deferred = $q.defer();
            if (ename==undefined) {ename=$scope.filteredEventsNameList[0].x};
             $scope.selectedEvent=ename;
            JettyService.keycummulativestring("ENameOtherparam",app,ename,0,100,2,"string",timeZone).then(function(data) {
                try
                {
                    var data = JSON.parse(data.x);
                    data.sort(function(a,b) {return a.x.localeCompare(b.x)});
                    console.log(data)
                    $scope.eventarray[index]['proplist']=data;
                    deferred.resolve();
                }
                catch(err)
                {
                    deferred.resolve();
                }
                
                    
                
            });

            return deferred.promise;
        };

        

      


      $(document).ready(function(){

                        $("#hidecminfo").click(function(){
                           document.getElementById("gurlform").style.display= "none";
                           document.getElementById("showcminfo").style.display= "block";
                           $scope.getURL();
                       });
                       
                         $("#showcminfo").click(function(){
                           document.getElementById("gurlform").style.display= "inline-block";
                           document.getElementById("showcminfo").style.display= "none";
                       });

                         $("#showcmform1").click(function(){
                          $("#cmform").fadeIn("slow");
                          document.getElementById("cm-list").style.display= "none";
                      });
                          $("#showcmform2").click(function(){
                          $("#cmform").fadeIn("slow");
                          document.getElementById("cm-list").style.display= "none";
                      });
                         $("#showcmlist").click(function(){
                           $("#cm-list").fadeIn("slow");
                           document.getElementById("cmform").style.display= "none";
                       });
					   
					   $("#showcmlistback").click(function(){
                           $("#cm-list").fadeIn("slow");
                           document.getElementById("cmform").style.display= "none";
                       });


                     });



        
      $scope.getURL();

       var run = function(){
          listCampaign();
          getEventsName();
          $scope.listCampaignStats();
       }


       WatchDate();

}]);