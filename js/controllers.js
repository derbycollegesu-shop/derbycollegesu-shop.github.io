angular.module('app.controllers', [])
  
.controller('menuCtrl', ['$scope', 'authService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, authService) {
    $scope.auth = [];
    $scope.auth = authService;
}])
   
.controller('homePageCtrl', ['$scope', '$stateParams', '$timeout', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $timeout) {
     
    $scope.$on('$ionicView.beforeEnter',function(){
        //$scope.$parent.$parent.badges = {};
        //$scope.$parent.$parent.badges.notifications=4;
        $timeout(function() {$scope.$apply();});
    });
    
    $scope.data = [];
    
    $scope.options = {
        autoplay: 2000,
        loop: false,
        speed: 2000,
        slidesPerView: 'auto',
        pagination: 'none',
        autoplayDisableOnInteraction: false,
        centeredSlides: true,
        effect: 'fade'
      };
    
    $scope.$on("$ionicSlides.sliderInitialized", function(event, data){
      // data.slider is the instance of Swiper
      $scope.slider = data.slider;
    });
    
    $scope.$on("$ionicSlides.slideChangeStart", function(event, data){
      //console.log('Slide change is beginning');
    });
    
    $scope.$on("$ionicSlides.slideChangeEnd", function(event, data){
      // note: the indexes are 0-based
      $scope.activeIndex = data.slider.activeIndex;
      $scope.previousIndex = data.slider.previousIndex;
    });
}])
   
.controller('shopCtrl', ['$scope', '$stateParams', 'shopFactory', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, shopFactory) {
    
    $scope.shop = [];
    $scope.shop = shopFactory;
    
    firebase.database().ref('shop/categories').orderByChild('order').once('value', function(snapshot){
        shopFactory.categories = snapshot.val();
        $scope.$apply();
    });
}])
   
.controller('adminPageCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
    //alert(location.search);



}])
      
.controller('loginCtrl', ['$scope', '$stateParams', '$ionicLoading', '$ionicHistory', '$timeout', '$location', '$ionicSideMenuDelegate', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicLoading, $ionicHistory, $timeout, $location, $ionicSideMenuDelegate) {
   
   $scope.$on('$ionicView.beforeEnter', function(){
        $timeout(function(){
            $ionicHistory.removeBackView();
            $ionicHistory.clearHistory();
            $ionicHistory.clearCache();
            
            console.log('history cleared');
        });
        $ionicSideMenuDelegate.canDragContent(false);
        angular.element(document.getElementsByTagName('ion-side-menu-content')).addClass('hiddenMenu');
    });
   
    $scope.userdetails = [];
    $scope.userdetails.staffLogon = false;
    $scope.loginError = '';
    
    $scope.login = function(){
        if(!$scope.userdetails || !$scope.userdetails.collegeid || !$scope.userdetails.password){
            $scope.loginError = "Enter all details!";
            return;
        }
        $ionicLoading.show({
            template: '<p>Loading...</p><ion-spinner></ion-spinner>'
        });
        var useremail = $scope.userdetails.collegeid+'@';
        if (!$scope.userdetails.staffLogon) useremail += 'student.';
        useremail += 'derby-college.ac.uk';
        firebase.auth().signInWithEmailAndPassword(useremail, $scope.userdetails.password).catch(function(error) {
            $ionicLoading.hide();
            // Handle Errors here.
            console.log('err=' + error.message);
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') $scope.loginError = "Wrong Password!";  
            if (errorCode === 'auth/user-not-found') $scope.loginError = "User not found!";
        });
    };
    
    //console.log($location.search());
}])
   
