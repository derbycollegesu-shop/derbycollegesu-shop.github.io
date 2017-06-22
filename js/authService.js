/* !!! IMPORTANT: Rename "mymodule" below and add your module to Angular Modules above. */

angular.module('authModule', [])

.run(function($state, $rootScope, Gravatar, $ionicLoading, $stateParams, $timeout, $ionicHistory, $ionicTabsDelegate, $ionicSideMenuDelegate, $location, authService){
    
    var authChanging = false;
    $rootScope.user = [];
    console.log('Derby College SU project v1.3');
   
    $rootScope.$on('$stateChangeStart', function(evt, toState, toParams, fromState, fromParams) {
        if((toState.name !== 'login' && toState.name !== 'signup') && !authService.isAuthenticated() && !authChanging){
            evt.preventDefault();
           
            //toParams = $location.search(angular.extend($location.hash().substring($location.hash().indexOf('?') + 1)));
            
            authService.setNextState(toState.name, toParams); 
            $timeout($state.go('login'));
        } else {
            
            //authService.setNextState(, toParams); 
        }   // REdIRECT TO LOGIN PAGE IF NOT THERE AND USER NOT LOGGED IN
    });
    
    firebase.auth().onAuthStateChanged(function(user) {
        authChanging= true;
        console.log('prevented state change');
        $ionicLoading.show({
            template: '<p>Loading it...</p><ion-spinner></ion-spinner>'
        });
        if(user){ //USER LOGGED IN
            authService.user = user;
            authService.setUser(user);
            $ionicLoading.hide();
            //HIDE BACK BUTTON
            console.log('going' + authService.getNextState().state);
            
            //console.log('going');
            angular.element(document.getElementsByTagName('ion-side-menu-content')).removeClass('hiddenMenu');
            //console.log('going');
            $ionicHistory.nextViewOptions({disableBack: true});
            //console.log('going');
            $state.go(authService.getNextState().state, authService.getNextState.params);//redirect to prev state OR home page

            $ionicSideMenuDelegate.canDragContent(true);
        } else { //USER HAS BEEN LOGGED OUT
            $ionicLoading.hide();
            // User NOT logged in and not at login = direct there.
            if($state.current.name !== 'login') $state.go('login'); 
        }
        authChanging = false;
    });
})


.service('authService', [function(){
    var user_authenticated = false;
    var current_user = [];
    var logging_out = false;
    var logging_in = false;
    var nextState = 'tabsController.homePage'; // State in which to move on to when logged in
    var nextParams = {}; // Params to pass on redirect
    
    return {
        setUser: function(user){
            if(user){   
                current_user = user;
                console.log(current_user);
                user_authenticated = true;
                return true;
            }
            console.log('user not saved!');
            return false;
        },
        getUser: function(){
            return current_user;
        },
        user: current_user,
        isAuthenticated: function(){
            return user_authenticated;
        },
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
