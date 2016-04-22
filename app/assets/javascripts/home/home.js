angular.module('rootApp.Home', [
  'ui.router', // ui-router
  'templates', // angular templates
  'ngMaterial', // angular material
  'ngMdIcons', // angular material icons
  'rootApp.Auth', // our custom auth solution
  'rootApp.LocalStorage' // our custom local browser storage interface
])

  .config(function($stateProvider){
  $stateProvider
    .state('rootApp.home', {
    url: '/',
    views: {
      'main@': { // target the 'main' ng-view directive
        controller: 'HomeCtrl as homectrl',
        templateUrl: 'home/home.tmpl.html'
      } 
    }
  })

    .state('rootApp.loggedin', {
    url: '/loggedin',
    authenticate: true, // require authenticated user
    views: {
      'main@' : { // target the 'main' ng-view directive
        controller: 'LoggedInCtrl as loggedinctrl',
        templateUrl: 'home/loggedin.tmpl.html'        
      }
    }
  })
})

  .controller('HomeCtrl', function(AuthService, $state, $scope){
  var homectrl = this;
  homectrl.welcome_text = "This is sample welcome text. You can edit it in app/assets/javascripts/home/home.js";

  homectrl.login = function(){
    var user = AuthService.login($scope.user.email, $scope.user.password);
    user
      .then(function(){
      homectrl.alert = "";
      $state.go('rootApp.loggedin'); // navigate to the dashboard
    })
      .catch(function(){
      homectrl.alert = "Invalid login credentials. Please try again.";
    });
  } 

})

  .controller('LoggedInCtrl', function(AuthService, $state){
  var loggedinctrl = this;

  loggedinctrl.loggedin_text = "Successfully logged in. You can edit this text in app/assets/javascripts/home/home.js";

  loggedinctrl.logout = function(){
    AuthService.logout();
    $state.go('rootApp.home');
  }

})


;