  var pushsend = angular.module('Controllers')
  pushsend.controller('PushSendCtrl',['$scope','$rootScope','$q','$http','JettyService','UtilitiesService','JSONService',function($scope, $rootScope, $q, $http, JettyService, UtilitiesService, JSONService) {


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

  var app = $rootScope.app.app_secret;
  var timeZone = "IST";
  $rootScope.segmentation={show_segmentation:false}
  $rootScope.push={selected_campaign:undefined}
  $scope.campaigndata = {};
  $scope.campaigndata.landing = "Application";
  $scope.prefs={};
  $scope.prefs.sheduleTime = 'Now';
  $scope.prefs.Target = 'All';
  $scope.targetkey = 'all';
  $scope.campaign_loading='false'
  $scope.push_in_progress='false'
    $scope.steps = [
      
      'Step 1: Push Message',
      
      'Step 2: Group Selection'
    ];
    $scope.selection = $scope.steps[0];
    $scope.addcampaign_success = 0;
    $scope.flag = false;

  $scope.ShowPushType=true
    
    

    var campaignslist = [];

    $scope.init = function(){

      $scope.campaigndata = {};
      $scope.campaigndata.landing = "Application";
      $scope.campaigndata.rq_id="single";
      $scope.selection = $scope.steps[0];
      //$scope.iamselection = 1
      $scope.addcampaign_success = 0;
      $scope.flag = false;
      $scope.goToStep(0);
      $scope.keyValue=[{}];
      // $("div#image-preview").html('');
      // $("div.preview-msg").removeClass("previw-msg-pos")
      //$scope.image="";
      $scope.addimage_ischecked=false;
      $scope.addparam_ischecked=false;
      $scope.prefs.sheduleTime = 'Now';
      $scope.prefs.Target = 'All';
      $scope.targetkey = 'all';
      $scope.prefs.msg_type_selected=1;
      $scope.showimage=true
    $scope.showbutton=true
    $scope.showtext=true
    $scope.showpreview=false
    $scope.heading=''
    $scope.line1=''
    $scope.iamimageurl=''
    $scope.buttontext=''
    
    
    $scope.prefs.autoclose='no'
    $scope.prefs.buttonaction='rq_close'
    //$scope.buttontext='Close'
    $scope.prefs.expire='no'
    $scope.timedelay=0;
    $scope.prefs.imageurltype='url'
    $scope.prefs.iamimageurltype='url'
    $scope.iamurl=''
    $scope.activityname='';
      if ($scope.PushType=='In App Campaign') {
        $scope.iamselection = 2
        $scope.showpreviewtype='iam';
        $('#androidnotification').removeClass('android-notification ios-notification');
      }
      else{
        $scope.iamselection = 1
        $scope.showpreviewtype='notification';
        if ($rootScope.app.ostype=='Android') {
          $('#androidnotification').addClass('android-notification');
        }
        else{
          $('#androidnotification').addClass('ios-notification');
        }
      }
      //getsegments();
    }

var upload = function(){
  var _file;
  var n;
    if(document.getElementById("_file0") && document.getElementById("_file0").files.length >0){
       _file = document.getElementById("_file0");
       n=0;
    }
    else if(document.getElementById("_file1") && document.getElementById("_file1").files.length >0){
        _file = document.getElementById("_file1");
        n=1;
    }
    else if(document.getElementById("_file2") && document.getElementById("_file2").files.length >0){
        _file = document.getElementById("_file2");
        n=2;
    }
    else{
      return
    }
    $('#upload_error'+n).hide();
    $('#upload_success'+n).hide();
    if(_file.files[0].size > 100*1024){
      $('#error-message'+n).html("File size should be less than 100 KB")
      $('#upload_error'+n).show();
        return;
    }
    if(_file.files[0].type != "image/png" && _file.files[0].type != "image/jpeg"){
      $('#error-message'+n).html("File should be a jpg or png image")
      $('#upload_error'+n).show();
        return;
    }
    
    var filedata = new FormData();
    filedata.append('app_secret',$rootScope.app.app_secret);
    filedata.append('type','save');
    filedata.append('image', _file.files[0]);
    
    var request = new XMLHttpRequest();

    request.onreadystatechange=function()
  {
     // console.log(request.responseText);
      // console.log(request.response);
     
       if (request.readyState==1){
          $('#uploading_image'+n).show();
       }
  if (request.readyState==4)
    {
       if (request.status==200) {
         $('#success-message'+n).html("Image uploaded successfully")
         $('#upload_error'+n).hide();
         $('#upload_success'+n).show();
         $('#uploading_image'+n).hide();
         getPushImages($rootScope.app.app_secret,0,50,true);
         console.log(request.responseText);
       }
       else{
        var error;
        try{
          if (request.responseText=="") {
            error="Unable to connect to Server"
          }
          else{
            error= JSON.parse(request.responseText).Error
          }
            console.log(request.responseText);
        }
        catch(err)
        {
          error="Internal Server Error";
          console.log(request);
        }
        $('#error-message'+n).html(error)
        $('#upload_success'+n).hide();
        $('#upload_error'+n).show();
        $('#uploading_image'+n).hide();
        
       }
     
    }
  }
    request.open('POST', '//img.rocq.io/image');
    request.send(filedata);

}


var createJSON = function(){
  var json = {};
  for (var i = 0; i < $scope.keyValue.length-1; i++) {
    if ($scope.keyValue[i].key!="" && $scope.keyValue[i].val!="") {
      var key = $scope.keyValue[i].key;
      json[key+'']=$scope.keyValue[i].val;
    };
  };
  return json;
}

var decreateJSON = function(json){
  $scope.keyValue=[];
  for(var key in json)
  {
    $scope.keyValue.push({key:key,val:json[key]})
  }
  $scope.keyValue.push({})
  // var json = {};
  // for (var i = 0; i < $scope.keyValue.length-1; i++) {
  //   if ($scope.keyValue[i].key!="" && $scope.keyValue[i].val!="") {
  //     var key = $scope.keyValue[i].key;
  //     json[key+'']=$scope.keyValue[i].val;
  //   };
  // };
  // return json;
}

$scope.selectImage=function()
{     //)$("img").click(
    $("div.form-group").undelegate();
    $("div.form-group").delegate("img","click",function(){

    var alreadyselected=false;
    if ($(this).closest("div.selected").length==1) {
      alreadyselected=true;
    };
    $(".imageSelector").removeClass("selected");
    if (alreadyselected) {
      $(this).closest("div").removeClass("selected");
      // $("div#image-preview").html('');
      $scope.$apply(function() {
          $scope.campaigndata.ImageUrl='';
      });
      // $("div.preview-msg").removeClass("previw-msg-pos")
      //$scope.image.image="";
    }
    else{
      $(this).closest("div").addClass("selected");
      var that = this;
      $scope.$apply(function() {
         $scope.campaigndata.ImageUrl=$(that).attr("src");
      });
      // $("div#image-preview").html('<img  src="'+$(this).attr("src")+'"/></div>');
      // $("div.preview-msg").addClass("previw-msg-pos")
       //$scope.image=$(this).attr("src");
    }
        
    });
}

$scope.iamselectImage=function()
{     //)$("img").click(
    $("#iamimageGallery").undelegate();
    $("#iamimageGallery").delegate("img","click",function(){

    var alreadyselected=false;
    if ($(this).closest("div.selected").length==1) {
      alreadyselected=true;
    };
    $(".imageSelector").removeClass("selected");
    if (alreadyselected) {
      $(this).closest("div").removeClass("selected");
      // $("div#image-preview").html('');
      $scope.$apply(function() {
          $scope.iamimageurl='';
      });
      // $("div.preview-msg").removeClass("previw-msg-pos")
      //$scope.image.image="";
    }
    else{
      $(this).closest("div").addClass("selected");
      var that = this;
      $scope.$apply(function() {
         $scope.iamimageurl=$(that).attr("src");
      });
      // $("div#image-preview").html('<img  src="'+$(this).attr("src")+'"/></div>');
      // $("div.preview-msg").addClass("previw-msg-pos")
       //$scope.image=$(this).attr("src");
    }
        
    });
}

$scope.haveimages = function(){
  if ($scope.imageArray!=null) {
    return $scope.imageArray.length>0;
  }
  return false;
    
}


$scope.deletekeyvalue = function(index){
  if ($scope.keyValue.length==1) {return};
  for (var i = index; i < $scope.keyValue.length-1; i++) {
    $scope.keyValue[i].key= $scope.keyValue[i+1].key;
    $scope.keyValue[i].val= $scope.keyValue[i+1].val;
    if ($scope.keyValue[i].key=="") {
      $("[id=keyerr0"+i+"]").show()
    }
    else{
      $("[id=keyerr0"+i+"]").hide()
    }
    if ($scope.keyValue[i].val=="") {
      $("[id=keyerr1"+i+"]").show()
    }
    else{
      $("[id=keyerr1"+i+"]").hide()
    }
  };
  $scope.keyValue.pop();
}

$scope.addimage = function(){
  $scope.addimage_ischecked = !$scope.addimage_ischecked;
  if ($scope.addimage_ischecked==false) {
    $(".imageSelector").removeClass("selected");
    // $("div#image-preview").html('');
    //   $("div.preview-msg").removeClass("previw-msg-pos")
    $scope.campaigndata.ImageUrl='';
     
  };
   $('#upload_error0').hide();
    $('#upload_success0').hide();

    $('#upload_error1').hide();
    $('#upload_success1').hide();

    $('#upload_error2').hide();
    $('#upload_success2').hide();
  

  $('[id^=_file]').off('change');
  $('[id^=_file]').on('change', function() {
      upload();
      // console.log( $(this).val() )
    });
}

var refreshJquery=function(){
  $("input[type=text][name^=key],input[type=text][name^=value]").off("keyup");
  $("input[type=text][name^=key],input[type=text][name^=value]").keyup(function(){
    var key = $(this).attr("name").slice(3);
        var type=key.charAt(0);
        var index=key.slice(1);
        // console.log($(this).val());
        if ($(this).val()=="") {
          $("[id=keyerr"+type+index+"]").show()
        }
        else{
          $("[id=keyerr"+type+index+"]").hide()
        }
        // console.log($(this).attr("name").slice(-1))
      // console.log($("input[type=text][name^=key"+$(this).attr("name").slice(-1)+"]").val())
      // console.log($("input[type=text][name^=value"+$(this).attr("name").slice(-1)+"]").val())
      var flag = true;
      for (var i = 0; i < $scope.keyValue.length; i++) {
        
            if ($("input[type=text][name^=key0"+i+"]").val()=="" || $("input[type=text][name^=key1"+i+"]").val()=="") {
            flag=false;
            }
        };
        if (flag==true) {
          $scope.keyValue.push({});
          $scope.$digest();
          refreshJquery();
        // console.log( $scope.kvlength.length)
      };
      });
}


  $scope.keyValue=[{}];
  $scope.eventlisterners = function()
  {
      $scope.addparam_ischecked = !$scope.addparam_ischecked;
      refreshJquery();

     
  }

    $scope.getCurrentStepIndex = function(){
      // Get the index of the current step given selection
      return _.indexOf($scope.steps, $scope.selection);
    };

    // Go to a defined step index
    $scope.goToStep = function(index) {
      if ( !_.isUndefined($scope.steps[index]) )
      {
        $scope.selection = $scope.steps[index];
      }
    };

    $scope.hasNextStep = function(){
      var stepIndex = $scope.getCurrentStepIndex();
      var nextStep = stepIndex + 1;
      // Return true if there is a next step, false if not
      return !_.isUndefined($scope.steps[nextStep]);
    };

    $scope.hasPreviousStep = function(){
      var stepIndex = $scope.getCurrentStepIndex();
      var previousStep = stepIndex - 1;
      // Return true if there is a next step, false if not
      return !_.isUndefined($scope.steps[previousStep]);
    };

    $scope.incrementStep = function() {
      if ( $scope.hasNextStep() )
      {
        var stepIndex = $scope.getCurrentStepIndex();
        var nextStep = stepIndex + 1;
        if (validationCheck(nextStep)) {
          $("html, body").animate({ scrollTop: 0 }, 600);
          $scope.selection = $scope.steps[nextStep];
        }
        else{
          console.log('validation error')
        }
      }
    };

    $scope.decrementStep = function() {
      if ( $scope.hasPreviousStep() )
      {
        $("html, body").animate({ scrollTop: 0 }, 600);
        var stepIndex = $scope.getCurrentStepIndex();
        var previousStep = stepIndex - 1;
        $scope.selection = $scope.steps[previousStep];
      }
    };

    var validationCheck = function(step){
      if (step==1) {
          if($scope.campaigndata.campaignname == undefined || $scope.campaigndata.campaignname=="")
          {
            shakeeffect($('#campaignname'))
            return false;
          }
           if($scope.campaigndata.message == undefined || $scope.campaigndata.message=="")
          {
            shakeeffect($('#message'))
            return false;
          }
          if($scope.campaigndata.ImageUrl)
          {
           var urlregex = /((?:https?\:\/\/|www\.)(?:[-a-z0-9]+\.)*[-a-z0-9]+.*)/i  ;
            if (!urlregex.test($scope.campaigndata.ImageUrl)) {
              shakeeffect($('#imageurl'))
              return false;
            };
          }
           if ($scope.campaigndata.landing!='Application'  && !$scope.campaigndata.url) {
              shakeeffect($('#urlbox'))
              return false;
            };
      }
     
      
       
      return true;

    }

    var shakeeffect = function(elem){
            elem.blur()
            setTimeout(function(){elem.focus()},100);
            setTimeout(function(){elem.blur()},200);
            setTimeout(function(){elem.focus()},300);
    }


// var savecampaign = function() {
//         var deferred = $q.defer();
//         delete $scope.campaigndata['title']
//         $scope.campaigndata.username = $rootScope.user.username;
//         $scope.campaigndata.created_on = new Date();
//         $scope.campaigndata.app_secret = $rootScope.app.app_secret;
//         // console.log($scope.campaigndata)
//         $http.post('/addcampaign', $scope.campaigndata).success(function(response) {
//           $scope.addcampaign_success = 1;
//           deferred.resolve();
//         }).error(function(response) {
//           $scope.error = response.message;
//           deferred.resolve();
//         });
//         return deferred.promise;
//       };

  var validate_campaignkey = function(){
        var deferred = $q.defer();
        campaignkey = UtilitiesService.generateUUID();
        $http.post('/checkcampaignkey', {campaignkey : campaignkey}).success(function(response){
            if(response.available)
            {
              deferred.resolve(campaignkey);
            }
            else
            {
              validate_campaignkeyt();
            }
        })
        return deferred.promise;
      };

  $scope.launchcampaign = function(){
    
    $scope.flag = true;

    if($scope.campaigndata.campaignname == undefined || $scope.campaigndata.campaignname=="")
    {
      $scope.flag = false;
      $scope.goToStep(0);
      if ($scope.PushType=='In App Campaign') {
         $scope.iamselection=2
      }
      else{
        $scope.iamselection=1
      }
      
    }
    else if($scope.PushType!='In App Campaign' && ($scope.campaigndata.message == undefined || $scope.campaigndata.message==""))
    {
      
          $scope.flag = false;
          $scope.goToStep(0);
          $scope.iamselection=1
     
     
    }
    else if($scope.PushType!='In App Campaign' && ($scope.campaigndata.landing == undefined ||($scope.campaigndata.landing != 'Application' && $scope.campaigndata.url == undefined)  ))
    {
      
          $scope.flag = false;
          $scope.goToStep(0);
          $scope.iamselection=1
       
    }
    // else if($scope.campaigndata.segment == undefined)
    // {
    //   $scope.flag = false;
    //   $scope.goToStep(3);
    // }
    else
    {
    //$scope.campaigndata.segment = $scope.campaigndata.segment.domainname;
    var campdata = jQuery.extend({}, $scope.campaigndata);  // cloning the object
    if ($scope.addimage_ischecked && $scope.prefs.imageurltype=='gallery' && $scope.campaigndata.ImageUrl) {
      var im = $scope.campaigndata.ImageUrl;
      im=im.split("fileName=")[1]
      im=im.split("&")[0]
      campdata.image = im;
    };
    if ($scope.addparam_ischecked) {
      campdata.keyValuepairs=createJSON();
    };
    campdata.app=$rootScope.app.app_secret;
    campdata.os=$rootScope.app.ostype;
    if(campdata.landing == 'Application')
    {
      campdata.url = undefined;
    }
    campdata.button_action_radio=$scope.campaigndata.iamlanding



    if ($scope.prefs.sheduleTime=='Later') {

       //campdata.timestamp = +new Date($('#datepicker').data("DateTimePicker").date().d);
       var sec = $('#datepicker').data("DateTimePicker").date().unix();
       sec=sec-sec%60;
       campdata.timestamp=sec*1000;
    };
    if ($scope.prefs.Target=='All') {
      campdata.segment="all";
    }
    else if ($scope.prefs.Target=='Location') {
      campdata.segment="CitySegment___"+$scope.targetkey;
    }
    else if ($scope.prefs.Target=='Event') {
      campdata.segment="EventSegment___"+$scope.targetkey;
    }
    else if ($scope.prefs.Target=='Dynamic') {
      campdata.segmentId=$scope.targetkey;
    }
    else if ($scope.prefs.Target=='Session') {
      var index=0;
      for (var i = 0; i < $scope.sessions.length; i++) {
        if ($scope.sessions[i].x==$scope.targetkey) {
          index=i;
          break;
          }
      }
      campdata.segment="SessionSegment___"+index;
    }
     else if ($scope.prefs.Target=='Custom') {
      for (var i = 0; i < $scope.segments.length; i++) {
        if ($scope.segments[i].segmentname==$scope.targetkey) {
          campdata.segment=$scope.segments[i].domainname+"___";
          break;
        };
      };
    }

    if ($scope.prefs.imageurltype=='gallery') {
      campdata.ImageUrl=""
    };

     

    if ($scope.PushType=='In App Message' || $scope.PushType=='In App Campaign') {



      
        if ($scope.showtext)
         {
          campdata.rq_in_msg=$scope.line1;
          campdata.rq_in_title=$scope.heading;
         }
        if ($scope.showimage)
        {
          campdata.rq_in_img=$scope.iamimageurl;
          if ($scope.prefs.iamimageurltype=='gallery') {
            var im = $scope.iamimageurl;
            im=im.split("fileName=")[1]
            im=im.split("&")[0]
            campdata.rq_in_img = im;
          }
          

        }
        if ($scope.showbutton)
        {
          campdata.rq_btn_text=$scope.buttontext;
          campdata.rq_btn_action=$scope.prefs.buttonaction||'rq_close';
        }

         if(campdata.iamlanding != 'Application')
          {
            campdata.iamurl = $scope.iamurl;
          }

        if ($scope.prefs.expire=='yes') {
        campdata.rq_expire=+new Date($scope.expiredays);
        };



        campdata.rq_msgtype='rq_in';

        if ($scope.PushType=='In App Campaign') {
        campdata.rq_msgtype='rq_in_c';
        campdata.rq_in_td=$scope.timedelay;
        campdata.rq_in_pg=$scope.activityname;
        campdata.message="";
        campdata.title="";
        campdata.rq_param="";
        campdata.ciu="";
        campdata.url="";
        };
        
        if ($scope.prefs.autoclose=='yes') {
          campdata.rq_msgtype+='_ac'
        };
    };

   
    
   
    var promise = validate_campaignkey();
    promise.then(function(data){
      campdata.campaignkey = data;
      $scope.campaigndata.campaignkey=data
      JettyService.pushlaunch(campdata)
      .then(function(response){
          if (response==undefined || response=="") {
            $(".sendpush_error").html("Error");
            $scope.addcampaign_success = 2;
          }
          else if(response.Error == null)
          {

            //savecampaign().finally($scope.getcampaigns);
            $scope.getcampaigns()
            $scope.addcampaign_success = 1;
            $scope.push_in_progress='false';
            $scope.campaigndata = {};
          }
          else
          {
            $(".sendpush_error").html(response.Error);
            $scope.addcampaign_success = 2;
          }
      });

      // $http.post('/pushlaunch', campdata).success(function(response) {
      //     console.log(response)
      //     $scope.addcampaign_success = 1;
      //   }).error(function(response) {
      //     console.log(response)
      //   });



    })
  }
  };


$scope.getsessions = function(){
    
       // console.log($scope.targetkey)
      $scope.sessions=[{x:"1 session"},{x:"1-10 sessions"},{x:"10-50 sessions"},{x:"50-100 sessions"},{x:"100+ sessions"}]
      $scope.TargetKeyList=$scope.sessions;
      $scope.targetkey=$scope.TargetKeyList[0].x;
      // console.log($scope)
     
   
  }

  $scope.getlocations = function(){
    var deferred = $q.defer();
    if ($scope.locations!=undefined) {
       // console.log($scope.targetkey)
      $scope.TargetKeyList=$scope.locations;
      $scope.targetkey=$scope.TargetKeyList[0].x;
      // console.log($scope)
      deferred.resolve();
      return deferred.promise;
    };

    JettyService.cummulative('NUCity',app,1,100,3,"long",timeZone).then(function(data) {
            var topcities=data.sort(function(a,b) {return b.y-a.y}).slice(0,10);
        //    topcities=topcities.slice(0,10)
            for (var i = 0; i < topcities.length; i++) {
              topcities[i].z="Top Cities"
            };
            var allcities=data.slice(10,data.length).sort(function(a,b) {return a.x.localeCompare(b.x)});
           // allcities=allcities.slice(0,10)
             for (var i = 0; i < allcities.length; i++) {
              if (topcities.indexOf(allcities[i].x)) {};
              allcities[i].z="All Cities"
            };
            // console.log(topcities)
            // console.log(allcities)
            $scope.locations = topcities.concat(allcities);
            $scope.TargetKeyList=$scope.locations;
            $scope.targetkey=$scope.TargetKeyList[0].x;
            deferred.resolve();
        });
    return deferred.promise;
  };

  $scope.getevents = function(){
    var deferred = $q.defer();
    if ($scope.events!=undefined) {
      $scope.TargetKeyList=$scope.events;
      $scope.targetkey=$scope.TargetKeyList[0].x;
      deferred.resolve();
      return deferred.promise;
    };
   JettyService.cummulative("ENameCount",app,1,100,3,"long",timeZone).then(function(data) {
                data.sort(function(a,b) {return b.y-a.y});
                $scope.events=data;
                $scope.TargetKeyList=$scope.events;
                $scope.targetkey=$scope.TargetKeyList[0].x;
                 deferred.resolve();
            });
   return deferred.promise;
  };


  $scope.getsegments = function(){
    var deferred = $q.defer();
    if ($scope.segments!=undefined) {
      $scope.TargetKeyList=$scope.segments;
      $scope.targetkey=$scope.TargetKeyList[0].x;
      deferred.resolve();
      return deferred.promise;
    };
        $http.post('/getsegments', {'app_secret' :$rootScope.app.app_secret}).success(function(response) {
            if(response == "null"){response=[]}
            for (var i = 0; i < response.length; i++) {
              response[i].x=response[i].segmentname;
            };
            $scope.segments = response;
            $scope.TargetKeyList=$scope.segments;
            $scope.targetkey=$scope.TargetKeyList[0].x;
            $scope.campaigndata.segment = $scope.segments[0];
            deferred.resolve();
        }).error(function(response) {
          $scope.error = response.message;
        });
        return deferred.promise;
  };

  $scope.getdynamicsegment= function(){
    var deferred = $q.defer();
    //       if ($scope.dsegments!=undefined) {
    //   $scope.TargetKeyList=$scope.dsegments;
    //   $scope.targetkey=$scope.TargetKeyList[0].x;
    //   return
    // };
    $http.post('/getpushsegments', {app_secret:$rootScope.app.app_secret}).success(function(response) {
      //$scope.showCreateNewSegment=(response.length==0);
      console.log(response)
       
        if(response == "null"){response=[]}
            for (var i = 0; i < response.length; i++) {
              response[i].x=response[i].segmentname;
              response[i].y=response[i].campaign_id;
            };

            $scope.dsegments = response;
            $scope.TargetKeyList=$scope.dsegments;

            if ($rootScope.targetdynamicsegment) {
              $scope.targetkey=$rootScope.targetdynamicsegment;
              $rootScope.targetdynamicsegment=undefined;
            }
            else{
              $scope.targetkey=$scope.TargetKeyList[0].y;
            }
            
            deferred.resolve();
            //$scope.campaigndata.segment = $scope.segments[0];
        // else
        // {
        //   $scope.segmentlist = response;
        //   $scope.segmentlist.push({"segmentname":"All"})
        //   $scope.segmentlist.push({"segmentname":"+New"})
        // }
      }).error(function(response) {
        $scope.error = response.message;
      });
      return deferred.promise;
  }

  $scope.table={}
  $scope.table.table1loaded=false;
   $scope.getcampaigns = function() {
     $scope.table.table1loaded=false;

     if($rootScope.app.app_secret=="91c556949f"){
      $scope.showthis=true;
     }else{
      $scope.showthis=false;
     }
     
     $scope.filteredcampaignslist=[];
          if ($scope.endGap==1) {$scope.endGap=-1000;$scope.noDays+=1001};
          if ($scope.endGap==0) {$scope.endGap=-1000;$scope.noDays+=1000};
        JettyService.campaignstats($scope.endGap,$scope.noDays,$rootScope.app.app_secret,$rootScope.push.selected_campaign).then(function(response) {
          // response=undefined
          

              for (var i = 0; i < response.length; i++) {
                    response[i].successdata=UtilitiesService.CommaSeparatedNumberFormat(parseInt(response[i].cpc)-parseInt(response[i].fc));
                    //response[i].cpc=UtilitiesService.CommaSeparatedNumberFormat(response[i].cpc);
                   // response[i].ic=UtilitiesService.CommaSeparatedNumberFormat(response[i].ic);
                    response[i].csc= UtilitiesService.CommaSeparatedNumberFormat(parseInt(response[i].csc))
                    response[i].sc= UtilitiesService.CommaSeparatedNumberFormat(parseInt(response[i].cpc)-parseInt(response[i].fc))
                   //response[i].coc=UtilitiesService.CommaSeparatedNumberFormat(response[i].coc);
                    //response[i].fc=UtilitiesService.CommaSeparatedNumberFormat(response[i].fc);
                    //response[i].ifc=UtilitiesService.CommaSeparatedNumberFormat(response[i].ifc);
                };
           $scope.table.table1loaded=true;

          if ( $scope.campaign_loading=='true') {
             $('#camp_table').fadeTo('fast', 0).fadeTo('fast', 1)
          };
          $scope.campaign_loading='false';
          if(response == "null"){
            $scope.total_campaigns = 0;
          }
          else{
            campaignslist = response;
            $scope.total_campaigns = campaignslist.length;
          }
          if (!$rootScope.push.selected_campaign) {
            $scope.api_campaigns_with_details=[];
          };
            for (var i = 0; i < campaignslist.length; i++) {
              if (!parseInt(campaignslist[i].PushReqTimestamp)) {
                  campaignslist[i].date="Multiple Dates"
                  campaignslist[i].csf='-'
                  if (!$rootScope.push.selected_campaign) {
                  $scope.api_campaigns_with_details.push(campaignslist[i].src)
                  }
              }
              else{
                  campaignslist[i].date=moment(Number(campaignslist[i].PushReqTimestamp)).format('DD-MM-YYYY, HH:mm');
                  if (campaignslist[i].csf=='completed' && campaignslist[i].crt) {
                    campaignslist[i].status=campaignslist[i].csf
                    campaignslist[i].csf=' in '+convertToTime((campaignslist[i].crt/1000).toFixed(0))
                  }
                  else{
                    campaignslist[i].status=campaignslist[i].csf
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

              
              $scope.filteredcampaignslist = campaignslist.slice(begin, end);
              mod_data=[];

          var sent=[],received=[],installs=[];
          for (var i = 0; i < $scope.filteredcampaignslist.length; i++) {
           sent.push({y:$scope.filteredcampaignslist[i].cpc,x:$scope.filteredcampaignslist[i].date})
           received.push({y:$scope.filteredcampaignslist[i].csc,x:$scope.filteredcampaignslist[i].date})
           installs.push({y:$scope.filteredcampaignslist[i].coc,x:$scope.filteredcampaignslist[i].date})
          };
           mod_data.push({z:'Sent',a:sent})
           mod_data.push({z:'Received',a:received})
           mod_data.push({z:'Opened',a:installs})
      UtilitiesService.draw_chart(multiLine2(mod_data,new_user_device_multiline_style),'MSLine.swf','PushCampaignTrends','100%','353');
          });
 $scope.filteredcampaignslistCSV=[];
     
      for (var i = 0; i <  campaignslist.length; i++) {
                  $scope.filteredcampaignslistCSV.push({
                    a: campaignslist[i].src,
                    b: campaignslist[i].date,
                    c: campaignslist[i].cpc,
                    d: campaignslist[i].csc,
                    e: campaignslist[i].coc,
                    f: campaignslist[i].csf,
                    g: campaignslist[i].mt,

                  })
                }


          
        })

 
  };


  var convertToTime = function(seconds){
      //mm:ss
      return ("00"+(Math.floor((seconds)/60))).slice(-2)+":"+("00"+seconds%60).slice(-2);
  }

   $scope.deleteScheduled = function(campid,index){
     $http.post('/deletepush', {'app_secret' :$rootScope.app.app_secret,ref:campid}).success(function(response) {
            console.log(response)
          $scope.filteredcampaignslist[index].csf='Deleted';
          $scope.filteredcampaignslist[index].status='Deleted';
        }).error(function(response) {
          $scope.error = response.message;
        });
  };

  $scope.reschedule=function(camp_id){
     $("html, body").animate({ scrollTop: 0 }, "fast");
    var data;
    //$http.get('http://static.130.122.76.144.clients.your-server.de:5075/campaignInfo?cs='+camp_id).success(function(response) {
      JettyService.campaignstats($scope.endGap,$scope.noDays,$rootScope.app.app_secret,$rootScope.push.selected_campaign,camp_id).then(function(response) {
        console.log(response)
         data=response;

//      var data = {
// "campaignInfo": [{"app_secret":"12528479b0","OS":"Android","message":"Notification message","segment":"all","url":"deepl link","ref":"308c6228f4",
//     "src":"Campaign Name","ciu":"https://www.google.co.in/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
//     "rq_param":{"key1":"val1","key2":"val2"},"schedule":1454329500000,"title":"Notification title","rq_in_msg":"rq message",
//     "rq_in_title":"rq title","rq_btn_text":"rq btn text","rq_btn_action":"rq_open",
//     "rq_in_url":"rocqanalytics demo","rq_msgtype":"rq_in_ac","rq_ed":1455106100661,"rq_id":"multiple"}]}


         console.log(data)
      $rootScope.push.selected_campaign=null;
      $scope.addcampaign_success = 0;
      $scope.init();
      $scope.ShowPushType=false;
      $scope.resetToFirstStep();

      //Notification Page
      $scope.campaigndata.campaignname=response.src;
      $scope.campaigndata.title=response.title;
      $scope.campaigndata.message=response.message;
      if (response.rq_param) {
        decreateJSON(response.rq_param)
      };
      
      if (response.rq_param) {
        $scope.addparam_ischecked=true;
      }
      else{
        $scope.addparam_ischecked=false;
      }
 
      
      if (response.ciu) {
        $scope.addimage_ischecked=true;
        $scope.prefs.imageurltype="url";
        $scope.campaigndata.ImageUrl=response.ciu;
      }
      else{
        $scope.addimage_ischecked=false;
      }
        $scope.campaigndata.landing=response.notif_action_radio||'Application';
      if (!$scope.campaigndata.landing && response.ciu) {
        $scope.campaigndata.landing='Other Page'
      }
        $scope.campaigndata.url=response.url;
      $scope.campaigndata.rq_id=response.rq_id || 'single'
      $scope.campaigndata.prod_img=response.prod_img;



      // In App Message Page
      if (response.rq_in_img) {
        $scope.iamimageurl=response.rq_in_img
        $scope.prefs.iamimageurltype="url"
        $scope.showimage=true;
      }
      else{
        $scope.showimage=false;
      }
      if (response.rq_in_title || response.rq_in_msg) {
        $scope.heading=response.rq_in_title;
        $scope.line1=response.rq_in_msg;
        $scope.showtext=true;
      }
      else{
        $scope.showtext=false;
      }
      if (response.rq_btn_text) {
        $scope.buttontext=response.rq_btn_text;
        $scope.showbutton=true;
      }
      else{
        $scope.showbutton=false;
      }
      if ($scope.showimage && $scope.showtext && $scope.showbutton) {
        $scope.prefs.msg_type_selected=1;
      }
      else if($scope.showimage && !$scope.showtext && $scope.showbutton)
      {
        $scope.prefs.msg_type_selected=2;
      }
      else if(!$scope.showimage && $scope.showtext && $scope.showbutton)
      {
        $scope.prefs.msg_type_selected=3;
      }
      else if($scope.showimage && !$scope.showtext && !$scope.showbutton)
      {
        $scope.prefs.msg_type_selected=4;
      }
      $scope.prefs.buttonaction=response.rq_btn_action
        $scope.iamurl=response.rq_in_url
        $scope.campaigndata.iamlanding=response.button_action_radio|| 'Other Page'
      if(response.rq_msgtype && response.rq_msgtype.indexOf("_ac") > -1)
      {
      $scope.prefs.autoclose = "yes";
      }
      else
      {
      $scope.prefs.autoclose = "no";
      }
      if(response.rq_ed)
      {
      $scope.prefs.expire = "yes";
      }
      else
      {
      $scope.prefs.expire = "no";
      }
      $scope.prefs.expire="no";
      $scope.activityname=response.rq_in_pg;
      $scope.timedelay=Number(response.rq_in_td);



      if (response.rq_msgtype) {
        $scope.push_notification=false;
        $scope.in_app_message=true
        if(response.rq_msgtype.indexOf("rq_in_c") > -1)
        {
          $scope.PushType='In App Campaign'
          $scope.iamselection = 2
          $scope.showpreviewtype='iam';
          $('#androidnotification').removeClass('android-notification ios-notification');
        }
        else
        {
          $scope.PushType='In App Message'
          $scope.iamselection = 1
          $scope.showpreviewtype='notification';
          if ($rootScope.app.ostype=='Android') {
            $('#androidnotification').addClass('android-notification');
          }
          else{
            $('#androidnotification').addClass('ios-notification');
          }
        }
      }
      else{
        $scope.push_notification=true;
        $scope.in_app_message=false
        if (response.ciu) {
          $scope.PushType='Image Notification'
        }
        else{
          $scope.PushType='Push Notification'
        }
        $scope.iamselection = 1
        $scope.showpreviewtype='notification';
        if ($rootScope.app.ostype=='Android') {
          $('#androidnotification').addClass('android-notification');
        }
        else{
          $('#androidnotification').addClass('ios-notification');
        }
      }




      // Target Users
      if(response.segment.indexOf("CitySegment___") > -1)
      {
        $scope.getlocations().then(function(){
          $scope.prefs.Target='Location'
          $scope.targetkey=response.segment.split('___')[1]
        })
        
      }
      else if(response.segment.indexOf("EventSegment___") > -1)
      {
        $scope.getevents().then(function(){
          $scope.prefs.Target='Event'
          $scope.targetkey=response.segment.split('___')[1]
        })
        
      }
      else if(response.segment.indexOf("SessionSegment___") > -1)
      {
        $scope.getsessions()
        $scope.prefs.Target='Session'
        $scope.targetkey=$scope.sessions[response.segment.split('___')[1]].x; 
      }
      else if(response.segment.indexOf("___") > -1)
      {
        $scope.getsegments().then(function(){
              $scope.prefs.Target='Custom'
              $scope.targetkey=response.segment.split('___')[0]
              for (var i = 0; i < $scope.segments.length; i++) {
              if ($scope.segments[i].domainname==$scope.targetkey) {
                $scope.targetkey=$scope.segments[i].segmentname;
                break;
                };
              };
        })
      }
      else if(response.segment.indexOf("all") > -1)
      {
        $scope.prefs.Target='All'
      }
      else
      {
        $scope.getdynamicsegment().then(function(){
           $scope.prefs.Target='Dynamic'
          $scope.targetkey=response.segment.split('___')[1]
        })
       
      }
    }).error(function(response) {
      console.log('error',response)
      return;
    });


  }


    var getPushImages = function(app,index,row,autoselect){
      var deferred = $q.defer();
      JettyService.getPushImages(app,index,row).then(function(data) {
        // console.log(data)
        if (data==null || data=='null') {data={"imageList":[]}}
          var imagelist = [];
           for (var i = 0; i < data.imageList.length; i++) {
           // //static.157.42.251.148.clients.your-server.de:5081/image?fileName=1.jpeg&app_secret=pvr&type=download
             imagelist.push("http://img.rocq.io/image?&fileName="+data.imageList[i].image+"&app_secret="+app+"&type="+"download");
           
           };
            $scope.imageArray=imagelist;
            setTimeout(function()
            {
              if (autoselect) {
                $('.img:first').trigger('click');
              };
            },1000);
            deferred.resolve(imagelist);
        });
      return deferred.promise;
    }

    // for scheduling of push notifictaion
    $scope.initializeDatePicker = function(){
      
      //var date = +new Date();
      var date = $scope.timemoment;
      if (moment(new Date()).isAfter(date)) {
        date = moment().add(15*60*1000, 'milliseconds');
      };
      
      $("#datepicker").datetimepicker({
      inline:true,
      sideBySide: true,
      defaultDate:  date,
      minDate: moment().add(15*60*1000, 'milliseconds')
     
          });
   
      $('#datepicker').datetimepicker().off('dp.change');
     $('#datepicker').datetimepicker().on('dp.change', function(e){
      $scope.timemoment=e.date;
       // console.log(e.date)
    });
    }


    // for expiry date of in app message
    $scope.initializeDatePicker2 = function(){
      var date = $scope.expiredays;
     $('#datetimepicker1').datetimepicker({
      defaultDate:  date,
      minDate: moment()
    });
     $('#datetimepicker1').datetimepicker().off('dp.change');
     $('#datetimepicker1').datetimepicker().on('dp.change', function(e){
      $scope.expiredays=e.date;
    });
    }

    // $scope.eventlistener= function(){
    //   $('div#MessagetypeHolder').delegate("div","click",function(){
    //     $('div#MessagetypeHolder > div').children('p').removeClass('selected')
    //     $(this).children('p').addClass('selected')
    //   })
    // }

    $scope.resetToFirstStep = function(){
      $scope.selection = $scope.steps[0];
      $scope.iamselection = 1;
    }

    $scope.getNumber = function(num) {
      var arr=[];
      for (var i = 0; i <= num; i++) {
        arr.push(i);
      };
    return arr;   
    }

    $scope.iamvalidation = function(next)
    {
      
      if (next) {

          if($scope.iamselection==1)
          {
            if (!$scope.campaigndata.campaignname) {
              shakeeffect($('#iamcampaignname'))
              return;
            };
            if (!$scope.campaigndata.title && $rootScope.app.ostype=='iOS' ) {
              shakeeffect($('#iamtitle'))
              return;
            };
            if (!$scope.campaigndata.message) {

              shakeeffect($('#iammessage'))
              return;
            };
          }

          if($scope.iamselection==2)
          {
            if (!$scope.campaigndata.campaignname && $scope.PushType=='In App Campaign') {
              shakeeffect($('#iamcampaignname'))
              return;
            };
            if ($scope.showimage && !$scope.iamimageurl ) {
              shakeeffect($('#iamimageurl'))
              return;
            };
            if ($scope.showtext ) {
              if (!$scope.heading) {
                shakeeffect($('#iamheading'))
                return;
              };
              if (!$scope.line1) {
                shakeeffect($('#iamline1'))
                return;
              };
            };
            if ($scope.showbutton && !$scope.buttontext ) {
              shakeeffect($('#iambuttontext'))
              return;
            };
            
          }
      $("html, body").animate({ scrollTop: 0 }, 600);
      $scope.iamselection++;
        // if ($scope.PushType=='In App Campaign' && $scope.iamselection==2) {
        //   $scope.iamselection+=2;
        // };
      }
      else{
        $("html, body").animate({ scrollTop: 0 }, 600);
        $scope.iamselection--;
        // if ($scope.PushType=='In App Campaign' && $scope.iamselection==3) {
        //   $scope.iamselection-=2;
        // };
      }
      
      if ($scope.iamselection<2) {
        $scope.showpreviewtype='notification';
        if ($rootScope.app.ostype=='Android') {
          $('#androidnotification').addClass('android-notification');
        }
        else{
          $('#androidnotification').addClass('ios-notification');
        }
      }
      else{
        $scope.showpreviewtype='iam';
        $('#androidnotification').removeClass('android-notification ios-notification');
      }
    }

    $scope.iamPreviusButtonVisible = function()
    {
      if ($scope.PushType=="In App Campaign" && $scope.iamselection<=2) {
        return false
      }
      else if ($scope.iamselection<=1) {
         return false
      };
      return true
    }

    $scope.initializepopover=function(){
      $('[data-toggle=\'popover\']').popover();
    }


  
  //$scope.getsegments();
 // $scope.getcampaigns();
  // getcampaigns().finally(campaignTrends);
  getPushImages($rootScope.app.app_secret,0,50);

     var run = function(){
          $scope.getcampaigns();
    }

     WatchDate();


  }]);