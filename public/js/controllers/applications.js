var applications = angular.module('Applications',['LocalStorageModule','ui.bootstrap']);
applications.controller('ApplicationController', ['$scope', '$rootScope', '$modal', '$http', '$location','$q', 'localStorageService', 'JettyService', 'UtilitiesService', 'JSONService',
	function($scope, $rootScope, $modal, $http, $location, $q, localStorageService, JettyService, UtilitiesService, JSONService) {
		$scope.apps = [];
		$scope.downloads = [];
		$scope.active_users = [];
		$scope.addapp_success = 0;
		$scope.firstname = $rootScope.user.firstname;
		var getapps = function(){
			var deferred = $q.defer();
			$http.post('/getapps', {'username' :$rootScope.user.username}).success(function(response) {
				// console.log(response)
				if(response == "null")
				{
					$scope.total_apps = 0;
				}
				else
				{
					$scope.apps = response;
					$scope.total_apps = $scope.apps.length;

					//Getting Current Installs for each app
					// for (var i = 0; i < $scope.apps.length; i++) {
					// 	var app=$scope.apps[i].app_secret;
					// 	if (app=='3974ba7380') 
					// 	{$scope.apps[i].CurrentUsers=UtilitiesService.numberFormat(84868);
					// 	 continue;};

					// 	$http({url: URL+'overview',method: 'GET',
					// 	 		params:{ domain: 'CurrentInstalls',app: $scope.apps[i].app_secret, i : i }
					//         }).success(function(data, status, headers, config) {
					//         	 if (data=="null") {data={x:0}};
					//         	$scope.apps[config.params.i].CurrentUsers=UtilitiesService.numberFormat(data.x) || "-";
					//         });
					// };

					// Getting Total Downloads for each app
					
					if ($rootScope.user.username=='hello@rocq.io') {
					$http({url: URL+'getusers',method: 'GET', params: 
					            { domain: 'TotalUsersAdmin',app: "all",index: 0}
					        }).success(function(data) {
					        	data.push({"x":"Demo","y":"136735","z":"Android"})
					        	for (var i = 0; i < $scope.apps.length; i++) {
					        		for (var j = 0; j < data.length; j++) {
					        			if (data[j].x==$scope.apps[i].application)
					        			 {
											$scope.apps[i].TotalDownload=UtilitiesService.numberFormat(data[j].y);
											break;
					        			 }
					        			 else
					        			 {
					        			 	$scope.apps[i].TotalDownload="-";
					        			 }
					        		}
								};
					        });
					    }
					    else{
								$scope.apps.forEach(function(item){
								$http({url: URL+'getusers',method: 'GET', params: 
						            { domain: 'TotalUsersAdmin',app: item.app_secret,index: 0}
						        }).success(function(data) {
						        	if (item.app_secret == '3974ba7380') {
						        		item.TotalDownload=UtilitiesService.numberFormat(136735) || "-";
						        	}
						        	else{
						        		item.TotalDownload=UtilitiesService.numberFormat(data[0].y) || "-";
						        	}
						        });
					})

					    }

					
					        

					//Getting MAU for each app
					if ($rootScope.user.username=='hello@rocq.io') {
							$scope.apps.forEach(function(item){

								JettyService.cummulative('AU',item.app_secret,1,30,2,"hll",'IST').then(function(data) {
		                  	 	if (data=="null") {data={x:0}};
							    item.CurrentUsers=UtilitiesService.numberFormat(data.x) || "-";
        					});
							})



							$scope.apps.forEach(function(item){
								if ($scope.endGap==1) {$scope.endGap=-1000;$scope.noDays+=1001};
							          if ($scope.endGap==0) {$scope.endGap=-1000;$scope.noDays+=1000};
							        JettyService.campaignstats(-1000,1030,item.app_secret).then(function(data) {
							        	if (data=="null") {data=[]};
							        	var total=0
							        	for (var i = 0; i < data.length; i++) {
							        		total+=Number(data[i].csc)
							        	};
							        	item.pn=UtilitiesService.numberFormat(total);
							        	item.campaigns=data.length;
        								})
							})
					};


					
					 
					

				}
				deferred.resolve();
			}).error(function(response) {
				$scope.error = response.message;
				deferred.resolve();
			});
			return deferred.promise;
		}

		$scope.openapp = function(app) {
			$rootScope.app = app;
			$location.path('/dashboard');
			localStorageService.set('app',$rootScope.app);
		};

		$scope.submitapp = function() {
			$scope.credentials.username = $rootScope.user.username;
			$scope.credentials.created_on = new Date(); 
			var promise = validate_appsecret();
			promise.then(function(data){
				$scope.credentials.app_secret = data;
				$scope.credentials.accesstype = 'Admin';
				$http.post('/addapp', $scope.credentials).success(function(response) {
				$scope.addapp_success = 1;
				$http.post('/sendmail', {username:'mohan.mahima9@gmail.com',sub:'New App',message:'A new app with app secret '+data+' is created on rocq.io<br>'+JSON.stringify($scope.credentials)}).success(function(response) {
								console.log("Email Sent");
							});
				}).error(function(response) {
					$scope.error = response.message;
				});
			})
		}

	  var validate_appsecret = function(){
	  	var deferred = $q.defer();
	  	appsecret = UtilitiesService.generateUUID();
	  	$http.post('/checkappsecret', {secret : appsecret}).success(function(response){
	  			if(response.available)
	  			{
	  				deferred.resolve(appsecret);
	  			}
	  			else
	  			{
	  				validate_appsecret();
	  			}
	  	})
	  	return deferred.promise;
	  };


	  $scope.is_demo = function(){
			if($location.absUrl().indexOf("demo")>-1 || $location.absUrl().indexOf("148.251.42.156")>-1
				|| $location.absUrl().indexOf("148.251.42.155")>-1)
			{
				return true;
			}
			return false;
		};
		

	  $scope.download_sdk = function(appsecret,os){
	  	if (os=='Windows') {
	  		return;
	  	};
		    $http.post('/downloadsdk',{app_secret:appsecret,os_type:os}).
		    success(function(data, status, headers, config) {
		      var anchor = angular.element('<a/>');
		      anchor.attr({
		        href: 'sdk/temp/files_'+appsecret+'.zip',
		        target: '_blank',
		        download: 'Rocq_sdk.zip'
		      })[0].click();
		     // $http.post('/deletezip',{app_secret:appsecret});
		    }).error(function(data, status, headers, config) {
		      alertify.error(data);
		    });
	  };

	  var getadminapps = function(){
			var deferred = $q.defer();
			$http.post('/getapps', {'username' :$rootScope.user.username,'accesstype':'Admin'}).success(function(response) {
				if(response == "null")
				{
					response=[];
				}
				else
				{
					$scope.adminapps = response;
				}
				for (var i = 0; i < $scope.adminapps.length; i++) {
					$scope.adminapps[i].x=$scope.adminapps[i].application;
				};
				deferred.resolve();
			}).error(function(response) {
				$scope.error = response.message;
				deferred.resolve();
			});
			return deferred.promise;
		}

	   $scope.grant_access = function(){
	   	if ($scope.newuser.username == $rootScope.user.username) {
	   		$("#error-msg").html("You cannot modify your own permissions.");
	   		$("#Error").show();
	   		// console.log("You cannot modify your own permissions.")
	   		return;
	   	};
	   		var apps=[];
			for (var i = 0; i < $scope.selectedapps.length; i++) {
				$scope.tuple={};
	  			$scope.tuple.username = $scope.newuser.username;
	  			$scope.tuple.accesstype = $scope.newuser.accesstype;
				$scope.tuple.created_on = new Date();
				$scope.tuple.app_secret = $scope.selectedapps[i].app_secret;
				$scope.tuple.application = $scope.selectedapps[i].application;
				$scope.tuple.category = $scope.selectedapps[i].category;
				$scope.tuple.ostype = $scope.selectedapps[i].ostype;
				apps.push($scope.tuple)
				// console.log(apps)
				
				};

				$http.post('/addapp', apps).success(function(data) {
					$http.post('/userexists', {username:$scope.newuser.username}).success(function(response) {
						// console.log(response)
						var permissions="<ul>";
							for (var i = 0; i < apps.length; i++) {
								permissions+= "<li>"+apps[i].application+" - "+apps[i].accesstype+"</li>";
						};
						permissions+= "</ul>";

						if (response=='yes') {
							$("#success-msg").html("Suceess! You have changed permissions for "+$scope.newuser.username);
							$scope.tuple.message='<b>Following are the new permissions granted by '+$rootScope.user.firstname+'</b>'+permissions
							$scope.tuple.sub=$rootScope.user.firstname+' has changed your permissions on Rocq!'
						}
						else{
							$("#success-msg").html("Suceess! An Email was sent at <b>"+$scope.newuser.username+"</b> to invite the user at rocQ.io");
							$scope.tuple.sub=$rootScope.user.firstname+' has invited you to join rocQ!'
							$scope.tuple.message='<html xmlns="http://www.w3.org/1999/xhtml"> <head> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/> <title>Emailer | Rocq </title> </head> <body style="background-color:#f3f3f3;"> <table width="650" border="0" cellspacing="0" cellpadding="0" style="margin:0 auto;"> <tr> <td>&nbsp;</td></tr><tr> <td><img src="http://dashboard.rocq.io/images/logo-rocq.png" width="127" height="48"/></td></tr><tr> <td>&nbsp;</td></tr><tr> <td> <table width="100%" border="0" cellspacing="0" cellpadding="0"> <tr> <td width="80%" style="background-color:#3566b0; height:5px;"></td><td width="20%" style="background-color:#f58220;"></td></tr></table> </td></tr><tr> <td style="background-color:#fff; padding:40px; border:1px solid #ddd;"> <p style="font-family:Arial, Helvetica, sans-serif; font-size:16px; color:#333; padding-bottom:15px;">Dear <strong>New User,</strong></p><p style="font-family:Arial, Helvetica, sans-serif; font-size:16px; color:#333; padding-bottom:15px; line-height:24px;"> You have been invited to be a part of rocQ Analytics. Once you join us, you can access the various analytical tools to track your users, discover their actions & engage them. To accept the invitation and signup, please click the Register button.</br></br></p><a href="http://dashboard.rocq.io/login" style="background-color:#f58220; color:#fff; font-size:16px; font-weight:normal; padding:10px; border:0; text-decoration:none; border-radius:4px; margin-bottom:20px;">Register</a> </td></tr><tr> <td align="center"> <p style="font-family:Arial, Helvetica, sans-serif; font-size:11px; color:#787878; padding:5px 0; ">Copyright © 2015 rocQ All rights reserved</p></td></tr></table> </body></html>'
						}
						$http.post('/sendmail', $scope.tuple).success(function(response) {
								console.log("Email Sent");
							});
						$("#Success").show();
		   				$("#Error").hide();
						$scope.list_grant_access();
					})
					
				}).error(function(response) {
					$("#error-msg").html("An error occured!");
	   				$("#Error").show();
	   				$("#Success").hide();
	   				$scope.list_grant_access();
					// $scope.error = response.message;
				});
	  };
	  
	  $scope.list_grant_access = function(){
	  	var granted_accesses=[];
	  	var promises=[];
	  	for (var i = 0; i < $scope.adminapps.length; i++) {
			var promise=$http.post('/getusers', {'app_secret' : $scope.adminapps[i].app_secret}).success(function(response) {
			granted_accesses=granted_accesses.concat(response)
	  		});
	  		promises.push(promise)
	  	}
	  	$q.all(promises).then(function(){
	  		
	  		for (var i = 0; i < granted_accesses.length; i++) {
	  			if (granted_accesses[i].username==$rootScope.user.username) {
	  				granted_accesses.splice(i,1);
	  				i--;
	  			};
	  		};
	  		// $scope.granted_accesses=granted_accesses;
	  		var freq = countfreq(granted_accesses)
	  		var users=freq[0];
	  		var frq = freq[1];
	  		console.log(freq)
	  		for (var i = 0; i < frq.length; i++) {
	  			// console.log(users[i])
	  			if (frq[i]==$scope.adminapps.length) {
	  				for (var j = 0; j < granted_accesses.length; j++) {
			  			if (granted_accesses[j].username==users[i].username) {
			  				granted_accesses.splice(j,1);
			  				j--;
			  			};
			  		};
			  		users[i].application='All Apps'
			  		granted_accesses.unshift(users[i])
	  			};
	  		};
	  		$scope.granted_accesses=granted_accesses;
	  		$scope.table1loaded=true;
	  		// console.log(granted_accesses)
	  	})
	  };

	  function countfreq(arr) {
		    var a = [], b = [], prev,prev2;

		    arr.sort(function(a,b) {return a.username.localeCompare(b.username)});
		    for ( var i = 0; i < arr.length; i++ ) {
		        if ( arr[i].username !== prev || arr[i].accesstype !== prev2) {
		            a.push(arr[i]);
		            b.push(1);
		        } else {
		            b[b.length-1]++;
		        }
		        prev = arr[i].username;
		        prev2 = arr[i].accesstype;
		    }

		    return [a, b];
		}

	   $scope.revoke_access = function(item){
	   	if (item.application!='All Apps') {
	   		$http.post('/deleteappentry', {'username' : item.username,'app_secret':item.app_secret}).success(function(response) {
				// $scope.granted_accesses[index].accesstype='Revoked'
				console.log(response)
				$("#success-msg").html("Suceess! You have revoked permissions for "+item.username+" for "+item.application);
				$("#Success").show();
		   		$("#Error").hide();
			});  
	   	}
	   	else {
			$http.post('/deleteappentry', {'username' : item.username}).success(function(response) {
				// $scope.granted_accesses[index].accesstype='Revoked'
				console.log(response)
				$("#success-msg").html("Suceess! You have changed permissions for "+item.username+" for all applications");
				$("#Success").show();
		   		$("#Error").hide();
			});
	   	}

			
	  };

	  $scope.init_for_invite_page=function(){
			getadminapps().then($scope.list_grant_access);
	  	}

	  	$scope.init_for_app_page=function(){
			getapps();
	  	}


	  	
	  
	}
]);