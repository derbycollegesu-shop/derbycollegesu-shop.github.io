/* !!! IMPORTANT: Rename "mymodule" below and add your module to Angular Modules above. */

angular.module('app.tabs', [])

.controller('tabsCtrl', function($scope, $state, $ionicTabsDelegate, $ionicHistory){ 
    var prevTab = 0;
    
    $scope.tabIt = function(tabStateName){   
        if(prevTab === $ionicTabsDelegate.selectedIndex()) {
            $ionicHistory.nextViewOptions({disableBack: true});
            $state.go(tabStateName);
            prevTab = $ionicTabsDelegate.selectedIndex();
        }
    };
});