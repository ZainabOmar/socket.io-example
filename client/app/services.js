angular.module('chatApp.services', [])

.factory('Users', function ($http) {
  return {

    getProfile : function(username){
      return $http({
        method: 'GET',
        url: '/api/users/'+ username,
        })
        .then(function (resp) {
          console.log(resp.data);
          return resp.data;
        }).catch(function(err){
          if(err) {
            console.log(err);
            throw err;
          }
      });
    }
  }
})

.factory('Auth', function ($http, $location, $window, $rootScope) {
  // Don't touch this Auth service!!!
  // it is responsible for authenticating our user
  // by exchanging the user's username and password
  // for a JWT from the server
  // that JWT is then stored in localStorage as 'com.shortly'
  // after you signin/signup open devtools, click resources,
  // then localStorage and you'll see your token from the server
  var signin = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signin',
      data: user
    })
    .then(function (resp) {
      return resp.data;
    });
  };          

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('com.chatApp');
  };

  var signout = function () {
    $window.localStorage.removeItem('com.chatApp');
    $window.localStorage.removeItem('user.chatApp');
    $rootScope.isLoggedIn = false;
    $rootScope.UserName = undefined;
    $rootScope.UserID = undefined;
    $location.path('/signin');
  };

  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
})
