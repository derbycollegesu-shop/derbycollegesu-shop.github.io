/* !!! IMPORTANT: Rename "mymodule" below and add your module to Angular Modules above. */

angular.module('app.tabs', [])

.controller('tabsCtrl', function($scope, $state, $ionicTabsDelegate, $ionicHistory){ 
    var prevTab = 0;
    
    $scope.setPrevTab = function(){
        prevTab = $ionicTabsDelegate.selectedIndex();
    };
    
    $scope.tabIt = function(tabIndex, tabStateName){   
        //console.log('Clicked Tab ' + tabIndex);
        //console.log($ionicTabsDelegate.selectedIndex());
        if(prevTab === tabIndex) {
            //console.log('trying to go back to ' + tabStateName);
            $ionicHistory.nextViewOptions({disableBack: true});
            $state.go(tabStateName);
            //console.log('trying to go back');
        } else {
            $ionicTabsDelegate.select(tabIndex);
        }
    };
});