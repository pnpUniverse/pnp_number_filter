(function() {
	'use strict';
	angular.module('userApp').controller('checkNumberCtrl', function($scope, numberService) {
		$scope.mobileNumber = '';
		$scope.flag = false;

		$scope.checkNumber = function(){
			if($scope.form.$valid){
				numberService.getNumberfromDB($scope.mobileNumber).then(function (data) {				
                	if(data.data.success){
                		$scope.success = true;
                		$scope.flag = true;
                		$scope.successMessage = data.data.message;
                		$scope.mobileNumber = '';
                		$scope.form.$setPristine();
                	}else{
                		$scope.flag = true;
                		$scope.success = false;
                		$scope.errorMessage = data.data.message;
                	}
                });
			}
		}
	});

})();