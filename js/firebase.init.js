angular.module('firebaseConfig', ['firebase'])

.run(function($state, $rootScope, Gravatar, $ionicLoading){
    
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCk3gM4cdqbqUZrfOqOrxwpEmd-piKD984",
    authDomain: "dcsu-shop-orders.firebaseapp.com",
    databaseURL: "https://dcsu-shop-orders.firebaseio.com",
    storageBucket: "dcsu-shop-orders.appspot.com",
  };
  
  firebase.initializeApp(config);
    $rootScope.$on('$stateChangeSuccess', function(){
        console.log('State CHange to '+$state.current.name);
        if(($state.current.name !== 'login' && $state.current.name !== 'signup') && $rootScope.user.name === ''){
            $state.go('login');    
        }
    });
    firebase.auth().onAuthStateChanged(function(user) {
        $rootScope.user = [];
        $rootScope.badges = [];
        
        if (user && $state.current.name !== 'signup') {
            console.log('auth state changed triggered');
            firebase.database().ref('users/'+user.uid).once('value', function(snapshot){
                $rootScope.user = snapshot.val();
                $rootScope.user.gravImg = Gravatar.get($rootScope.user.email, 200);
                $rootScope.badges.notifications = 3;
                 console.log($rootScope.user);
                $ionicLoading.hide();
                if (($state.current.name === 'login') || ($state.current.name === 'signup')) {
                    angular.element(document.getElementsByTagName('ion-side-menu-content')).removeClass('hiddenMenu');
                    $state.go('tabsController.homePage');
                }
            });
        } else {
           if ($state.current.name !== 'login' && ($state.current.name !== 'signup')) $state.go('login');
        }
        
    });
});

/*

.service("TodoExample", ["$firebaseArray", function($firebaseArray){
    var ref = firebase.database().ref().child("todos");
    var items = $firebaseArray(ref);
    var todos = {
        items: items,
        addItem: function(title){
            items.$add({
                title: title,
                finished: false
            })
        },
        setFinished: function(item, newV){
            item.finished = newV;
            items.$save(item);
        }
    }
    return todos;
}])

*/