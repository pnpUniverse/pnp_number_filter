(function() {
	'use strict';
	angular.module('userApp').controller('getNumberCtrl', function($scope, numberService) {
		$scope.flag = false;
		$scope.numSet = [];
		$scope.getNumberDetails = function(){
			$scope.numArray = [];
			var saperateNumber = $scope.numSet.split(/\r?\n/);
    		numberService.filterDndNumber(saperateNumber).then(function (data) {		
    			$scope.contentArray = data.data;
    			angular.forEach($scope.contentArray, function(value,key){
    				if(value !=null){
    					$scope.numArray.push(value.phoneNumber);
    				}
    			});
    			$scope.content = $scope.numArray;
            });
		}
	});
})();