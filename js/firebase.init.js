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
    
    firebase.auth().onAuthStateChanged(function(user) {
        $rootScope.user = [];
        $rootScope.badges = [];
        if (user) {
            firebase.database().ref('users/'+user.uid).once('value', function(snapshot){
                $rootScope.user = snapshot.val();
                $rootScope.user.gravImg = Gravatar.get($rootScope.user.email, 200);
                $rootScope.badges.notifications = 3;
                 console.log($rootScope.user);
                
                // console.log($rootScope.user);
                $ionicLoading.hide();
                //if(myLoginPopup) myLoginPopup.close(); IONIC LOADING?
                if (($state.current.name === 'login') || ($state.current.name === 'signup')) $state.go('tabsController.homePage');
            });
        } else {
            
            //console.log('should redirect!');
           if ($state.current.name !== 'login') $state.go('login');
        }
        
    });
    
    
    logIn = function(useremail,userpassword){
        firebase.auth().signInWithEmailAndPassword(useremail, userpassword).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          //console.log(errorCode);
          // ...
        });
        
    };
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