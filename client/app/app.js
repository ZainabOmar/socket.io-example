angular.module('chatApp', [
  'chatApp.services',
  'chatApp.profile',
  'chatApp.auth',
  'ngRoute'
])
.config(function ($routeProvider, $httpProvider) {
  $routeProvider
    .when('/signin', {
      templateUrl: 'app/account/signin.html',
      controller: 'AuthController' 
    })
    .when('/signup', {
      templateUrl: 'app/account/signup.html',
      controller: 'AuthController'
    })    
    .when('/signout', {
      templateUrl: 'app/account/signout.html',
      controller: 'AuthController'
    })
    .when('/users/:user', {
      templateUrl: 'app/profile/profile.html',
      controller: 'ProfileController'
    })
    .otherwise({redirectTo:'/'});

})

