angular.module('firebaseConfig', ['firebase'])

.run(function($state, $rootScope, Gravatar, $ionicLoading, $stateParams, $timeout, $ionicHistory,$ionicTabsDelegate){
    
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCk3gM4cdqbqUZrfOqOrxwpEmd-piKD984",
    authDomain: "dcsu-shop-orders.firebaseapp.com",
    databaseURL: "https://dcsu-shop-orders.firebaseio.com",
    storageBucket: "dcsu-shop-orders.appspot.com",
  };
  
  firebase.initializeApp(config);
});