(function(){
var rsendEmailVerifyUserCtrl=function($http)
{

	var vm=this;
	$http.post('http://auth.lapinedaback.app/api/auth/register/verify/resend_activation_email',vm.resendEmailData)
	.success(function(data){


		console.log("ssok",data);
		vm.message="ss00s";
	});

};
angular.module("lapinedaweb").controller('rsendEmailVerifyUserCtrl',rsendEmailVerifyUserCtrl);


}())