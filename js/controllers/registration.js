angular.module('newapp')
    .controller('RegistrationCtrl', function($scope, $http, $location) {
        $scope.redirect = function(user) {
            console.log(user);

            $http.post("http://45.113.136.146:7070/onesevenhome/user", user).
            then(function(resp) {
                console.log(resp)
            });
        }
    });
