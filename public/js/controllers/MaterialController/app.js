(function(){
//
angular.module('MyApp',['ngMaterial', 'ngMessages', 'material.svgAssetsCache','ngAnimate','md.data.table'])
.controller('AppCtrl', function($rootScope,$scope, $timeout,$mdSidenav,$mdToast,$mdDialog) {
    
    /*
        Filters Json Data
    */
    
//    $scope.filtersData={
//        location:{
//            title:"location",
//            id:"location",
//            data:["Delhi","Mumbai","Gurgaon"]},
//        gender:{
//            title:"gender",
//            id:"gender",
//            data:["male","female"]},
//        
//        }
//
  $scope.card_filters = [{
                "id":"location",
                "title":"Location"
            },
            {
                "id":"gender",
                "title":"Gender"
            },
            {
            "id":"source",
                "title":"Source"
            },
            {
            "id":"device",
                "title":"Device"
            }];
    
    /*
    *
    * sidenav 
    */
    
    $scope.toggleNav=function(bool){
        var bgcolor="#222d32";
        
           if(bool){
                bgcolor="transparent";
           }

        return bgcolor;
    }
    
    $scope.togglenav=function(links,state){
        
        var hgt=0;
        var liHeight=40;
        
        
        if(links==undefined){
            return false
        }
        
        if(state){
            hgt=(links.length)*liHeight;
        }else{
            hgt=0;
        }
        
        css=hgt+"px";
        
        return css;
    }
    
    
    $scope.toggleLeft = buildToggler('left');
    $scope.filtersTests = filtersTest;
    $scope.toggleRight = buildToggler('right');
        
    $scope.imagePath = 'img/washedout.png';
    
    $scope.tablePagination = {
        totalrows: 5,
        currentPage: 1,
        rowsPerPage:5
    };
    
 
    $scope.customdate = function(ev){
         $mdDialog.show({
          controller: DialogController,
          templateUrl:'views/components/daysnav/datepicker.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true,
          fullscreen: $scope.customFullscreen// Only for -xs, -sm breakpoints.
        })
    }
    /*<div flex-gt-xs><h4>Date-picker with min date and max date</h4><md-datepicker ng-model="myDate" md-placeholder="Enter date" md-min-date="minDate" md-max-date="maxDate"></md-datepicker></div>*/
     $scope.dateRange=[{
            title:"1 day",
            value:"1"
        },{
            title:"7 day",
            value:"7"
        },{
            title:"30 day",
            value:"30"
        },{
            title:"60 day",
            value:"60"
        }]
    
    
    $scope.menu_item = [
        {
        link : '',
        title: 'Overview',
        icon: 'dashboard'
        },
        {
          link : '',
          title: 'Trends',
          icon: 'settings_applications',
          sublinks:[
                {
                    link :'',
                    title:'Overview',
                    icon:'',
                },
                {
                    link :'',
                    title:'Active Users',
                    icon:'',
                },
                {
                    link :'',
                    title:'Sessions',
                    icon:'',
                },
                {
                     link :'',
                     title:'Cohort',
                     icon:'',
                }]
          },
        {
          link : '',
          title: 'Acquisition',
          icon: 'view_module',
          sublinks:[
                {
                    link :'',
                    title:'Overview',
                    icon:'',
                },
                {
                    link :'',
                    title:'Install',
                    icon:'',
                },
                {
                    link :'',
                    title:'Uninstalls',
                    icon:'',
                }]
        },
        {
          link : '',
          title: 'Overall Analysis',
          icon: 'timeline',
          sublinks:[
                {
                    link :'',
                    title:'Overview',
                    icon:'',
                },
                {
                    link :'',
                    title:'Device',
                    icon:'',
                },
                {
                    link :'',
                    title:'Network',
                    icon:'',
                },
                {
                     link :'',
                     title:'Location',
                     icon:'',
                }]
        },
        {
          link : '',
          title: 'User Engagement',
          icon: 'supervisor_account',
          sublinks:[
                {
                    link :'',
                    title:'Revenue',
                    icon:'',
                },
                {
                    link :'',
                    title:'Segmentation',
                    icon:'',
                },
                {
                    link :'',
                    title:'Events',
                    icon:'',
                },
                {
                     link :'',
                     title:'Real Time Events',
                     icon:'',
                },
                {
                     link :'',
                     title:'Screen Flow',
                     icon:'',
                }]
        },
        {
          link : '',
          title: 'Push Notification',
          icon: 'speaker_notes',
          sublinks:[
                {
                    link :'',
                    title:'Send Push',
                    icon:'',
                },
                {
                    link :'',
                    title:'Send Push Segmentation',
                    icon:'',
                },
                {
                    link :'',
                    title:'Custom Segmentation',
                    icon:'',
                },
                {
                     link :'',
                     title:'Send Push Report',
                     icon:'',
                }]
        },
        {
          link : '',
          title: 'Ad Campaigns',
          icon: 'view_compact',
          sublinks:[
                {
                    link :'',
                    title:'Campaigns',
                    icon:'',
                },
                {
                    link :'',
                    title:'Campaigns Report',
                    icon:'',
                }]
        },
        {
          link : '',
          title: 'Configuration',
          icon: 'build',
          sublinks:[
                {
                    link :'',
                    title:'Push Configration',
                    icon:'',
                }]

        }];

    $scope.widget_filters = [{
        location: {
            title:"location",
            fonticon:"",
            image:"",
            svg:"",
            options:{

            }
        },
        gender: {
            title:"gender",
            fonticon:"Overview",
            image:"",
            svg:"",
            options:{}
        },
        devices: {
            title:'dashboard',
            fonticon:"Overview",
            image:"",
            svg:"",
            options:{}
        }}];

    $scope.filters={
        location:{
            icon:"location_on",
            svg:false,
            image:false,
            action:"",
        },
        installs:{
            icon:"location_on",
            svg:false,
            image:false,
            action:"",
        }
    }

    $scope.tablejson = {
        columns:[{
           id:"events",
            title:"Events"
        },{
            id:"events_count",
            title:"Counts"
        }],
        rows:[{
            id:"day1",
            title:"Day 1"
        },{
            id:"day2",
            title:"Days 2"
        },{
            id:"day3",
            title:"Day 3"
        }],
        data:[{
              event:"prodct view1",
              count:"1"   
            },{
             event:"prodct view2",
              count:"2"
            },{
             event:"prodct view3",
              count:"3"
            },{
             event:"prodct view4",
              count:"4"
            },{
             event:"prodct view5",
              count:"5"
            },{
             event:"prodct view6",
              count:"6"
            }]
    }

    function buildToggler(componentId) {
      return function() {
        $mdSidenav(componentId).toggle();
      }
    }

    $scope.focusSearchbox=function(){
     //  lightbox = {background-color:'red'};
    }

    $rootScope.toastparams = {
        type:"inbox",
        heading:'amit0shakya@gmail.com',
        headingcolor:'black',
        subheadingcolor:'black',
        subheading:'subheading',
        icon:"unpin"
    };
    
    $scope.showCustomToast = function(params) {
        $rootScope.$broadcast('customEve', params);
      };

//Toast Notification property

$rootScope.toastcolor={
        green:'#61cb9f',
        yellow:'#fffd56',
        red:'#ff3240',
        blue:'#4154a5',
        skyblue:'#00ae9f',
        cyan:'#00ae9f',
        grey:'#283d47',
        lightgrey:'#848484'
}

$rootScope.toastSkin={
       bgcolor:$rootScope.toastcolor.green,
       height:'30px',
       position:"top right",
       hideDelay:"5000",
       lefticon:"",
       lefticoncolor:"",
       righticon:"",
       righticoncolor:"",
       image:"",
       svg:"",
       heading:"",
       headingcolor:"",
       subheading:"",
       subheadingcolor:""
}

$scope.togglefilters=function(){
/*   $scope.toggleLeft = buildToggler('left');
    $scope.toggleRight = buildToggler('right');*/
    
    $mdSidenav("filters").toggle();
}

  function buildToggler(componentId) {
       return function() {
            $mdSidenav(componentId).toggle();
       }
  }
    
  function DialogController($scope, $mdDialog) {
    console.log("dialog controller");
  }

  $scope.mouseDown=false;
  $scope.mouse={x:"",y:""};
  $scope.helpDiv={right:0,bottom:0};
  
  $scope.getProp = function(e){
     console.log(e);
  }
    
  $scope.drag=function(e){  
    $scope.mouseDown=true;
  }
  
  $scope.nodrag=function(){
    $scope.mouseDown=false;
  }
  
  $scope.rightPos=$scope.bottomPos=0;
  
  $scope.mousemoove=function(e){
    if($scope.mouseDown){
        _x=e.clientX-$scope.mouse.x;
        _y=e.clientY-$scope.mouse.y;
        
        $scope.rightPos=parseInt($scope.helpDiv.right)-parseInt(_x);
        $scope.bottomPos=parseInt($scope.helpDiv.bottom)-parseInt(_y);
        
        _d=document.getElementById("helptab");
        _d.style.bottom=$scope.bottomPos+"px";
        _d.style.right=$scope.rightPos+"px";
    }
  }
  
  md=function(e){
      $scope.mouse.x=e.screenX;
      $scope.mouse.y=e.clientY;
      
      var _t=document.getElementById("helptab").style.right;
      $scope.helpDiv.right=getval(_t);
      
      var _d=document.getElementById("helptab").style.bottom;
      $scope.helpDiv.bottom=getval(_d);
  }
  
  getval=function(par){
      var val=par.split("");
      var lgt=val.length-2;
          val=val.splice(0,lgt);
      var num="";
      
      for(var i=0;i<val.length;i++){
          num+=val[i];
      }
      return num;
  }
  
  $scope.resetPos=function(){
      _d=document.getElementById("helptab");
      _d.style.bottom="10px";
      _d.style.right="10px";
      _d.style.display="none";
  }
  
  $scope.togglehelp=function(){
      _d=document.getElementById("helptab");
      _d.style.display="block";
  }
});
    
})();
