(function() {
	'use strict';
	angular.module('userApp').controller('addNumberCtrl', function($scope,numberService) {
		$scope.mobileNumber = '';
		$scope.flag = false;
    $scope.file = {};
    $scope.addNumber = function(){
      numberService.uploadFile($scope.file.upload).then(function(data){
        console.log("Web Service Response is : ",data);
        $scope.flag = true;
        if(data.data.success){
          $scope.successResponseContents = data.data.message;
          $scope.success = true;
        }else{
          $scope.success = false;
          $scope.errorResponseContents = data.data.message;
        }
      });
    }
	}).directive('fileModel', ['$parse', function ($parse) {
      return {
        restrict: 'A',
          link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
              scope.$apply(function(){
                modelSetter(scope, element[0].files[0]);
              });
            });
          }
        };
      }
    ]);
})();