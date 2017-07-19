(function() {
	'use strict';
	angular.module('userApp').controller('getNumberDetailsCtrl', function($scope, numberService, $sessionStorage, $location) {
		if(angular.isUndefined($sessionStorage.user)){
			$location.path('/login');
		}
		$scope.phoneNumber = '';
		$scope.flag = false;

		$scope.checkNumber = function(){
			if($scope.form.$valid){
				numberService.getNumberDetails($scope.phoneNumber).then(function (data) {
					if(data.data){
						$scope.flag = true;
                	    $scope.numberDetails = data.data;
					}else{
						$scope.flag = false;
					}
				});
			}
		}
	});

})();