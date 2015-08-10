(function(){
	angular.module('lapinedaweb').controller('AccountCtrl',function($scope,$stateParams, authFactory,$sce){
		var vm=this;
		console.log($stateParams);
		authFactory.verifyAccount($stateParams.id,$stateParams.token)
		.success(function(data){
			console.log(data);
			if(data.errorvalidation)
				vm.result="danger";
			else{
				if(data.error)
				{	vm.result="danger";
					vm.message=$sce.trustAsHtml(data.messages);
					console.log("sss")}
				else
					vm.result="success";
					vm.message=data.messages;

			}
		})

	});

}());