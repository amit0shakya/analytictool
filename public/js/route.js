(function() {
	var rocq = angular.module('Rocq', ['ngRoute','Controllers','Services','ui.bootstrap']);
    rocq.config(function($routeProvider,$locationProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider
            // route for the dashboard page
            .when('/', {
                templateUrl : 'partials/dashboard.html'
            })
            // route for the trends page
            .when('/trends', {
                templateUrl : 'partials/trends.html'
            })
            // route for the newusers page
            .when('/newusers', {
                templateUrl : 'partials/newusers.html'
            })
            // route for the user engagement page
            .when('/user-engagement', {
                templateUrl : 'partials/user-engagement.html'
            })
            // route for the acquisition page
            .when('/acquisition', {
                templateUrl : 'partials/acquisition.html'
            })
            // route for the overall analysis page
            .when('/overall-analysis', {
                templateUrl : 'partials/overall-analysis.html'
            })
            // route for the activeusers page
            .when('/activeusers', {
                templateUrl : 'partials/activeusers.html'
            })
            // route for the sessions page
            .when('/sessions', {
                templateUrl : 'partials/sessions.html'
            })
            // route for the cohort page
            .when('/cohort', {
                templateUrl : 'partials/cohort.html'
            })
            // route for the installs page
            .when('/installs', {
                templateUrl : 'partials/installs.html'
            })
            // route for the uninstalls page
            .when('/uninstalls', {
                templateUrl : 'partials/uninstalls.html'
            })
            // route for the device page
            .when('/device', {
                templateUrl : 'partials/device.html'
            })
            // route for the network page
            .when('/network', {
                templateUrl : 'partials/network.html'
            })
             // route for the location page
            .when('/location', {
                templateUrl : 'partials/location.html'
            });
    });
})();