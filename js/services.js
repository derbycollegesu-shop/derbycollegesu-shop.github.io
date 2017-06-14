angular.module('app.services', [])

.run(function(){
    
})

.factory('BlankFactory', [function(){

}])

.service('authService', ['$state','$rootScope','$ionicPopup', function($state, $rootScope, $ionicPopup){
    var user = [];
    var userLoggedIn = false;
    var myLoginPopup;
    //console.log($state);
    
    
    firebase.auth().onAuthStateChanged(function(user) {
        //console.log(user);
        if (user) {
            //console.log('user is now logged in and popup should close');
            userLoggedIn = true;
            myLoginPopup.close();
            $state.go('ordersPage');
        } else {
            userLoggedIn = false;
            //var popUped = true;
            if($state.current.name !== 'logIn'){
                $state.go('logIn');
            }
            var myPopupScope = $rootScope.$new();
            myPopupScope.userDetails = [];
            myLoginPopup = $ionicPopup.show({
                 template: '<input type = "text" ng-model = "userDetails.useremail"><br/><input type = "password" ng-model = "userDetails.userpassword">',
                 title: 'Login',
                 subTitle: 'You must be a registered user to view this information!',
                 scope: myPopupScope,
                 buttons: [
                    {
                       text: '<b>Save</b>',
                       type: 'button-positive',
                          onTap: function(e) {
                             if (!myPopupScope.userDetails) {
                                //don't allow the user to close unless he enters model...
                                   e.preventDefault();
                             } else {
                                 //console.log(myPopupScope.userDetails);
                                logIn(myPopupScope.userDetails.useremail,myPopupScope.userDetails.userpassword);
                                   e.preventDefault();
                                //return myPopupScope.userDetails.model;
                             }
                          }
                    }
                 ]
              });
            
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
    
    return {
        user: user,
        loggedIn: userLoggedIn,
        logIn: logIn
    };
}])

.factory('dataService', [function(){
    var data = [];
    
    
    return {data: data};
}]);