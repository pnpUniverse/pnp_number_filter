(function() {
	angular.module('userApp').factory('numberService',function($http, $q) {
		var obj = {};
		var url = 'http://localhost:8080/api';
		
		obj.addNumber = function(user) {
			var deferred = $q.defer();
			var req = {
 				method: 'POST',
 				url: 'api/addNumber',
 				headers: {
					'Content-Type': 'application/json'
				},
				data: { mobileNumber: user }
			}
			
			$http(req).then(function successCallback(response){
				deferred.resolve(response);
			}),function errorCallback(response) {
				console.log(response)
				deferred.reject();
			}
			return deferred.promise;
		}

		obj.filterFile = function(file) {
			var deferred = $q.defer();
			var fd = new FormData();
		    fd.append('myFile', file);
        	$http.post('filterFileData', fd, {
            	transformRequest: angular.identity
            	,headers: {'Content-Type': undefined}
        	}).then(function successCallback(response){
        		deferred.resolve(response);
        	}),function errorCallback(error){
        		deferred.reject();
        	}
			return deferred.promise;
		}

		obj.getNumberfromDB = function(user){
			var req = {
				method: 'GET',
 				url: 'api/getNumber?mobileNumber='+user,
				headers: {
   					'Content-Type': undefined
				}
			}
			var deferred = $q.defer();
			$http(req).then(function successCallback(response){
				deferred.resolve(response);
			}), function errorCallback(response) {
    			console.log(response);
    			deferred.reject();
  			}
  			return deferred.promise;
		}

		obj.getNumberDetails = function(number){
			var req = {
				method: 'GET',
 				url: 'api/getContactByNumber?phoneNumber='+number,
				headers: {
   					'Content-Type': undefined
				}
			}
			var deferred = $q.defer();
			$http(req).then(function successCallback(response){
				deferred.resolve(response);
			}), function errorCallback(response) {
    			console.log(response);
    			deferred.reject();
  			}
  			return deferred.promise;
		}

		obj.getContactDetails = function(){
			var req = {
				method: 'GET',
 				url: 'api/getContact',
				headers: {
   					'Content-Type': undefined
				}
			}
			var deferred = $q.defer();
			$http(req).then(function successCallback(response){
				deferred.resolve(response);
			}), function errorCallback(response) {
    			console.log(response);
    			deferred.reject();
  			}
  			return deferred.promise;
		}

		obj.uploadFile = function(file) {
			var deferred = $q.defer();
			var fd = new FormData();
		    fd.append('myFile', file);
        	$http.post('api/fileData', fd, {
            	transformRequest: angular.identity
            	,headers: {'Content-Type': undefined}
        	}).then(function successCallback(response){
        		deferred.resolve(response);
        	}),function errorCallback(error){
        		deferred.reject();
        	}
			return deferred.promise;
		}

		obj.filterDndNumber = function(numArray) {
			var deferred = $q.defer();
			var req = {
 				method: 'POST',
 				url: 'api/filterNumber',
 				headers: {
					'Content-Type': 'application/json'
				},
				data: {'num':numArray}
			}
			
			$http(req).then(function successCallback(response){
				deferred.resolve(response);
			}),function errorCallback(response) {
				console.log(response)
				deferred.reject();
			}

			return deferred.promise;
		}

		obj.getAvailable = function(){
			var req = {
				method: 'GET',
 				url: 'getAvailable',
				headers: {
   					'Content-Type': undefined
				}
			}
			var deferred = $q.defer();
			$http(req).then(function successCallback(response){
				deferred.resolve(response);
			}), function errorCallback(response) {
    			console.log(response);
    			deferred.reject();
  			}
  			return deferred.promise;
		}

		obj.getNotAvailable = function(){
			var req = {
				method: 'GET',
 				url: 'getnotAvailable',
				headers: {
   					'Content-Type': undefined
				}
			}
			var deferred = $q.defer();
			$http(req).then(function successCallback(response){
				deferred.resolve(response);
			}), function errorCallback(response) {
    			console.log(response);
    			deferred.reject();
  			}
  			return deferred.promise;
		}

		obj.deleteAvailable = function(){
			var req = {
				method: 'GET',
 				url: 'deleteAvailable',
				headers: {
   					'Content-Type': undefined
				}
			}
			var deferred = $q.defer();
			$http(req).then(function successCallback(response){
				deferred.resolve(response);
			}), function errorCallback(response) {
    			console.log(response);
    			deferred.reject();
  			}
  			return deferred.promise;
		}

		obj.deleteNotAvailable = function(){
			var req = {
				method: 'GET',
 				url: 'deletenotAvailable',
				headers: {
   					'Content-Type': undefined
				}
			}
			var deferred = $q.defer();
			$http(req).then(function successCallback(response){
				deferred.resolve(response);
			}), function errorCallback(response) {
    			console.log(response);
    			deferred.reject();
  			}
  			return deferred.promise;
		}

		return obj;
	});
})();