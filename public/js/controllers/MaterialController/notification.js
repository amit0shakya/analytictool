(function(){
var isDlgOpen;

angular.module('MyApp')
.controller('ToastCtrl', function($rootScope,$scope, $mdToast, $mdDialog){
   // console.log($rootScope.toastparams);
    
     var _parent=$scope.$parent;
    $scope.svgcolor="fill:red";
    
    
    $scope.$on('customEve', function (event, data) {
    var ToastDelay=5000;
    
   for(var index in data){
            
            if(index in $scope.toastSkin){
                _parent.toastSkin[index]=data[index];
            }
        };
        
        if(data.delay){
            ToastDelay=data.delay;
        }

        if(data.icon){
            
            if(data.icon=="download"){
            data.icon="file_download";
            }
            
            if(data.icon=="inbox"){
            data.icon="mail";
            }
            
            if((data.icon=="right")||(data.icon=="correct")){
            data.icon="done";
            }
            
            
            if(!((data.icon=="pin")||(data.icon=="unpin"))){   
                _parent.toastSkin.lefticon=data.icon;
            }
            
            //if there is svg icon
            
            if((data.icon=="pin")||(data.icon=="unpin")){   
                _parent.toastSkin.svg="svg/"+data.icon+"-icon.svg";
                data.icon=false;
            } 
          }
        
        if(data.type=="download"){
            
            if(data.bgcolor !="undefined"){
               _parent.toastSkin.bgcolor=_parent.toastcolor.green;
            }
            
             if(!data.icon){
                _parent.toastSkin.lefticon="file_download";
              }
            
            if(data.heading !="undefined"){
               _parent.toastSkin.heading=data.heading;
            }else{
                _parent.toastSkin.heading="Download Successful";
            }
            
            if(data.righticon !="undefined"){
               _parent.toastSkin.righticon=_parent.toastcolor.righticon;
            }else{
                _parent.toastSkin.righticon="done";
            }
            
            //toastSkin.righticon
            _parent.toastSkin.lefticoncolor=_parent.toastSkin.righticoncolor="#fff";
            _parent.toastSkin.headingcolor=_parent.toastcolor.grey;
        }
        
        if(data.type=="shared"){
            
            if(!(data.bgcolor in data)){
               _parent.toastSkin.bgcolor=_parent.toastcolor.yellow;
            }
            
            if(!data.icon){
                _parent.toastSkin.lefticon="done";
            }
            
            if((data.heading in data)){
               _parent.toastSkin.heading=data.heading;
            }else{
                _parent.toastSkin.heading=data.heading;
            }
            
            
            _parent.toastSkin.righticoncolor=_parent.toastcolor.grey;
            _parent.toastSkin.headingcolor=_parent.toastcolor.grey;
            _parent.toastSkin.lefticoncolor=_parent.toastcolor.blue;
        };
        
        if(data.type=="inbox"){
            
            if(!data.bgcolor){
               _parent.toastSkin.bgcolor=_parent.toastcolor.yellow;
            }
            
            if(!data.icon){
                _parent.toastSkin.lefticon="mail";
            }
            
            if(data.heading ){
               _parent.toastSkin.heading=data.heading;
            }/*else{
                _parent.toastSkin.heading=data.heading;
            }*/
            
            if(data.subheading){
               _parent.toastSkin.subheading=data.subheading;
            }/*else{
                _parent.toastSkin.subheading=data.subheading;
            }*/
            
            _parent.toastSkin.height="50px";
            _parent.toastSkin.subheadingcolor=_parent.toastcolor.lightgrey;
            _parent.toastSkin.lefticoncolor=_parent.toastcolor.blue;
            _parent.toastSkin.headingcolor=_parent.toastcolor.grey;
        };
        
        if(!(data.type)){
            
            if(data.bgcolor){
               _parent.toastSkin.bgcolor=data.bgcolor;
            }
            
            if(data.icon){
               _parent.toastSkin.lefticon=data.icon;
            }
            
            if(data.heading){
               _parent.toastSkin.heading=data.heading;
            }
            
            if(data.subheading){
               _parent.toastSkin.subheading=data.subheading;
               _parent.toastSkin.height="50px";
            }
        };
  
        $mdToast.show({
              hideDelay   : ToastDelay,
              position    : 'top right',
              controller  : 'ToastCtrl',
              templateUrl : 'partials/notification.html'
        });
    });
    
   /* if($scope.toastparams.type=="download"){
       // $scope.toastSkin.Licon="file_download";
       // $scope.toastSkin.Liconcolor="fff";
    }*/
    
    /*if(($scope.toastparams.type=="mail")||($scope.toastparams.type=="inbox")){
         $scope.toastSkin.icon="email";
         $scope.toastSkin.iconcolor=$scope.toastcolor.blue;;
    }*/

    
    $scope.closeToast = function() {
        if (isDlgOpen) return;
        $mdToast
          .hide()
          .then(function() {
            isDlgOpen = false;
          });
      };

      $scope.openMoreInfo = function(e) {
        if ( isDlgOpen ) return;
        isDlgOpen = true;

        $mdDialog
          .show($mdDialog
            .alert()
            .title('More info goes here.')
            .textContent('Something witty.')
            .ariaLabel('More info')
            .ok('Got it')
            .targetEvent(e)
          )
          .then(function() {
            isDlgOpen = false;
          })
      };
    
    });
})()