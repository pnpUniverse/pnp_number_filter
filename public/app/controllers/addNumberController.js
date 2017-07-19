(function() {
	'use strict';
	angular.module('userApp').controller('addNumberCtrl', function($scope,numberService, $rootScope, $sessionStorage, $location) {
    if($sessionStorage.user){
      $rootScope.showHeader = true;
    }else{
      $rootScope.showHeader = false;
      $location.path('/login');
    }
		$scope.mobileNumber = '';
		$scope.flag = false;
    $scope.invalidFile = false;
    $scope.file = {};
    $scope.addNumber = function(){
      if($scope.file.upload.type == 'text/csv'){
        numberService.uploadFile($scope.file.upload).then(function(data){
          $scope.flag = true;
          if(data.data.success){
            $scope.successResponseContents = data.data.message;
            $scope.success = true;
          }else{
            $scope.success = false;
            $scope.errorResponseContents = data.data.message;
          }
        });
      }else{
        $scope.invalidFile = true;
        $scope.errorResponseContents = 'invalid file type please upload CSV file only';
        return;
      }
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