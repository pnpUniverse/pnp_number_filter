(function() {
  'use strict';
  angular.module('userApp').controller('filterNumberCtrl', function($scope,numberService) {
    $scope.mobileNumber = '';
    $scope.flag = false;
    $scope.file = {};
    $scope.keyArray = ['areaCode','phoneNumber','prefrence','opsType','phoneType'];
    $scope.filterNumber = function(){
      numberService.filterFile($scope.file.upload).then(function(data){
        if(data.data.success){
            $scope.flag = true;
            $scope.responseContent = data.data;
            if(data.data.availablefile){
              numberService.getAvailable().then(function(data){
                $scope.availableArray = [];
                var values = data.data.split('\n');
                for(var index in values){
                  var value = values[index].replace(/["]/g,"").split(',');
                  $scope.availableArray.push($scope.combineObject($scope.keyArray,value));
                }
                if(values.length == $scope.availableArray.length){
                  $scope.availableCount = $scope.availableArray.length-1;
                  $scope.availableFileArray = $scope.availableArray;
                  
                  numberService.deleteAvailable().then(function(data){
                    console.log(data);
                  });

                }
              });
            }
            if(data.data.notavailablefile){
              numberService.getNotAvailable().then(function(data){
                $scope.notAvailableArray = [];
                var notData = data.data.split('\n');
                for(var data in notData){
                  var notAvailableData = notData[data].replace(/["]/g,"").split(',');
                  $scope.notAvailableArray.push($scope.combineObject($scope.keyArray,notAvailableData));
                }
                if(notData.length == $scope.notAvailableArray.length){
                  $scope.notAvailableCount = $scope.notAvailableArray.length-1;
                  $scope.notavailableFileArray = $scope.notAvailableArray;
                  
                  numberService.deleteNotAvailable().then(function(data){
                    console.log(data);
                  });

                }
              });
            }
          $scope.success = true;
        }else{
          $scope.success = false;
        }
      });
    }
    $scope.combineObject = function( keys, values)
    {
      var obj = {};      
      if ( keys.length != values.length)
        return null;
      for (var index in keys)
          obj[keys[index]] = values[index];
        return obj;        
    };

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