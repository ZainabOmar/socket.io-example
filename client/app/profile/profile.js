angular.module('chatApp.profile', [])

.controller('ProfileController', function ($scope, $routeParams, $window, $location, Users) {
  $scope.data = {};

  $scope.getProfile = function(){
	// Users.getProfile($routeParams.user).then(function(data) {
	// 	if(data.UserTypeName === 'cooker'){
	// 		$scope.data = data;	
	// 	} else {
	// 		$location.path('/');
	// 	}
	// });  	
  }
});