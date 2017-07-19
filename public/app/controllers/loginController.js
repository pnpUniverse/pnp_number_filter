(function() {
	'use strict';
	angular.module('userApp').controller('loginCtrl', function($scope, numberService, $sessionStorage, $location, $rootScope) {
                if($sessionStorage.user){
                        $rootScope.showHeader = true;
                }else{
                        $rootScope.showHeader = false;
                }

                $scope.user = {
                        userName : '',
                        password : ''
                }

                $scope.login = function (){
                        if($scope.form.$valid){
                                numberService.login($scope.user).then(function (data) {
                                        if(data.data.success){
                                                $sessionStorage.user = data.data.message;
                                                $location.path('/addNumber');
                                        }
                                });
                        }
                }

                $scope.logout = function (){
                        if($sessionStorage.user){
                                delete $sessionStorage.user;
                                $rootScope.showHeader = false;
                                $location.path('/login');
                        }
                }
	});
})();