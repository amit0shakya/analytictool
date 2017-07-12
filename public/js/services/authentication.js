// Authentication service for user variables
var authentication = angular.module('Services',[]);
authentication.factory('Authentication', [
	function() {
		var _this = this;

		_this._data = {
			user: window.user
		};

		return _this._data;
	}
]);