(function() {
	var rocq = angular.module('Rocq', ['ngRoute', 'ngSanitize', 'ngCsv','Controllers','Services','ui.bootstrap','angular-jqcloud','Users','Applications','Directives','isteven-multi-select','qrcode','ngScrollbar','angularUtils.directives.dirPagination','daterangepicker']);
    rocq.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider) {
        $locationProvider.html5Mode({
          enabled: true,
          requireBase: false
        });
        var loginRequired = ['$location','$q','$rootScope','localStorageService',function($location, $q, $rootScope,localStorageService) { 
            var deferred = $q.defer();
            if(Date.now()-localStorageService.get('age') >   21600000)
            {
                deferred.reject()
                $location.path('/'); 
                return deferred.promise;

            }
            else
            {
              localStorageService.set('age',Date.now());
            }
            $rootScope.user = localStorageService.get('user') || {};
            if(!$rootScope.user.username) {
                deferred.reject()
                $location.path('/');
            } else {
                loadScript("lib/fusioncharts/fusioncharts.js",function(){
                     if ($rootScope.app.app_secret == '3974ba7380') {
                        loadScript("dummydata/dummydata.js",function(){
                        deferred.resolve()
                        })
                     }
                     else{
                         deferred.resolve()
                     }
                })
               
                
            }
            return deferred.promise;
        }]
        $routeProvider
            .when('/login', {
                templateUrl : 'partials/login.html'
            })
            // route for the applications page
            .when('/application', {
                templateUrl : 'partials/application.html',
                resolve : {loginRequired : loginRequired}
            })
            // route for the dashboard page
            .when('/dashboard', {
                templateUrl : 'partials/welcome.html',
                resolve : {loginRequired : loginRequired}
            })
            .when('/signup',{
                templateUrl : 'partials/signup.html'
            })
            .when('/terms',{
                templateUrl : 'partials/terms.html'
            })
            .when('/forgotpassword',{
                templateUrl : 'partials/password-forgot.html'
            })
			     .when('/resetpassword',{
                templateUrl : 'partials/password-reset.html'
            })
            .when('/addapp',{
                templateUrl : 'partials/addapplication.html',
                resolve : {loginRequired : loginRequired}
            })
             .when('/invite',{
                templateUrl : 'partials/invite.html',
                resolve : {loginRequired : loginRequired}
            })
            .when('/activate',{
                templateUrl : 'partials/activationsent.html'
            })
             .when('/verified',{
                templateUrl : 'partials/activationsuccessful.html'
            })
            .otherwise({
                redirectTo: '/login'
            })

    }]);
    rocq.run(['$rootScope','localStorageService',function ($rootScope,localStorageService) {
        // keep user logged in after page refresh
        $rootScope.user = localStorageService.get('user') || {};
        $rootScope.app = localStorageService.get('app') || {};


        // DateRangePicker
        var today =  new Date();
        var currentdate = new Date(Date.UTC(today.getUTCFullYear(),today.getUTCMonth(),today.getUTCDate()));

        /* Initialized the default date range and sets the endGap and noDays */
          var Start = function() {
            if($rootScope.daterange.date == '')
            {
              $rootScope.daterange.date = {startDate: new Date(currentdate.getTime() - 7*1000*60*60*24), endDate: new Date(currentdate.getTime() - 1*1000*60*60*24)};   
                $rootScope.daterange.endGap = Math.floor((currentdate.getTime() - $rootScope.daterange.date.endDate.getTime())/(1000*60*60*24));
                $rootScope.daterange.noDays = Math.floor(($rootScope.daterange.date.endDate.getTime() - $rootScope.daterange.date.startDate.getTime())/(1000*60*60*24) + 1);
            }
          };

          if($rootScope.daterange == undefined)
        {
          $rootScope.daterange = {
            date: '',
            endGap: '',
            noDays:''
          }
          Start();
        }




         $rootScope.$on("$includeContentLoaded", function(event, templateName){
                 $(".fsize-block").click(function () {
                 $(this).closest(".panel").toggleClass('fsize');  
                 });

				 
				  $(".fsize-bl").click(function () {
                 $(this).closest(".panel-body").toggleClass('fsize');  
                 });

          if ($('body').hasClass('cbp-spmenu-push-toright')) {
            $('#cbp-spmenu-s1').addClass('cbp-spmenu-open')
          };
          
				 

          });

    }])
    function loadScript(url, callback)
        {
            // Adding the script tag to the head as suggested before
            var head = document.getElementsByTagName('head')[0];
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = url;

            // Then bind the event to the callback function.
            // There are several events for cross browser compatibility.
            script.onreadystatechange = callback;
            script.onload = callback;

            // Fire the loading
            head.appendChild(script);
        }

          // used in install.js
        angular.module('Directives',[])
        .directive('typeaheadFocus', function () {
          return {
            require: 'ngModel',
            link: function (scope, element, attr, ngModel) {

              //trigger the popup on 'click' because 'focus'
              //is also triggered after the item selection
              element.bind('click', function () {

                var viewValue = ngModel.$viewValue;

                //restore to null value so that the typeahead can detect a change
                if (ngModel.$viewValue == ' ') {
                  ngModel.$setViewValue(null);
                }

                //force trigger the popup
                ngModel.$setViewValue(' ');

                //set the actual value in case there was already a value in the input
                ngModel.$setViewValue(viewValue || ' ');
              });

              //compare function that treats the empty space as a match
              scope.emptyOrMatch = function (actual, expected) {
                if (expected == ' ') {
                  return true;
                }
                return actual.indexOf(expected) > -1;
              };
            }
          };
        });


        angular.module('Directives',[]).directive('focusOnShow', function($timeout) {
      return {
          restrict: 'A',
          link: function($scope, $element, $attr) {
              if ($attr.ngShow){
                  $scope.$watch($attr.ngShow, function(newValue){
                      if(newValue){
                          $timeout(function(){
                              $element.focus();
                          }, 0);
                      }
                  })      
              }
              if ($attr.ngHide){
                  $scope.$watch($attr.ngHide, function(newValue){
                      if(!newValue){
                          $timeout(function(){
                              $element.focus();
                          }, 0);
                      }
                  })      
              }

          }
      };
  })


// used in push configuration page
        angular.module('Directives',[]).directive('file', function(){
              return {
                  scope: {
                      file: '='
                  },
                  link: function(scope, el, attrs){
                      el.bind('change', function(event){
                          var files = event.target.files;
                          var file = files[0];
                          scope.file = file ? file.name : undefined;
                          scope.$apply();
                      });
                  }
              };
          });

        angular.module('Directives',[]).filter('slice', function() {
  return function(arr, start, end) {
    return (arr || []).slice(start, end);
  };
});



      
})();


