// module containing all auth-related submodules
angular.module('rootApp.Auth', [
  'rootApp.Auth.AuthService',
  'rootApp.Auth.AuthInterceptor'
]);

//AuthService factory used to login to Rails API
angular.module('rootApp.Auth.AuthService', [
  'rootApp.Auth.AuthEvents',
  'rootApp.Auth.AuthToken'
])

  .factory("AuthService", function($http, $q, $rootScope, $location, AuthToken, AuthEvents) {
  return {

    // function to log user in
    login: function(email, password) {

      // use $q service to control promises
      var d = $q.defer();
      $http.post('/auth', {
        email: email,
        password: password
      }).success(function(resp) {
        AuthToken.set(resp.auth_token);
        $rootScope.$broadcast(AuthEvents.loginSuccess);
        d.resolve(resp.user);
      }).error(function(resp) {
        $rootScope.$broadcast(AuthEvents.loginFailed);
        d.reject(resp.error);
      });
      return d.promise;
    },

    // function to check if user is logged in
    isAuthenticated: function(){
      var d = $q.defer();
      $http.post('/auth/check_login', {})
        .success(function(resp) {
        d.resolve(true);
      }).error(function(resp){
        d.resolve(false);
      });
      return d.promise;
    },
    
    // logout by destroying the auth token
    logout: function(){
      AuthToken.destroy();     
    }
  };
});


// AuthToken service for storing auth_token in localStorage
angular.module('rootApp.Auth.AuthToken', [
  'rootApp.LocalStorage'
])

  .service("AuthToken", function(LocalStorageService, $rootScope){
  var this_service = this;  

  // set the auth_token in local storage, returns boolean
  this_service.set = function(auth_token){
    return LocalStorageService.methods.set('auth_token', auth_token);
  };

  // get the auth_token from localStorage, return auth_token object or null
  this_service.get = function(){
    return LocalStorageService.methods.get('auth_token');
  };
  
  this_service.destroy = function(){
    return LocalStorageService.methods.destroy('auth_token');
  };

  return this_service;
});

// broadcast constants
angular.module('rootApp.Auth.AuthEvents', [])
  .constant('AuthEvents', {
  loginFailed: 'loginFailed',
  loginSuccess: 'loginSuccess',
  notAuthenticated: 'notAuthenticated',
  notAuthorized: 'notAuthorized',
  sessionTimeout: 'sessionTimeout'
});

// authentication interceptor to incercept http requests and attach token

angular.module('rootApp.Auth.AuthInterceptor', [
  'rootApp.Auth.AuthToken',
  'rootApp.Auth.AuthEvents'
])

  .factory("AuthInterceptor", function($q, $injector) {
  return {

    // This will be called on every outgoing http request
    request: function(config) {
      var AuthToken = $injector.get("AuthToken");
      var token = AuthToken.get();
      config.headers = config.headers || {};
      if (token) {
        config.headers.Authorization = "Bearer " + token;
      }
      return config || $q.when(config);
    },

    // This will be called on every incoming response that has en error status code
    responseError: function(response) {
      var AuthEvents = $injector.get('AuthEvents');
      var matchesAuthenticatePath = response.config && response.config.url.match(new RegExp('/auth'));
      if (!matchesAuthenticatePath) {
        $injector.get('$rootScope').$broadcast({
          401: AuthEvents.notAuthenticated,
          403: AuthEvents.notAuthorized,
          419: AuthEvents.sessionTimeout
        }[response.status], response);
      }
      return $q.reject(response);
    }
  };
});