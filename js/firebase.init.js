angular.module('firebaseConfig', ['firebase'])

.run(function($state, $rootScope, Gravatar, $ionicLoading, $stateParams, $timeout, $ionicHistory,$ionicTabsDelegate, authService){
    
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCk3gM4cdqbqUZrfOqOrxwpEmd-piKD984",
    authDomain: "dcsu-shop-orders.firebaseapp.com",
    databaseURL: "https://dcsu-shop-orders.firebaseio.com",
    storageBucket: "dcsu-shop-orders.appspot.com",
  };
  
  firebase.initializeApp(config);
  
  firebase.auth().onAuthStateChanged(function(user) {
        $ionicLoading.show({
            template: '<p>Loading it...</p><ion-spinner></ion-spinner>'
        });
        authService.setUser(user);
        if(user){ //USER LOGGED IN
            $rootScope.user = authService.getUser();
            
            angular.element(document.getElementsByTagName('ion-side-menu-content')).removeClass('hiddenMenu');
            $ionicLoading.hide();
            if($state.current.name ==='login') $state.go(authService.getNextState().state,authService.getNextState().params); 
            $ionicSideMenuDelegate.canDragContent(true);
        } else {
            $timeout(function(){
                $ionicLoading.hide();
                
                if($state.current.name !== 'login') {
                    authService.setNextState($state.current.name, $stateParams); 
                    $state.go('login'); 
                }
            });
        }
    });
});