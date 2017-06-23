angular.module('app.controllers', [])
  
.controller('menuCtrl', ['$scope', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope) {
    var pinned = false;
    $scope.permaMenu = function(){
        if(!pinned) {
            pinned = true;
            angular.element(document.getElementsByTagName('ion-side-menu-content')).addClass('permaMenu');
            angular.element(document.getElementById('permaPin')).attr('src','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAADv0lEQVRoQ82ajZENQRDH+yIgA0RwRIAIuAxOBIiAiwARIAJEgAgQgZOBi4D6Xc3/VRszu9Mz+/G2St29d7s7/Zv+7nFix3O9MLNnSZznZvYuItpJ5OYV731tZk+z9z+JwBwDyGMz+2BmV2bG77fN7G2CaobZG+Smmf00M35iTmiG6zwKszfIZzN7YGafkja8dYVg9gTBsV8lk8Kcfhd8sBlmL5C7ZvYtCX5mZh8nAkkTzB4g+AMmBcwbF3KnguIszB4gCrU/kn+UTKoENQmzNYhCLYLeM7PvwdxUhdkSpBZqgyzl0LwliELt12RSUYDJ0LwGCE58I62KH+ADLaE2CubN7GwUBHN5lJIZiY3P+QWIvp8Ltb0wl70gCEaR97KwsrTAn0h0t9I971PpERV26n7lo6seEFRKRtYuY/MkNP5dFlblPhb8siRB2hTJcREFoSoFhAsANLK0gHO8bAxyEMq5rjUdAVHU4eGLilnNCTH6d4QHAhjKfoLIdQMWASF5naYk9rBS5I0KWns+1wLWgGUcTDkCwsswo61hiIY0XtIC5qy+5QAeAeGhLWFYy/fx/2nBqy8KshUMWsAXCN9cvnssml8PyJowuRbISfjCbHHZC7IGDLtPZJQWQpFxBGRpGMwJkF8pR8xqYdRHchtdKgCgCSYqhNQ70Tg+qhGtR0gkwnCxk715hgKTyjksV/iBwk75rg+zoEjshSFP3U8bESp9RkEwB6YhGrBRLowkzV1A/DTED9hGfIZNoVLGR0qVdNV1RjSiSrg0DQEG84qa2Z8kaViu8ANpId+6EjbzUInj+6arxWcOTVKl05wMZD0give8OG9d8yqV0oLM3FJoanO6OskoiHfuPPOyo5gbP3VEgPO2+oz6neajhJGEKGfMRzq+/cVnCMneWedgpGU2oDbQXsy05NzkCnZdo076Zh2ZYRb8XhqDTsFog0L1VY9GNENix+TcCEbDw+emUrtiZoATHLq1weItPuKPAGS/fAcEZuDhWkokrxnMT9Vul29owTkQP6/VEYCf8EUn6lrXw/Bd6/FCd0JUJEFgRSWNg7rCpJNEMGhFo50WjRbvmdKIzjEwHZmSQuthDNO98sIP1kDycwhN9LqanoVlbtYIu45JqV7iMxe5AxNoPWHaQv7DGrlGEJ6YrkiiG4edcW2qHISQ6h3vn7Hk2sKMvN+D+HaVdzaPYkYEWOpZgfh2lXfTKOHwR+kPJXhAvHNzT3e9s9Tu9rwHEBVs+ANamPpfCD1rbPIMIOrumkaTm0jVschfqfgJ4V03DZ8AAAAASUVORK5CYII=');
        } else {
            pinned = false;
            angular.element(document.getElementsByTagName('ion-side-menu-content')).removeClass('permaMenu');
            angular.element(document.getElementById('permaPin')).attr('src','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAACrklEQVRoQ82a/TUFMRDF7+tACTpABeiADqgAFaACXgWoABWgAlTg6YAOnOskzsrbJDOTbLI5x/HHy9cvM3d2MrsLzKedAzh12zkDcKvZ2kLTecK+1wBOgvmPNTBzADkAcB85JDFMb5ANAB8A+D/WRDC9QZ4A7AlcNgvTE4TCvhJA+C5JmF4g2wBeFRBZmB4g1ANdijCWNmqZHiBjoVYLtAbTGiQVaotgWoJIQq0ZpiWINNSaYKYA2R3s5BvAm8uhNKFWC3NYCrIJgBun7/OvV1tZQejvPOGjXjsP1v22gDBLvcjkR635llqQmxlZwR/WHfekAZkq6litx0BC137gBBoQRp8t66qVx704iJWfVwNCgT93hqEVqE+mOf+aBoQDe8KsWWFIogXpBcNixJoVSkFawrw7LVCfyWaxiJ9waje7dHrIMfz+XgIylWU+XbqTtUIN1xrOMYVl1AesHhCxc22YHZc1i9yqhmt59/qqHJr33TOrGQjTeFZDfK22lmWagoTVEF8QqAHTFGQsE64Fo9aueoBz2lSVsAaMel/qAa5Wy5Q+1Q5dem1xs0fLtVkLIi3p8KHGQGB5aGYL1mMnqAVhhMqVOpkfsRDxd1dQhGam6TwAhnNV04BIrrm8dlI/YxuRuJkqv7KkKLxSEiTVJC6RgjFbQ/pkz70C4Ab4skaa5MVgJAcRPcica3FR6sILN5yIeiCE1qdDmN9KiEoUQeccSKpyUrq4h2FQKK5SpkBi7zHoShS06j14yWlLxsZAYuI2XXokGyntMwZCcdOlwlfGrGLQBbR6KN2jaHwIEhP3cvB5hWji1p1CEH6BMBTeLPWQS1FYweOHLb6JSzGtTz8FEr6kZAZKwc9SDzGQUNzmfKenZagRn9H+K9P33JRlbYL4HImuJM2XLGtNOuYHoM2N4m/3F6wAAAAASUVORK5CYII=');
        }
    }
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
                        $rootScope.user.gravImg = user.photoURL;
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
   
.controller('myAccountCtrl', ['$scope', '$ionicPopup', '$timeout', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $ionicPopup, $timeout) {
    
    $scope.changePasswordPopup = function(){
        $scope.passChange = {};
        $scope.passChange.error = '';
        
        passChangePopup = $ionicPopup.show({
          template: '<p ng-if="passChange.error!==\'\'"><font color="red">{{passChange.error}}</font></p><input type="password" ng-model="passChange.password" placeholder="Password"><input type="password" ng-model="passChange.confirm" placeholder="Confirm Password">',
          title: 'Change Password',
          subTitle: 'Please enter a new password / confirmation to change your password',
          scope: $scope,
          buttons: [
           { 
               text: 'Cancel', 
               onTap: function(){
                   passChangePopup.close();
               }
           },
           {
             text: '<b>Save</b>',
             type: 'button-positive',
             onTap: function(event) { 
                 event.preventDefault(); 
                 if($scope.passChange.password !== $scope.passChange.confirm || $scope.passChange.password === ''){
                     $scope.passChange.error = 'Please enter correct details.';
                 } else {
                     user = firebase.auth().currentUser;
                     user.updatePassword($scope.passChange.password).then(function() {
                          console.log('Password Changed!');
                          passChangePopup.close();
                          donePopup = $ionicPopup.alert({
                              title: 'Password Changed!', // String. The title of the popup.
                              cssClass: '', // String, The custom CSS class name
                              subTitle: 'Your password has been updated!', // String (optional). The sub-title of the popup.
                              template: '', // String (optional). The html template to place in the popup body.
                              templateUrl: '', // String (optional). The URL of an html template to place in the popup   body.
                              okText: '', // String (default: 'OK'). The text of the OK button.
                              okType: '', // String (default: 'button-positive'). The type of the OK button.
                            });
                          $timeout(function(){
                              donePopup.close();
                          }, 3000);
                        }, function(error) {
                          console.log('Problem changing password!');
                          errorPopup = $ionicPopup.alert({
                              title: '', // String. The title of the popup.
                              cssClass: '', // String, The custom CSS class name
                              subTitle: '', // String (optional). The sub-title of the popup.
                              template: '', // String (optional). The html template to place in the popup body.
                              templateUrl: '', // String (optional). The URL of an html template to place in the popup   body.
                              okText: '', // String (default: 'OK'). The text of the OK button.
                              okType: '', // String (default: 'button-positive'). The type of the OK button.
                            });
                          $timeout(function(){
                              errorPopup.close();
                          }, 3000);
                        });
                 }
             }
           }
          ]
        });  
    };
    $scope.logout = function(){
        firebase.auth().signOut();
    };
}])
   
.controller('notificationsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('enrichmentCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
    $scope.enrichmentTeams = [];
    $scope.enrichmentActivities = [];
    
    $scope.enrichmentActivities = [
        {
            teamlogo: "http://www.derby-college.ac.uk/images/EvolveLogo.png",
            title: "Basket Ball",
            description: "Come along and play basket ball ...",
            cost: "£2.00",
            places: "35",
            when: "Wed @ 2pm"
        },
        {
            teamlogo: "http://shop.dcsu.co.uk/wp-content/uploads/2014/09/SU-General-Logo-Transparent-Background-2.png",
            title: "I Heart SU's Campaign",
            description: "We are looking for volunteers to help out run this campaign",
            cost: "FREE",
            places: "10",
            when: "Thurs all day"
        },
        {
            teamlogo: "http://www.footfalladvertising.co.uk/wp-content/uploads/2017/01/dc-1.jpg",
            title: "CV Writing Skills Forum",
            description: "Brush up on your CV Writing skills here",
            cost: "FREE",
            places: "20",
            when: "Friday 4pm"
        }
        ];
    
    $scope.enrichmentTeams = [
        {
            title: "Evolve Team",
            logo: "http://www.derby-college.ac.uk/images/EvolveLogo.png",
            text: "The evolve team ..."
        },
        {
            title: "Students' Union",
            logo: "http://shop.dcsu.co.uk/wp-content/uploads/2014/09/SU-General-Logo-Transparent-Background-2.png",
            text: "Derby College Students' Union"
        },
        {
            title: "Work Experience Team",
            logo: "http://www.footfalladvertising.co.uk/wp-content/uploads/2017/01/dc-1.jpg",
            text: "Text about the Work Experience Team"
        },
        {
            title: "Personal Coach Team",
            logo: "http://www.footfalladvertising.co.uk/wp-content/uploads/2017/01/dc-1.jpg",
            text: "Text about the Personal Coach Team"
        }
    ];

}])
 