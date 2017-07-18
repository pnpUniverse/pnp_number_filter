var app = angular.module('userApp');
app.directive('splitArray', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attr, ngModel) {

            function fromUser(text) {
                return text.split("\n");
            }

            function toUser(array) {                        
                return array.join("\n");
            }

            ngModel.$parsers.push(fromUser);
            ngModel.$formatters.push(toUser);
        }
    };
});