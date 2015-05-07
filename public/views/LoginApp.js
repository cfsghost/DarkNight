var app = angular.module('DarkNight', []);

app.controller('LoginController', function ($scope, $rootScope, $http) {
    $http.get('/members', {}).success(function(resp) {
        console.log(resp)
        $scope.members = resp.members;
    });

    $http.get('/awards', {}).success(function(resp) {
        console.log(resp)
    });
});