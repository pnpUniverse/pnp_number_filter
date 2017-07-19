(function(){
	angular.module('userApp')
	.config(function($routeProvider,$locationProvider,$compileProvider,$httpProvider){
		var interceptor = ['$q', '$rootScope', function ($q, $rootScope) {
                    var service = {
                        'request': function (config, data, a) {
                            angular.element(document.getElementById("loader")).css({display: "block"});
                            return config;
                        },
                        "response": function (config) {
                            angular.element(document.getElementById("loader")).css({display: "none"});
                            return config;
                        },
                        "responseError": function (config) {
                            angular.element(document.getElementById("loader")).css({display: "none"});
                            return config;
                        },
                        "requestError": function (config) {
                            angular.element(document.getElementById("loader")).css({display: "none"});
                            return config;
                        }
                    };
                    return service;
                }];
            $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|blob):|data:image\//);
            $httpProvider.interceptors.push(interceptor);//*/
		$routeProvider
		.when('/login',{
			templateUrl : '/app/views/pages/login.html',
			controller: 'loginCtrl'
		}).when('/signUp',{
			templateUrl : '/app/views/pages/singUp.html',
			controller: 'signUpCtrl'
		}).when('/addNumber',{
			templateUrl : '/app/views/pages/addNumber.html',
			controller: 'addNumberCtrl'
		}).when('/getNumber',{
			templateUrl : '/app/views/pages/getNumber.html',
			controller: 'getNumberCtrl'
		}).when('/filterNumber',{
			templateUrl : '/app/views/pages/filterNumber.html',
			controller: 'filterNumberCtrl'
		}).when('/getNumberDetails',{
			templateUrl : '/app/views/pages/getNumberDetails.html',
			controller: 'getNumberDetailsCtrl'
		}).otherwise({redirectTo : '/login'});

		$locationProvider.html5Mode({
			enabled : true,
			requireBase : false
		});
	});
})();