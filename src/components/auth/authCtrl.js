(function(){
var authCtrl=function(authFactory,tokenFactory,$stateParams){
	var vm=this;
	vm.token=$stateParams.token;
	vm.login=login;
	function login(){
		tokenFactory.getToken()
		.success(function(data){
			console.log(data);
			vm.loginData.scrf_token=data.csrf_token;
			authFactory.login(vm.loginData)
			.success(function(res){
				console.log(res,"ss");
			})
		})
	}
	vm.register=register;
	function register(){
		tokenFactory.getToken()
		.success(function(data){
			console.log(data);
			vm.registerData.scrf_token=data.scrf_token;
			authFactory.register(vm.registerData)
			.success(function(data){
				console.log(data.success);
				if(data.success)
				{
					vm.message=data.messages;
				}
				else
				{
					console.log(data);
					vm.message=data.messages;
				//	for(i=0;i<data.errors[0].length)
				}
			})

		})
	}
	vm.resendEmailVerifyAccount=resendEmailVerifyAccount;
	function resendEmailVerifyAccount()
	{
		tokenFactory.getToken()
		.success(function(data){
			vm.resendEmailverifyData.scrf_token=data.scrf_token;
			authFactory.resendEmailVerifyAccount(vm.resendEmailverifyData)
			.success(function(data){
				console.log(data);
			});
		});
	}
	vm.forgotPassword=forgotPassword;
	function forgotPassword(){
		tokenFactory.getToken()
		.success(function(data){
			vm.forgotPasswordData.csrf_token=data.csrf_token;
			authFactory.forgotPassword(vm.forgotPasswordData)
			.success(function(data){
				console.log("data",data);
			})
		})
	}
	vm.resetPassword=resetPassword;
	function resetPassword()
	{

			console.log(vm.resetPasswordData);
			vm.resetPasswordData.token=vm.token;
			authFactory.resetPassword(vm.resetPasswordData)
			.success(function(data){
				console.log(data);
			})
	//	})
	}

	// vm.verifyAccount=verifyAccount;
 // 	function verifyAccount()
 // 	{
 // 		console.log($stateParams);
	// 	authFactory.verifyAccount($stateParams.id,$stateParams.token)
	// 	.success(function(data){
	// 		console.log(data)

	// 		vm.result=data;

	// 		console.log(data);
	// 		vm.message=$sce.trustAsHtml(data.messages);
	// 	})
	// }
	// (function init() {
	// 	console.log("ssssssssss")
 //         vm.verifyAccount();
 //       })();



};
angular.module('lapinedaweb').controller('authCtrl',authCtrl);

}())