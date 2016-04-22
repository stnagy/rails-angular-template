angular.module('rootApp', [
  'ui.router', // router
  'templates', // templates for rails
  'ngMaterial', // angular material
  'rootApp.Auth', // AuthService
  'rootApp.Home' // Home Module
])

// add the AuthInterceptor to the application
  .config(function($httpProvider) {
  return $httpProvider.interceptors.push("AuthInterceptor");
})

// simple abstract route
  .config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('rootApp', {
      url: '',
      abstract: 'true'
    });

    $urlRouterProvider.otherwise('/');
  }])

// handle requests to pages requiring authentication
// when the state of the application changes
  .run(function ($rootScope, $state, $urlRouter, AuthService) {
  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){

    // bypass AuthService if already authenticated by running through loop once
    // bypass AuthService is navigating to a page that doesn't require authentication
    if($rootScope.stateChangeBypass || !toState.authenticate ) {
      $rootScope.stateChangeBypass = false;
      return;
    }

    // prevent default action to prevent flicker
    event.preventDefault();

    // use AuthService to handle authentication check
    AuthService.isAuthenticated().then(function(isAuthenticated){
      if (toState.authenticate && !isAuthenticated){
        // User isn’t authenticated
        $state.transitionTo("rootApp.home");
      } else {
        $rootScope.stateChangeBypass = true;
        $state.go(toState, toParams);
      }
    });
  });
})

// simple theme provided by angular-material
  .config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('light-blue', {
    'default': '700', // by default use shade 400 from the pink palette for primary intentions
    'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
    'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
    'hue-3': 'A100'
  })
    .accentPalette('red', {
    'default': '700', // by default use shade 400 from the pink palette for primary intentions
    'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
    'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
    'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
  });
})

;