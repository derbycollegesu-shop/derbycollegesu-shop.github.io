angular.module('app.controllers', [])
  
.controller('menuCtrl', ['$scope', '$location', '$state', '$stateParams', 'Gravatar', '$ionicHistory', '$rootScope', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $location, $state, $stateParams, Gravatar, $ionicHistory, $rootScope) {
    
}])
   
.controller('homePageCtrl', ['$scope', '$stateParams', '$timeout', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $timeout) {
     
    $scope.$on('$ionicView.beforeEnter',function(){
        $scope.$parent.$parent.badges = {};
        $scope.$parent.$parent.badges.notifications=4;
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
    // newKey = firebase.database().ref('shop/categories').push().key;
    // firebase.database().ref('shop/categories/'+newKey).set({'name':'Books','order':0});
    
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


}])
      
.controller('loginCtrl', ['$scope', '$stateParams', '$ionicLoading', '$ionicHistory', '$timeout', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicLoading, $ionicHistory, $timeout) {
   
   $scope.$on('$ionicView.beforeEnter', function(){
        $timeout(function(){
            $ionicHistory.removeBackView();
            $ionicHistory.clearHistory();
            $ionicHistory.clearCache();
            console.log('history cleared');
        });
       angular.element(document.getElementsByTagName('ion-side-menu-content')).addClass('hiddenMenu');
   });
   
   console.log($stateParams);
   
   //$rootScope.hideNav = true;
   
    // var myPopupScope = $rootScope.$new();
    // myPopupScope.userDetails = [];
    // myPopupScope.login2 = function() {
    //      if (myPopupScope.userDetails) logIn(myPopupScope.userDetails.useremail,myPopupScope.userDetails.userpassword);
    // };
    // myLoginPopup = $ionicPopup.show({
    //      template: '<input type = "text" placeholder = "Email Address" ng-model = "userDetails.useremail"><br/><input type = "password" placeholder = "Password" ng-enter="login2()" ng-model = "userDetails.userpassword">',
    //      title: 'Login',
    //      subTitle: 'You must be a registered user to view this information!',
    //      scope: myPopupScope,
    //      buttons: [
    //         {
    //           text: '<b>Save</b>',
    //           type: 'button-positive',
    //               onTap:  function(e) {
    //                  if (!myPopupScope.userDetails) {
    //                     e.preventDefault();
    //                  } else {
    //                     logIn(myPopupScope.userDetails.useremail,myPopupScope.userDetails.userpassword);
    //                     e.preventDefault();
    //                  }
    //             }
    //         }
    //      ]
    //   });
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
}])
   
.controller('signupCtrl', ['$scope', '$stateParams', '$ionicLoading', '$rootScope', '$state', 'Gravatar', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicLoading, $rootScope, $state, Gravatar) {
    $scope.userdetails = [];
    $scope.userdetails.staffLogon = false; //Make default student signup
    $scope.loginError = '';
    
    $scope.$on('$ionicView.beforeEnter', function(){
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
                    displayName: $scope.userdetails.name
                }).then (function(){
                    firebase.database().ref('users/'+user.uid).set({
                        key: user.uid,
                        email: user.email,
                        name: user.displayName,
                        displayName: user.displayName
                    }).then(function(){
                        $rootScope.user = user;
                        $rootScope.user.name = user.displayName;
                        $rootScope.user.gravImg = Gravatar.get(user.email, 200);
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
   
.controller('ordersPageCtrl', ['dataService', '$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function (dataService, $scope, $stateParams) {
    $scope.data = [];
    var newArr;
    firebase.database().ref('newOrders').on('value', function(snapshot){
        dataService.data = snapshot.val();
        var data = snapshot.val();
        newArr = Object.keys(data).map(function (key) { return data[key]; });
        $scope.data = newArr;
        $scope.$apply();
    });
    $scope.logout = function(){
        firebase.auth().signOut();
    }
    
}])
   
.controller('orderPageCtrl', ['dataService', '$scope', '$stateParams', 'Gravatar', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function (dataService, $scope, $stateParams, Gravatar) {
    $scope.data = [];
    $scope.data = dataService.data[$stateParams.id];
    // console.log($stateParams.id);
    // console.log(dataService.data[$stateParams.id].id);
    $scope.gravImg = Gravatar.get(dataService.data[$stateParams.id].billing.email, 100);
//     var d = $scope.data.line_items;
    
//     console.log(JSON.parse($scope.data.line_items));
//     d = "{" + d + "}";
//     d = d.replace(/{u'/g,"{");
//     d = d.replace(/': u'/g,": ");
//     d = d.replace(/': u/g,": ");
//     d = d.replace(/': /g,/\": /);
//     d = d.replace(/', u'/g,"\", \"");
//     d = d.replace(/, u'/g,", \"");
//     d = d.replace(/\n\n/g,"},{");
//     d = d.replace(/\n/g,"\",\"");
//     d = d.replace(/NU:/g,"NU");
//     d = d.replace(/: /g,"\":\"");
//     d = d.replace(/{/g,"{\"");
//     d = d.replace(/}/g,"\"}");
    
//   // console.log(d);
//     console.log(d);
//     d = JSON.parse("["+d+"]");
     $scope.items = [];
    $scope.items = dataService.data[$stateParams.id].line_items;
    //console.log(d);

}])
   
.controller('productSectionsCtrl', ['$scope', '$stateParams', 'shopFactory', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, shopFactory) {
    // newKey = firebase.database().ref('shop/products').push().key;
    // firebase.database().ref('shop/products/'+newKey).set({'name':'pen','price':0.1});
    // firebase.database().ref('shop/categories/products/'+newKey).set({'name':'pen','price':0.1});
    
    // newKey = firebase.database().ref('shop/products').push().key;
    // firebase.database().ref('shop/products/'+newKey).set({'name':'USB Stick 8gb','price':6});
    // firebase.database().ref('shop/categories/products/'+newKey).set({'name':'USB Stick 8gb','price':6,'category':});

    // newKey = firebase.database().ref('shop/categories/' + $stateParams.category + '/sections').push().key;
    // firebase.database().ref('shop/categories/' + $stateParams.category + '/sections/'+newKey).set({'name':'Stationary','key':newKey});
    // firebase.database().ref('shop/sections/'+newKey).set({'name':'Stationary','key':newKey,'category':$stateParams.category});
    // newKey = firebase.database().ref('shop/categories/' + $stateParams.category + '/sections').push().key;
    // firebase.database().ref('shop/categories/' + $stateParams.category + '/sections/'+newKey).set({'name':'Stationary','key':newKey});
    // firebase.database().ref('shop/sections/'+newKey).set({'name':'IT Materials','key':newKey,'category':$stateParams.category});
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
        alert(d);
    };

}])
   
.controller('myAccountCtrl', ['$scope', '$stateParams', 'Gravatar', '$rootScope', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, Gravatar, $rootScope) {
    $scope.logout = function(){
        firebase.auth().signOut();
    };
}])
   
.controller('notificationsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
 