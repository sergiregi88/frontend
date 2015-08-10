(function(){
	var routes=function($stateProvider,$urlRouterProvider){
		//$urlRouterProvider.otherwise('/home');
		$stateProvider
		.state('home',{
			url:'/home',
			controller:"initCtrl as vm",
			templateUrl:"components/init/init.html",
		})
		.state('login',{
			url:'/login',
			controller:"authCtrl as vm",
			templateUrl:"components/auth/partial-login.html",
		})
		.state('register',{
			url:'/register',
			controller:'authCtrl as vm',
			templateUrl:'components/auth/partial-register.html',
		})
		.state('forgot-password',{
			url:'/password/reset/send',
			controller:'authCtrl as vm',
			templateUrl:'components/auth/partial-forgotPassword.html',
		})
		.state('reset',{
			url:'/password/reset/{token}',
			controller:'authCtrl as vm',
			templateUrl:'components/auth/partial-resetPassword.html',
		})
		.state('erifyMessage',{
			url:'/register/verify/{id}/{token}',
			  controller:'AccountCtrl as vm',
			templateUrl:'components/auth/partial-register.html',
		})
		.state('resend_email_active_account_registration',{
			url:'/register/verify/resend_email',
			controller:'authCtrl as vm',
			templateUrl:'components/auth/partial-resendEmailVerifyAccount.html',
		})


	};
	angular.module('lapinedaweb').config(routes);
}())