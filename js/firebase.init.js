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
        if(user){ //USER LOGGED IN
            authService.setUser(user);
            $rootScope.user = authService.getUser();
            
            $ionicLoading.hide();
            
            angular.element(document.getElementsByTagName('ion-side-menu-content')).removeClass('hiddenMenu');
           // OLD = $ionicHistory.nextViewOptions({disableBack: true});$state.go(authService.getNextState().state, authService.getNextState.params); //redirect to prev state OR home page
            if($state.current.name ==='login') $state.go(authService.getNextState().state,authService.getNextState().params); // $state.go('tabsController.homePage'); // = NEW
            $ionicSideMenuDelegate.canDragContent(true);
        } else { //USER HAS BEEN LOGGED OUT
            authService.setUser(user);
            $ionicLoading.hide();
            $timeout(function(){
                authService.setNextState($state.current.name, $stateParams); 
                if($state.current.name !== 'login') $state.go('login'); 
            });
        }
    });
});