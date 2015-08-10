(function(){
	var authFactory=function($http){
		var factory={};
		factory.login=function(user){
			return $http.post('http://auth.lapinedaback.app/api/auth/login',user);
		};
		factory.register=function(user){
			return $http.post('http://auth.lapinedaback.app/api/auth/register',user);
		}
		factory.forgotPassword=function(email){

			return $http.post('http://auth.lapinedaback.app/api/auth/password/email',email);
		}
		factory.resendEmailVerifyAccount=function(data){
			return $http.post('http://auth.lapinedaback.app/api/auth/register/verify/resend_activation_email',data)
		}
		factory.resetPassword=function(data){
			return $http.post('http://auth.lapinedaback.app/api/auth/password/reset',data)
		}
		factory.verifyAccount=function(id,token){
			return $http.get('http://auth.lapinedaback.app/api/auth/register/verify/'+id+'/'+token);
		}
		return factory;
};
angular.module("lapinedaweb").factory('authFactory',authFactory);

}());