angular.module('rootApp.LocalStorage', [])
  .service("LocalStorageService", function(){
  var service = this;

  service.methods = {

    // see whether browser supports localStorage
    hasStorage: function() {
      try {
        localStorage.setItem('test', '7');
        if (localStorage.getItem('test') === '7') {
          localStorage.removeItem('test');
          return true;
        }
      } catch (er) {}
      return false;
    },

    // set key, value pair in local storage
    set: function(key, value){
      try {
        localStorage.setItem(key, value);
      } catch (er) {
        return false;
      }
    },

    // clear localStorage
    clear: function(){
      try {
        localStorage.clear();
        return true;
      } catch (er) {
        return false;
      }
    },

    // check whether key is in localStorage
    isKey: function(key) {
      try {
        if (localStorage.getItem(key)) {
          return true;
        }
        return false;
      } catch (er) {
        return false;
      }
    },

    // return value of key from localStorage
    get: function(key) {
      try {
        return localStorage.getItem(key);
      } catch (er) {
        return false;
      }
    },
    
     // destroy a key, value pair (e.g. to logout)
    destroy: function(key) {
      try {
        return localStorage.removeItem(key);
      } catch (er) {
        return false;
      }
    }
  }
  return service
});