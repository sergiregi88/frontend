(function(){
	var authFactory=function($http){
		var factoria={};
		factoria.login=function(user){
			return $http.post('/api/auth/login')
		};
		return factoria;
	}



}())