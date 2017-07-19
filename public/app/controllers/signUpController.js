(function() {
	'use strict';
	angular.module('userApp').controller('signUpCtrl', function($scope, numberService, $location, $window) {
                $scope.confirmPassword = '';
                $scope.passwordFlag = false;
                $scope.invalidFile = false;
                $scope.termCheck = false;
                $scope.duplicateEmail = false;
                $scope.duplicateMobile = false;

                $scope.user = {
                        userName : '',
                        password : '',
                        name : '',
                        mobileNumber : ''
                }

                $scope.matchPassword = function(){
                        if($scope.user.password != $scope.confirmPassword){
                                $scope.passwordFlag = true;
                        }else{
                                $scope.passwordFlag = false;
                        }
                }

                $scope.checkEmail = function(){
                        numberService.checkEmail($scope.user.userName).then(function (data) {
                           if(data.data.message == null){
                                $scope.duplicateEmail = false;
                           }else{
                                $scope.duplicateEmail = true;
                           }
                        });
                }

                $scope.checkNumber = function(){
                        numberService.checkNumber($scope.user.mobileNumber).then(function (data) {
                           if(data.data.message == null){
                                $scope.duplicateMobile = false;
                           }else{
                                $scope.duplicateMobile = true;
                           }
                        });       
                }

                $scope.register = function (){
                        if($scope.form.$valid){
                                if($scope.passwordFlag == false && $scope.termCheck && $scope.duplicateEmail == false && $scope.duplicateMobile == false){
                                        numberService.register($scope.user).then(function (data) {
                                                if(data.data.success){
                                                        $location.path('/login');
                                                }else{
                                                        $scope.invalidFile = true;
                                                        $scope.errorResponseContents = data.data.message;
                                                }
                                        });
                                }
                        }
                }
	});
})();