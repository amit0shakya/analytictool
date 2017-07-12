
  var pushreport = angular.module('Controllers')
  pushreport.controller('PushSegmentationCtrl',['$scope','$rootScope','$q','$http','JettyService','UtilitiesService','JSONService',function($scope, $rootScope, $q, $http, JettyService, UtilitiesService, JSONService) {
                  
      //$scope.propertiesstepslength={"0":[{}],"1":[{}],"2":[{}],"3":[{}],"4":[{}],"5":[{}],"6":[{}],"7":[{}],"8":[{}],"9":[{}],"10":[{}]};
      //$scope.eventssstepslength=[{}];
        var today =  new Date();
         var app = $rootScope.app.app_secret;
         //$rootScope.segmentation={show_segmentation:true}
              var timeZone = "IST";
              $scope.FilterType="Keywords";
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
              $scope.EName={}
$scope.EName.SelectedEName=[undefined]
$scope.showeventpreview=false;
$scope.selectedfilter='location'
$scope.localLang = {
    selectAll       : "Select all",
    selectNone      : "Select none",
    reset           : "Undo all",
    search          : "Type here to search...",
    nothingSelected : "Select Location"
}


$scope.Input={}
$scope.FilterNames=['Keywords','Sources','Operator','Network Type','App Version','Android','Device manufacturer','Session']
$scope.rq_FilterNames=['rq_term','rq_source','rq_operator','rq_nettype','rq_appver','rq_osver','rq_manu','rq_session']
$rootScope.showoverview=true

$scope.generateKeyHelper = function(arr,prefix){
           var key="";
          if (!arr || arr.length==0) {
                        return "";
              };
           for (var j = 0; j < arr.length; j++) {
            key+=prefix+'_'+(arr[j].x || arr[j]);
            if (arr.length-1>j) {
              key+='__'
            };
          }
          if (j>0) {
            key+='_AND_'
          };
            
            return key
}


        $scope.getUsers = function(filter_data,index) {
          console.log(index)
          var key="";
          //  console.log($scope.Filter['Keywords'])
            var ANDOR
          if ($(".or_toggle").hasClass("active")) {
              ANDOR='_EOR_'
          }
          else{
             ANDOR='_AND_'
          }

           for (var i = 0;$scope.EName.SelectedEName && i < $scope.EName.SelectedEName.length; i++) {
              for (var j = 0; $scope.EName.SelectedEName[i] && j < $scope.EName.SelectedEName[i]['prop'].length; j++) {
                 
                if ($scope.EName.SelectedEName[i]['value'][j]) {
                   key+='rq_otherkeyvalue_'
                }
                else if ($scope.EName.SelectedEName[i]['prop'][j]) {
                  key+='rq_otherkey_'
                }else{
                    key+='rq_event_'
                }

                 key+=$scope.EName.SelectedEName[i].name
                if ($scope.EName.SelectedEName[i]['prop'][j]) {
                   key+='_'+$scope.EName.SelectedEName[i]['prop'][j]
                };
                if ($scope.EName.SelectedEName[i]['value'][j]) {
                  key+='_'+$scope.EName.SelectedEName[i]['value'][j]
                };
                if ($scope.EName.SelectedEName[i]['prop'][j+1]) {
                   key+=$scope.andIsActivep[i] ? '_AND_' : '__'
                 
                };
                
              };
                if ($scope.EName.SelectedEName[i+1]) {
                        key+=ANDOR;
              };

              
          };

          if (key!='') {
             key+='_AND_';
          };
         

          if (!filter_data) {
            for (var i = 0; i < $scope.FilterNames.length; i++) {
                      console.log($scope.Filter[$scope.FilterNames[i]])

              key+=$scope.generateKeyHelper($scope.Filter[$scope.FilterNames[i]],$scope.rq_FilterNames[i])
          };
          key+=$scope.generateKeyHelper($scope.selectedState_List,'rq_state')
          key+=$scope.generateKeyHelper($scope.selectedCity_List,'rq_city')
          key+=$scope.generateKeyHelper($scope.selectedLanguage_List,'rq_lang')
          }
          else{
            console.log(filter_data)
            for (var i = 0; i < $scope.FilterNames.length; i++) {
                      // console.log($scope.Filter[$scope.FilterNames[i]])

              key+=$scope.generateKeyHelper(filter_data[$scope.FilterNames[i]],$scope.rq_FilterNames[i])
          };
          key+=$scope.generateKeyHelper(filter_data['State'],'rq_state')
          key+=$scope.generateKeyHelper(filter_data['City'],'rq_city')
          key+=$scope.generateKeyHelper(filter_data['Language'],'rq_lang')
          }
          
          //key+=$scope.generateKeyHelper($scope.Filter['Event Name'])
         // console.log(key.split('_AND_')[key.split('_AND_').length-1])
          if (key.split('_AND_')[key.split('_AND_').length-1]=='') {
            key=key.substring(0,key.length-5);
          };

          console.log(key)
        

          var promise = createandsave_campaignid();
      promise.then(function(campaignid){
        $scope.campaign_id=campaignid;

       // $http.post('/addsegcampaign', {campaign_id:campaignid})

          $http(
        {
            url: '//78.46.40.232:8080/segunioninterunion',
            //url: URL +'getcode',//'//148.251.42.156:1729/getcode',
            method: 'POST', 
            headers: { 'Content-Type': 'text/plain; charset=utf-8'},
            data: JSON.stringify(
            {
                app: app,
                endGap: $scope.endGap,
                noDays: $scope.noDays,
                gran: 2,
                timeZone:timeZone,
                campaignid:campaignid,
                key: key
            })
        }).success(function(data) {
          $scope.noUsers=data[0].y || ' 0 ';
          $scope.users[index]=$scope.noUsers;
          console.log($scope.users)
          $('#user_preview').fadeTo('fast', 0).fadeTo('fast', 1)
          console.log(data)
        })
        .error(function(){
          $scope.noUsers=' 0 ';
        })

      });


        
    };


//var SegmentationList = [{"AppVer":"22___9___15___21___13___18___14___19___20___17___16___8___23___24","City":"Delhi___Lucknow___Mumbai___Gujrat___Chennai___Bengaluru___Kolkata___Hyderabad___Pune___Surat___Chandigarh","EName":"User Login Info___Add To Cart___Payment Successfull___Forgot Password Click","Lang":"Magyar___Espanol___Portugues___Slovencina___Afrikaans___Xhosa___Eesti___Und___Filipino___Burmese___Bahasa Melayu","Manu":"LG___Samsung___Sony___Apple___TOSHIBA___Marvell___Huawei___Iris___K-series___Htc__Spice","Nettype":"4G___2G___3G___Wifi","OSVer":"4.4-DW___5.0.0___6.0.2___#caldenrocks___2.3.6___4.3.0___5.1.1___3.1___4.0.3___4.2JellyBean___4.4,4___GALAX_Android_4.2___lollipop","Operator": "Airtel___Idea___Reliance___Docomo___Celloneina___Bharatsancharnigamlimited","Sources": "Facebook___Addmob___Airloyal___Clickdealer___MoboGenie","State":"Tamilnadu___Punjab___Goa___Delhi___Karnataka___Maharashtra___Gujarat___Uttar Pradesh","Terms":"Download Songs___Online Songs___Bollywood Songs___Hits Songs"}];

var SegmentationList = [{"City":"mumbai___chennai___lucknow___bengaluru___kolkata___hyderabad___surat___pune___chandigarh___delhi___nagpur___kochi___jaipur___indore___gurgaon___raipur___agra___raipur___bhopal___nashik___ranchi","State":"gujarat___kerala___manipur___madhya pradesh___mizoram___assam___chattisgarh___haryana___jharkhand___kerala___maharashtra___himachal pradesh___karnataka___manipur___west bengal___delhi___tripura___telangana___odisha___goa___punjab","Lang":"english___spanish___arabic___bengali___hindi___russian___german___japanese___chinese___korean___french___turkish___telugu___marathi___tamil___italian___urdu___polish___sunda___romanian___hausa","Terms":"hit songs___online___ar rahman___keywords 43___roy songs___gabbar is back songs___kk superhits___keywords 7___piku songs online___hits songs___keyword 56___show app___how to book tickets online___online videos___keywords 52___pk songs___3 idiots songs___keywords 4___keywords 23___classical songs","Sources":"pointific___InstaAds___Icube___MoboGenie___MobVista___Airloyal___source 27___Imo___Internalmailer___AdConnect___source 32___source 33___AdBanner___source 8___AdBasket___source 23___source 11___source 45___source 1___source 4","Manu":"samsung SM-G7102___micromax Micromax A106___motorola XT1022___samsung GT-S7562___motorola XT1068___unknown Calypso AppCrawler___samsung SM-G355H___samsung GT-S7582___asus ASUS_T00J___samsung GT-I8262___micromax Micromax A110Q___yu AO5510___samsung GT-I8552___lenovo Lenovo A6000___samsung SM-G360H___xiaomi HM 1SW___samsung GT-I9082___micromax Micromax A102___sony C2305___intex Aqua Star HD___gionee M2___samsung SM-G530H___micromax A114","Operator":"cellone___idea___aircel___tata docomo___vodafone___airtel___reliance___Others___uninor___bsnl___t-mobile___dolphin___du___etisalat___tata___videocon___android___in unitech___t24___hutch___cellone m.p.___ sktelecom___ooredoo___softbank","AppVer":"23___12___19___17___9___18___23___14___29___15___11___4___23___24___21___13___17___4___27","OSVer":"4.2JellyBean ___ GALAX_Android_4.2___2.3.7___5.1.1___ infinity ___5.0___4.0.4 ICS___4.2JellyBean ___4.3.0___ Android L 5.0___3.1___5.2.0___2.3.3___4.4 Kitkat___4.2JellyBean___IPhone 6 Plus___LollipopMR1___ Touchwiz Revolution V10___ LollipopMR1___5.2.2___4.2___unknown","Nettype":"3G___wifi___4G___UNKNOWN___2G","EName":"Add to cart___User login info___Payment successfull___Forgot password click"}];
$scope.getListData=function(){



        $http(
        {
            url: '//78.46.40.232:8080/getlist',
            //url: URL +'getcode',//'//148.251.42.156:1729/getcode',
            method: 'GET', 
            params: 
            {
                app: app,
                // endGap: $scope.endGap,
                // noDays: $scope.noDays,
                // gran: 2,
                // timeZone:timeZone,
                // campaignid:123456,
                // key: key
            }
        }).success(function(data) {

          if ($rootScope.app.app_secret == '3974ba7380') {
            data=SegmentationList;
          }



          $scope.Input['City']=getobjarrayfromarr((data[0].City || "").split('___'))
          $scope.Input['State']=getobjarrayfromarr((data[0].State || "").split('___'))
          $scope.Input['Language']=getobjarrayfromarr((data[0].Lang || "").split('___')).filter(function(a){return a.x.indexOf('?')==-1});
          $scope.Input['Event']=getobjarrayfromarr((data[0].EName || "").split('___'))
          
          //$scope.FilterNames=['Keywords','Sources','Operator','Network Type','App Version','Android','Device manufacturer','Session']
         
          $scope.Input[$scope.FilterNames[0]]=getobjarrayfromarr((data[0].Terms || "").split('___'))
          $scope.Input[$scope.FilterNames[1]]=getobjarrayfromarr((data[0].Sources || "").split('___'))
          $scope.Input[$scope.FilterNames[2]]=getobjarrayfromarr((data[0].Operator || "").split('___'))
          $scope.Input[$scope.FilterNames[3]]=getobjarrayfromarr((data[0].Nettype || "").split('___'))
          $scope.Input[$scope.FilterNames[4]]=getobjarrayfromarr((data[0].Appver || "").split('___'))
          $scope.Input[$scope.FilterNames[5]]=getobjarrayfromarr((data[0].OSver || "").split('___'))
          $scope.Input[$scope.FilterNames[6]]=getobjarrayfromarr((data[0].Manu || "").split('___'))
          //$scope.Input[$scope.FilterNames[7]]=getobjarrayfromarr(($scope.FilterData[0].Terms || "").split('___')).splice(0,10);


          $scope.Input[$scope.FilterNames[7]]=[{x:"1",y:"1 session"},{x:"1-10",y:"1-10 session"},{x:"10-50",y:"10-50 session"},{x:"50-100",y:"50-100 session"},{x:"100p",y:"100+ session"}]

         

        });
    
       


    }

var propertiesdata = {"Add to cart":[{"EOtherKey_Add to cart": "brand name___model name"}],"User login info":[{"EOtherKey_User login info": "DOB___Email___Gender___UserName"}],"Payment successfull":[{"EOtherKey_Payment successfull": "Card Type___Discount___Total Price "}],"Forgot password click":[{"EOtherKey_Forgot password click": "Email___UserName"}]}

var valuedata = {"Add to cart_brand name":[{"EOtherKeyValue_Add to cart_brand name": "SONY___SAMSUNG___HTC___APPLE___NOKIA"}],"Add to cart_model name":[{"EOtherKeyValue_Add to cart_model name": "SONY___SAMSUNG___HTC___APPLE___NOKIA"}],"User login info_DOB":[{"EOtherKeyValue_User login info_DOB": "14 Feb-1989___04 Dec-1981___01 Sept-1976___11 Aug-1981___05 May-1990___26 May-1977___03 June-1982"}],"User login info_Email":[{"EOtherKeyValue_User login info_Email":"pydydyme-2738@yopmail.com___amulamm-7949@yopmail.com___ceffaddecyss-1038@yopmail.com___nudaddatunn-8301@yopmail.com___jevaduppep-8065@yopmail.com"}],"User login info_Gender":[{"EOtherKeyValue_User login info_Gender": "male___female"}],"User login info_UserName":[{"EOtherKeyValue_User login info_UserName": "Chandler Bing___Phoebe Buffay___Monica Geller___Ross Geller___Joey Tribbiani___Rachel Green"}],"Payment successful_Card Type":[{"EOtherKeyValue_Payment successful_Card Type": "Debit Card___Net Banking___Credit Card"}],"Payment successful_Discount":[{"EOtherKeyValue_Payment successful_Discount": "14%___10%___5%___7%___15%"}],"Payment successful_Total Price":[{"EOtherKeyValue_Payment successful_Total Price": "12,045___8,435___19,753___24,353"}],"Forgot password click_Email":[{"EOtherKeyValue_Forgot password click_Email": "jevaduppep-8065@yopmail.com___ceffaddecyss-1038@yopmail.com"}],"Forgot password click_UserName":[{"EOtherKeyValue_Forgot password click_UserName": "jevaduppep-8065@yopmail.com___ceffaddecyss-1038@yopmail.com"}]};

$scope.Properties_List={}
$scope.getPropertiesData=function(ename){


        $http(
        {
            url: '//78.46.40.232:8080/getkey',
            //url: URL +'getcode',//'//148.251.42.156:1729/getcode',
            method: 'GET', 
            params: 
            {
                app: app,
                // endGap: $scope.endGap,
                // noDays: $scope.noDays,
                // gran: 2,
                // timeZone:timeZone,
                // campaignid:123456,
                key: 'EOtherKey_'+ename
            }
        }).success(function(data) {

           if ($rootScope.app.app_secret == '3974ba7380') {
            data=propertiesdata[ename];
          }

          $scope.Properties_List[ename]=(data[0]['EOtherKey_'+ename] || "").split('___')
          console.log($scope.Properties_List)
         
        })




}



$scope.Value_List={}

$scope.getValueData=function(ename,eotherkey){


        $http(
        {
            url: '//78.46.40.232:8080/getkey',
            //url: URL +'getcode',//'//148.251.42.156:1729/getcode',
            method: 'GET', 
            params: 
            {
                app: app,
                // endGap: $scope.endGap,
                // noDays: $scope.noDays,
                // gran: 2,
                // timeZone:timeZone,
                // campaignid:123456,
                key: 'EOtherKeyValue_'+ename+'_'+eotherkey
            }
        }).success(function(data) {

          if ($rootScope.app.app_secret == '3974ba7380') {
            data=valuedata[ename+'_'+eotherkey];
          }

          //$scope.Properties_List=data;
          if (!$scope.Value_List[ename]) {
            $scope.Value_List[ename]={}
          };
          $scope.Value_List[ename][eotherkey]=(data[0]['EOtherKeyValue_'+ename+'_'+eotherkey] || "").split('___')
          console.log($scope.Value_List[ename][eotherkey])
          
        })

}

       

        $scope.propertiesaddstep=function(arr){
          for (var i = 0; i < arr['prop'].length; i++) {
            if (arr['prop'][i]==undefined) {
              return;
            };
          };
          arr['prop'].push(undefined);
          arr['value'].push(undefined);

}

  $scope.propertiesdeletestep=function(arr,index){
    if (arr['prop'].length==1) {
      arr['prop']=[undefined]
      arr['value']=[undefined]
      return
    };
     arr['prop'].splice(index,1);
     arr['value'].splice(index,1);

}


        $scope.eventssaddstep=function(){
  if (!$scope.EName.SelectedEName.slice(-1).pop()) {
    $('#eventnotselected').fadeIn(100);
    // $scope.eventnotselected=true
    setTimeout(function(){$('#eventnotselected').fadeOut(500);},2000)
  }
  else{
    $('#eventnotselected').fadeOut(500);
  }
  if($scope.EName.SelectedEName.length < 10)
// for( var i=0 ; i <$scope.stepslength[5] ; i++)
{   
  for (var i = 0; i < $scope.EName.SelectedEName.length; i++) {
    if ($scope.EName.SelectedEName[i]==undefined) {
      return;
    };
  };
  $scope.EName.SelectedEName.push(undefined)
  //$scope.$digest();
  if($scope.EName.SelectedEName.length==10)
  {
    $("#add").hide();
  }
}

}

  $scope.eventssdeletestep=function(index){
    if ($scope.EName.SelectedEName.length==1) {
      $scope.EName.SelectedEName=[undefined]
      return
    };
     // $scope.eventssstepslength.splice(index,1);
     //console.log()
     // $scope.funnelstep.push(" ");
  $scope.EName.SelectedEName.splice(index,1)
   //$scope.$digest();

}


        $("#FilterTypeid > li > ul > li").click(function(){
          $(this).closest('#FilterTypeid').children('li').children('ul').children('li').removeClass('selected')
          $(this).addClass('selected')
        })

            $("#FilterTypeid > li > ul > li").click(function(){
              console.log($(this).parent('ul').parent('li').index())
           
          $('#FilterGroupid').children('li').removeClass('active')
     
          $('#FilterGroupid > li:nth-child('+($(this).parent('ul').parent('li').index()+1)+')').addClass('active')
    
        })



 $scope.deletesegment=function(segment){
  console.log(segment)
    $http.post('/deletepushsegment', {id:segment.id}).success(function(response) {
      $scope.getsegment();
    })
  }

$scope.editpushsegment= function()
    {
       var segment= {};
       // $scope.currentSegmentindex= index;
      console.log($scope.currentSegmentindex)
    segment.app_secret=$rootScope.app.app_secret;
    segment.id= $scope.segmentlist[$scope.currentSegmentindex].id ;
    segment.campaign_id=$scope.campaign_id
    var json=$scope.getJSONforsqlstoring()
      console.log(json)
      segment.filters_json= JSON.stringify(json)
    segment.segmentname= $scope.segmentlist[$scope.currentSegmentindex].segmentname;
     if($scope.campaign_id == null || $scope.campaign_id=="")
        {
          $("#error-message").html('Please click on generate preview before saving');
          $("#upload_error").show();
          $("#upload_success").hide();
            return;
        }
    // for (var i = 1; i < $scope.noofsteps.length; i++) {
    //  segment['step'+i] = $scope['step'+i];
    // };

    $http.post('/editpushsegment', segment).success(function(response) {
      console.log("update2")
        

      $scope.getsegment($scope.segmentFilter);
      $("#success-message").html('segment updated successfully');
          $("#upload_error").hide();
          $("#upload_success").show();
            setTimeout(function(){
                 $("#upload_success").fadeOut();
            },5000)
      }).error(function(response) {
        $scope.error = response.message;
      });

    }




            $scope.savepushsegment= function(option){
              console.log("seg1");
    var segment= {};
    // if (option=='saveasnew') {
    //   segment.app_secret=$rootScope.app.app_secret;
    //   segment.segmentname= $scope.newsegmentname;
    //   console.log("seg2");
    //   $("#success-message").html('segment updated successfully');
    //       $("#upload_error").hide();
    //       $("#upload_success").show();
    //       setTimeout(function(){
    //         $("#upload_success").fadeOut();
    //       },5000)
    //   // for (var i = 1; i < $scope.noofsteps.length; i++) {
    //   //   console.log("seg3");
    //   //   if ($scope['step'+i]==' ') {
    //   //     console.log("seg4");
    //   //     return;
    //   //   };
    //   //   segment['step'+i]=$scope['step'+i]
    //   // };
    //   // funnel.step1=$scope.step1;
    //   // funnel.step2=$scope.step2;
    //   // funnel.step3=$scope.step3;
    //   // funnel.step4=$scope.step4;
    //   // funnel.step5=$scope.step5;
    //    // if($scope.newfunnelname == null || $scope.newfunnelname=="" || funnel.step1==" " || funnel.step2==" " || funnel.step1==null || funnel.step1==null)
    //    //  {
    //    //      return;
    //    //  }
    // }
    // else{
      segment.app_secret=$rootScope.app.app_secret;
      segment.segmentname= $scope.segmentname;
      segment.campaign_id=$scope.campaign_id
      var json= $scope.getJSONforsqlstoring()
        console.log(json)
      segment.filters_json= JSON.stringify(json)
      if($scope.segmentname == null || $scope.segmentname=="")
        {
          $("#error-message").html('Please Enter a segment name');
          $("#upload_error").show();
          $("#upload_success").hide();
            return;
        }
        if($scope.campaign_id == null || $scope.campaign_id=="")
        {
          $("#error-message").html('Please click on generate preview before saving');
          $("#upload_error").show();
          $("#upload_success").hide();
            return;
        }

      // for (var i = 0; i < $scope.stepslength.length; i++) {
      //   if ($scope.segmentstep[i]==' ') {
      //      $("#error-msg").html("Please Select Step "+(i+1));
      //       $("#Error").show();
      //       $("#Success").hide();
      //       return;
      //   };
      //   segment['step'+(i+1)]=$scope.segmentstep[i];
      // };
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
    // }

    
   
    segment.date=+new Date();
    $http.post('/addpushsegment', segment).success(function(response) {
      console.log("seg001")

        if(response == "null")
        {console.log("123")
          response=[];
        }
        else
        { 
          $scope.getsegment($scope.segmentname)
          // $scope.adminapps = response;
          console.log("234")
          $("#success-message").html('segment created successfully');
          $("#upload_error").hide();
          $("#upload_success").show();
          setTimeout(function(){
            $("#Success2").fadeOut();
          },5000)

        }
    
      }).error(function(response) {
        $scope.error = response.message;
        // deferred.resolve();
      });
  }

  $scope.getJSONforsqlstoring = function(){
      var json = { 
        "City":getarrayfromobjectarr($scope.selectedCity_List),
        "State":getarrayfromobjectarr($scope.selectedState_List),
        "Language":getarrayfromobjectarr($scope.selectedLanguage_List),
        "Event":$scope.EName.SelectedEName
        }
        for (var i = 0; i < $scope.FilterNames.length; i++) {
          json[$scope.FilterNames[i]]=getarrayfromobjectarr($scope.Filter[$scope.FilterNames[i]] || [])
        };
        return json;
    }

  var getarrayfromobjectarr = function(obj){
    var arr=[]
    for (var i = 0; i < obj.length; i++) {
      arr.push(obj[i].x)
    };
    return arr;
  }

  var getobjarrayfromarr = function(arr){
    var obj=[]
    for (var i = 0; i < arr.length; i++) {
      obj.push({x:arr[i]})
    };
    return obj;
  }


       


  $scope.getsegment= function(selected){
          var deferred = $q.defer();
    $http.post('/getpushsegments', {app_secret:$rootScope.app.app_secret}).success(function(response) {
      //$scope.showCreateNewSegment=(response.length==0);
      console.log(response)
        if(response == "null")
        {
          response=[];
        }
        else
        {
          $scope.segmentlist = response;
          // $scope.segmentlist.unshift({"segmentname":"All"})
          $scope.segmentlist.unshift({"segmentname":"New Segment"})
        }
        if (selected) {
          $scope.segmentFilter=selected
        }
        else{
          $scope.segmentFilter=$scope.segmentlist[0].segmentname
        }
        //$scope.updateSegmentStep(0);
         deferred.resolve();
      }).error(function(response) {
        $scope.error = response.message;
        // deferred.resolve();
      });
      return deferred.promise;
  }

  $scope.users=[];
  $scope.selectSegment=function(index)
  {
    index=index||0
    $scope.segmentFilter=$scope.segmentlist[index].segmentname
    $scope.old_segmentFilter=undefined;
    $scope.EName.SelectedEName=[undefined]
    removetickproperty($scope.Input['City'])
    removetickproperty($scope.Input['State'])
    removetickproperty($scope.Input['Language'])
     for (var i = 0; i < $scope.FilterNames.length; i++) {
      removetickproperty($scope.Input[$scope.FilterNames[i]])
    };
    $scope.currentSegmentindex= index;
    // console.log($scope.segmentlist)
    // console.log($scope.segmentlist[index])

    var filters_json = JSON.parse($scope.segmentlist[index].filters_json);
    //$scope.Filter=filters_json;
    addtickproperty(filters_json['City'],$scope.Input['City'])
    addtickproperty(filters_json['State'],$scope.Input['State'])
    addtickproperty(filters_json['Language'],$scope.Input['Language'])
    $scope.EName.SelectedEName=filters_json['Event'];
    for (var i = 0; i < $scope.FilterNames.length; i++) {
      addtickproperty(filters_json[$scope.FilterNames[i]],$scope.Input[$scope.FilterNames[i]])
    };

    for (var key in $scope.EName.SelectedEName) {
      if ($scope.EName.SelectedEName.hasOwnProperty(key)) {
        $scope.getPropertiesData($scope.EName.SelectedEName[key]['name'])
        for (var i = 0; i < $scope.EName.SelectedEName[key]['prop'].length; i++) {
          $scope.getValueData($scope.EName.SelectedEName[key]['name'],$scope.EName.SelectedEName[key]['prop'][i])
        };
      }
    }

    console.log(index)
    $scope.getUsers(filters_json,index)
    // $scope.generate_preview=true

  }

  var createandsave_campaignid = function(){
      var deferred = $q.defer();
      campaignid = UtilitiesService.generateUUID();
      $http.post('/craetesegcampaign', {secret : campaignid}).success(function(response){
          if(response.created)
          {
            deferred.resolve(campaignid);
          }
          else
          {
            createandsave_campaignid();
          }
      })
      return deferred.promise;
    };

  var addtickproperty = function(arr1,arr2){
        var flag;
      for (var j = 0; j < arr1.length; j++) {
        flag=true;
      for (var i = 0; i < arr2.length; i++) {
          if (arr1[j]==arr2[i].x) {
            arr2[i].ticked=true;
              flag=false;
              break;
          };  
      };
      if (flag) {
            arr2.push({x:arr1[j],ticked:true})
          };
    };
  }

  var removetickproperty = function(arr1){
    for (var i = 0; i < arr1.length; i++) {
            arr1[i].ticked=false;
    };
  }

   $scope.removetickproperty = function(arr1){
    for (var i = 0; i < arr1.length; i++) {
            arr1[i].ticked=false;
    };
  }

  $scope.showpreview = function(id){
    $scope.selectedfilter=null;
    $('#preview-holder').slideDown();
    // $('#'+id).collapse('hide')
  }

  $scope.hidepreview = function(id){
    $('#preview-holder').slideUp();
    $scope.selectedfilter=id
    // $('#'+id).collapse('show')
  }

  $scope.showeventpr = function(){
    $('#event-preview-holder').slideDown();
    $('#collapseEvent').collapse('hide')
  }

  $scope.hideeventpr= function(){
    $('#event-preview-holder').slideUp();
    $('#collapseEvent').collapse('show')
  }


$scope.andIsActive=true;
$('.body-content').delegate(".togglee","click",function() {
  $scope.andIsActive=!$scope.andIsActive;
  $scope.$apply();
  if ($scope.andIsActive) {
      $(".and_toggle").addClass('active')
      $(".or_toggle").removeClass('active')
  }
  else{
      $(".or_toggle").addClass('active')
      $(".and_toggle").removeClass('active')
  }
})


$scope.andIsActivep={0:true,1:true,2:true,3:true,4:true,5:true,6:true,7:true,8:true,9:true,10:true,11:true};

$('.body-content').delegate(".togglep","click",function() {
  var i = $(this).attr('id');
  $scope.andIsActivep[i]=!$scope.andIsActivep[i];
  $scope.$apply();
  if ($scope.andIsActivep[i]) {
      $(".and_togglep#andp"+i).addClass('active')
      $(".or_togglep#orp"+i).removeClass('active')
  }
  else{
      $(".or_togglep#orp"+i).addClass('active')
      $(".and_togglep#andp"+i).removeClass('active')
  }
  
})

// "{"City":[],"State":[],"Language":[],"Event":[{"name":"Book Ticket","prop":[null],\
// "value":[null],"$$hashKey":"086"}],"Keywords":[],"Sources":[],"Operator":[],\
// "Network Type":[],"App Version":[],"Android":[],"Device manufacturer":[],"Session":[]}"

var makeReadableString=function(){
  console.log($scope.segmentlist)
  // $scope.readableStrings=[]
  
  var json;
  for (var i = 1; i < $scope.segmentlist.length; i++) {
      var str='Users ';
      json=JSON.parse($scope.segmentlist[i].filters_json);
      if (json["Event"] && json["Event"].length>0  ) {
        str+='Who Have Done the Event '
        json["Event"].map(function(a,i){
              if (a) {
                 str+=a.name
                 str+=((a["prop"] && a["prop"].length>1) ? ' with ' : ' ' )
                 for (var j = 0;a.prop && j < a.prop.length-1; j++) {
                    if (a['prop'].length>0) {
                      str+=a.prop[j]+' '+a.value[j]
                      str+=( j==a['prop'].length-1 ? ' ': ' or ')
                    }
                 }
              }
             
             str+=( i==json["Event"].length-1 ? ' ': ' or ')
       })
      }
      if (json["Keywords"].length>0) {
        str+='Having Keywords '
        json["Keywords"].map(function(a,i){ str+=a+( i==json["Keywords"].length-1 ? ' ': ' or ')})
      }
      if (json["Sources"].length>0) {
        str+='From Sources '
        json["Sources"].map(function(a,i){ str+=a+( i==json["Sources"].length-1 ? ' ': ' or ')})
      }
      if (json["Operator"].length>0) {
        str+='With Operator '
        json["Operator"].map(function(a,i){ str+=a+( i==json["Operator"].length-1 ? ' ': ' or ')})
      }
      if (json["App Version"].length>0) {
        str+='Using App Version '
        json["App Version"].map(function(a,i){ str+=a+( i==json["App Version"].length-1 ? ' ': ' or ')})
      }
      if (json["Android"].length>0) {
        str+='Having Android Version '
        json["Android"].map(function(a,i){ str+=a+( i==json["Android"].length-1 ? ' ': ' or ')})
      }
      if (json["Device manufacturer"].length>0) {
        str+='with Device manufacturer '
        json["Device manufacturer"].map(function(a){ str+=a+( i==json["Device manufacturer"].length-1 ? ' ': ' or ')})
      }
      if (json["Session"].length>0) {
        str+='For Session '
        json["Session"].map(function(a,i){ str+=a+( i==json["Session"].length-1 ? ' ': ' or ')})
      }
      if (json["City"].length>0) {
        str+='From City '
        json["City"].map(function(a,i){ str+=a+( i==json["City"].length-1 ? ' ': ' or ')})
      }
      if (json["State"].length>0) {
        str+='From State '
        json["State"].map(function(a,i){ str+=a+( i==json["State"].length-1 ? ' ': ' or ')})
      }
      if (json["Language"].length>0) {
        str+='Using Language '
        json["Language"].map(function(a,i){ str+=a+( i==json["Language"].length-1 ? ' ': ' or ')})
      }

      
      $scope.segmentlist[i].readableString=str
      $scope.segmentlist[i].readableStringshort=str.slice(0,50)+'...'
      // if ($scope.segmentlist[i].segmentname=="Sourabh") {
      //   console.log(json)
      //   console.log($scope.segmentlist[i])
        
      //   console.log(str)
      // }

  }
  
}



    WatchDate();
var run=function()
{

    $scope.getListData();
     $scope.getsegment().then(makeReadableString);

}



   

  }]);
  