.controller('signupCtrl', ['$scope', '$stateParams', '$ionicLoading', '$rootScope', '$state', 'Gravatar', '$ionicSideMenuDelegate', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicLoading, $rootScope, $state, Gravatar, $ionicSideMenuDelegate) {
    $scope.userdetails = [];
    $scope.userdetails.staffLogon = false; //Make default student signup
    $scope.loginError = '';
    
    $scope.$on('$ionicView.beforeEnter', function(){
        $ionicSideMenuDelegate.canDragContent(false);
        angular.element(document.getElementsByTagName('ion-side-menu-content')).addClass('hiddenMenu');
    });
   
    $scope.signup = function(){
        if(!$scope.userdetails || !$scope.userdetails.collegeid || !$scope.userdetails.password || !$scope.userdetails.name){
            $scope.loginError = "Enter all details!";
            return;
        }
        $ionicLoading.show({
            template: '<p>Loading...</p><ion-spinner></ion-spinner>'
        });
        var useremail = $scope.userdetails.collegeid+'@';
        if (!$scope.userdetails.staffLogon) useremail += 'student.';
        useremail += 'derby-college.ac.uk';
        firebase.auth().createUserWithEmailAndPassword(useremail, $scope.userdetails.password)
            .then(function(user){
                $rootScope.user = [];
                user.updateProfile({
                    displayName: $scope.userdetails.name,
                    photoURL: Gravatar.get(user.email, 200)
                }).then (function(){
                    firebase.database().ref('users/'+user.uid).set({
                        key: user.uid,
                        email: user.email,
                        name: user.displayName,
                        displayName: user.displayName
                    }).then(function(){
                        $rootScope.user = user;
                        $rootScope.user.name = user.displayName;
                        $rootScope.user.gravImg = user.photoURL
                        angular.element(document.getElementsByTagName('ion-side-menu-content')).removeClass('hiddenMenu');
                        $ionicLoading.hide();
                        $state.go('tabsController.homePage');
                    });
                });
                $ionicLoading.hide();
                console.log(user);
            })
            .catch(function(err){
                $ionicLoading.hide();
                console.log(err);
            });
   };
}])
   
.controller('ordersPageCtrl', ['$scope', '$stateParams', 'dataService', '$timeout', '$ionicLoading', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, dataService, $timeout, $ionicLoading) {
    $ionicLoading.show({
        template: '<p>Loading...</p><ion-spinner></ion-spinner>'
    });
    firebase.database().ref('orderList').on('value', function(snapshot){
        $scope.orders = [];
        $scope.orders = Object.keys(snapshot.val()).map(function (key) { return snapshot.val()[key]; });
        $timeout(function(){
            $scope.$apply();
            $ionicLoading.hide();
        });
    });
    $scope.logout = function(){
        firebase.auth().signOut();
    };
    
}])
   
.controller('orderPageCtrl', ['$state', '$scope', '$stateParams', 'Gravatar', '$timeout', '$ionicLoading', 'authService', '$location', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($state, $scope, $stateParams, Gravatar, $timeout, $ionicLoading, authService, $location) {
    var p = $location.search(angular.extend($location.hash().substring($location.hash().indexOf('?') + 1)));
    console.log('params: ' +p);
    if($stateParams.id === '' && p.id === null){
        //$state.go('tabsController.ordersPage');
        return;
    }
    
    console.log($stateParams);

    $ionicLoading.show({
        template: '<p>Loading...</p><ion-spinner></ion-spinner>'
    });
    firebase.database().ref('newOrders/' + $stateParams.id).once('value', function(snapshot){
        $scope.order = [];
        $scope.order = snapshot.val();
        $scope.gravImg = Gravatar.get($scope.order.billing.email, 100);
        // for (var i=0; i< $scope.order.coupon_lines.length(); i++){
        //   console.log($scope.order); 
        // }
        //console.log($scope.order.coupon_lines[0].coupon.discount.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' }));
        $timeout(function(){
            $scope.$apply();
            $ionicLoading.hide();
        });
    });
        
}])
   
.controller('productSectionsCtrl', ['$scope', '$stateParams', 'shopFactory', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, shopFactory) {
    console.log($stateParams);
    $scope.shop = [];
    $scope.shop = shopFactory;
    firebase.database().ref('shop/categories/' + $stateParams.category + '/sections').once('value', function(snapshot){
        shopFactory.sections = snapshot.val();
        $scope.$apply();
    });
    
}
])
   
.controller('productsCtrl', ['$scope', '$stateParams', 'shopFactory', '$ionicListDelegate', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, shopFactory,$ionicListDelegate) {
    $scope.shop = [];
    $scope.shop = shopFactory;
    firebase.database().ref('shop/sections/' + $stateParams.section + '/products').once('value', function(snapshot){
        shopFactory.products = snapshot.val();
        $scope.$apply();
    });
    
    $scope.addToCart = function(d){
        $ionicListDelegate.closeOptionButtons();
        //alert(d);
    };

}])
   
.controller('myAccountCtrl', ['$scope', 'authService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, authService) {
    $scope.user = [];
    $scope.user = authService.getUser();
    console.log($scope.user);
    $scope.logout = function(){
        firebase.auth().signOut();
    };
}])
   
.controller('notificationsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
 