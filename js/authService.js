/* !!! IMPORTANT: Rename "mymodule" below and add your module to Angular Modules above. */

angular.module('authModule', [])

.run(function($state, $rootScope, Gravatar, $ionicLoading, $stateParams, $timeout, $ionicHistory, $ionicTabsDelegate, $ionicSideMenuDelegate, $location, authService){
    
    $rootScope.user = [];
    console.log('Derby College SU project v1.4');
    // $timeout();
    
    $rootScope.$on('$stateChangeStart', function(evt, toState, toParams, fromState, fromParams) {
        if((toState.name !== 'login' && toState.name !== 'signup') && authService.isAuthed() === false) 
        {
            evt.preventDefault();
            authService.setNextState(toState.name, toParams); 
            $timeout($state.go('login'));
        }
    });
    
    
})


.service('authService', [function(){
    var current_user = [];
    var logging_out = false;
    var logging_in = false;
    var nextState = 'tabsController.homePage'; // State in which to move on to when logged in
    var nextParams = {}; // Params to pass on redirect
    var is_authed = null;
    
    return {
        isAuthed: function(){
            return is_authed;
        },
        setUser: function(user){
            if(user){   
                current_user = {
                    isAdmin: false,
                    displayName: user.displayName,
                    email: user.email,
                    authenticated: true,
                    emailVerified: user.emailVerified,
                    photoURL: user.photoURL,
                    uid: user.uid
                };
                //console.log(current_user);
                ///user_authenticated = true;
                //console.log('getting user details');
                is_authed = true;
                firebase.database().ref('admins/' + user.uid).once('value', function(snapshot){
                    current_user.isAdmin = (snapshot.val().admin === true);
                }).then(function(){
                    //console.log('IsAdmin = ' + is_admin);
                }).catch(function(){
                    //console.log('not admin');
                });
                
                return true;
            }
            is_authed = false;
            console.log('user not saved!');
            return false;
        },
        getUser: function(){
            return current_user;
        },
        //user: current_user,
        // isAuthenticated: function(){
        //     return user_authenticated;
        // },
        setNextState: function(toState, toParams){
            if(toState === 'login') toState = 'tabsController.homePage';
            console.log('nextState: ', toState);
            console.log('nextParams: ', toParams);
            nextState = toState;
            nextParams = toParams;
        },
        getNextState: function(){
            return {'state': nextState, 'params': nextParams};
        }
    };
}]);

