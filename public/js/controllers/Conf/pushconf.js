
var PushConf = angular.module('Controllers');
PushConf.controller('PushConfctrl', ['$scope', '$rootScope', '$modal', '$http', '$location','localStorageService',
    function($scope, $rootScope, $modal, $http, $location,localStorageService) {


$scope.gcm = function() {  
        if (!$scope.apikey) {
            $('#error-message').html("Please enter the api key")
            $('#upload_success').hide();
            $('#upload_error').show();
            return;
         };
         if ($scope.apikey.length<15) {
            $('#error-message').html("It seems that you have entered <strong> your Project ID</strong>. Please make sure that you enter the <strong>GCM Server Key which is attached to your project</strong>.")
            $('#upload_success').hide();
            $('#upload_error').show();
            return;
         };
         if (!$scope.packagename) {
            $('#error-message').html("Please enter the package name")
            $('#upload_success').hide();
            $('#upload_error').show();
            return;
         };
        $http(
        {
            url:'//pushapi.rocq.io/appinfo',
            //url:'//static.130.122.76.144.clients.your-server.de/appinfo',
            //url: '//static.157.42.251.148.clients.your-server.de:5080/appinfo',
            method: 'POST',
            params:
            {
              andapp  : $rootScope.app.app_secret,
              application : $rootScope.app.application,
              API      : $scope.apikey,
              pkg     :$scope.packagename,
              //OS:      $rootScope.app.ostype
            }
        }
        ).success(function(data) {
          
           $('#success-message').html("Saved Successfully")
         $('#upload_error').hide();
         $('#upload_success').show();
          console.log(data)
        }).error(function(data) {
             $scope.error401=true;
            $('#error-message').html('We are getting Unauthorised Error from GCM.')
            $('#upload_success').hide();
            $('#upload_error').show();
          console.log(data)
        });
    };

    $scope.getgcmdata = function() { 
        $http(
        {
            url:'//pushapi.rocq.io/appinfo',
            //url:'//static.130.122.76.144.clients.your-server.de/appinfo',
            //url: '//static.157.42.251.148.clients.your-server.de:5080/appinfo',
            method: 'GET',
            params:
            {
              andapp  : $rootScope.app.app_secret,
            }
        }
        ).success(function(data) {
          $scope.apikey=data.API;
          $scope.packagename=data.pkg;
          console.log(data)
        }).error(function(data) {
          console.log(data)
        });
    };
$scope.getapnsdata = function() {
        $http(
        {
            url:'//pushapi.rocq.io/appinfo',
            //url:'//static.130.122.76.144.clients.your-server.de:5074/appinfo',
            //url: '//static.157.42.251.148.clients.your-server.de:5080/appinfo',
            method: 'GET',
            params:
            {
              iosapp  : $rootScope.app.app_secret,
            }
        }
        ).success(function(data) {
         $scope.password_development=data.dp;
         $scope.password_production=data.pp;
         $scope.devfilename=data.dfn;
         $scope.prodfilename=data.pfn;
          console.log(data)
        }).error(function(data) {
          console.log(data)
        });
    };
   $scope.apns = function() {
    var _file_dev = document.getElementById('file_dev');
    console.log(_file_dev.files[0])
    var _file_pro = document.getElementById('file_pro');
   console.log(_file_pro.files[0])
        // if (_file_dev.files[0] && !$scope.password_development) {
        // $('#error-message').html("please provide the password for deveopment certificate")
        // $('#upload_success').hide();
        // $('#upload_error').show();
        // return;
        //  };

        //  if (_file_pro.files[0] && !$scope.password_production) {
        //  $('#error-message').html("please provide the password for production certificate")
        // $('#upload_success').hide();
        // $('#upload_error').show();
        // return;
        //  };

        if (!_file_dev.files[0] && $scope.password_development && !$scope.devfilename) {
        $('#error-message').html("please provide the deveopment certificate file")
        $('#upload_success').hide();
        $('#upload_error').show();
        return;
         };

          if (!_file_pro.files[0] && $scope.password_production && !$scope.prodfilename) {
         $('#error-message').html("please provide the upload production certificate file")
        $('#upload_success').hide();
        $('#upload_error').show();
        return;
         };

        //    if ($scope.password_development==undefined && $scope.password_production==undefined) {
        //  $('#error-message').html("Information Missing")
        // $('#upload_success').hide();
        // $('#upload_error').show();
        // return;
        //  };



    var filedata = new FormData();
   // filedata.append('app_secret',$rootScope.app.app_secret);

    filedata.append('iosapp',$rootScope.app.app_secret);
     console.log($rootScope.app.app_secret);
if ($scope.password_production && !$scope.prodfilename) 
{
    filedata.append('pp',$scope.password_production);

};
    if (_file_pro.files[0] != undefined){
    filedata.append('production', _file_pro.files[0]);
  }
    if($scope.password_development && !$scope.devfilename)
    {
    filedata.append('dp',$scope.password_development );
  };
    if (_file_dev.files[0] != undefined){
    filedata.append('development', _file_dev.files[0]);

        }
    //  if(  _file_devType.equals("application/x-pkcs12")){
    //   $('#error-message').html("File should be p12")
    //   $('#upload_error').show();
    //     return;
    // }
    
    var request = new XMLHttpRequest();

    request.onreadystatechange=function()
  {
     
       
  if (request.readyState==4)
    { console.log(request);
      console.log(request.status);
       if (request.status==200) {
         $('#success-message').html("File uploaded successfully")
         $('#upload_error').hide();
         $('#upload_success').show();
         $scope.getapnsdata();
       // getPushImages($rootScope.app.app_secret,0,50);
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
        $('#error-message').html(error)
        $('#upload_success').hide();
        $('#upload_error').show();
        $('#uploading_image').hide();
        
       }
     
    }
  }
    //request.open('POST', '//static.130.122.76.144.clients.your-server.de:5074/appinfo?app_secret='+$rootScope.app.app_secret);
    //request.open('POST', '//static.157.42.251.148.clients.your-server.de:5080/appinfo?app_secret='+$rootScope.app.app_secret);
    request.open('POST', '//pushapi.rocq.io/appinfo?app_secret='+$rootScope.app.app_secret);
   
    request.send(filedata);

}
  
 // $scope.getgcm_data = function(){
   
 //        $http.post('/getgcm_data', {'app_secret' :$rootScope.app.app_secret}).success(function(response) {
 //            if(response == "null"){response=[]}
 //            $scope.apikey= response.api_key;
 //          $scope.packagename=response.packagename;
 //        }).error(function(response) {
 //          $scope.error = response.message;
 //        });
 //  };


  if ($rootScope.app.ostype=='iOS') {
    $scope.getapnsdata();
  };
  if ($rootScope.app.ostype=='Android') {
    $scope.getgcmdata();
  };


}]);

