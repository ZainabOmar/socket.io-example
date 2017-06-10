angular.module('chatApp.main', [])

.controller('MainController', function ($scope, $window, $location, Users) {
  $scope.data = {};

  	Users.getProfile().then(function(data){
  		// $scope.data.cookings = data;
  	});
})