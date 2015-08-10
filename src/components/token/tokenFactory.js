var tokenFactory=function($http){
	var factory={};
	factory.getToken=function(){
		return $http.get('http://auth.lapinedaback.app/api/auth/csrf_token');
	}
	return factory;
};
angular.module('lapinedaweb').factory('tokenFactory',tokenFactory);