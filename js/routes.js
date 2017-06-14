angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    

      .state('ordersPage', {
    url: '/page1',
    templateUrl: 'templates/ordersPage.html',
    controller: 'ordersPageCtrl'
  })

  .state('orderPage', {
    url: '/orderpage',
	params: {
		id: ""		
},
    templateUrl: 'templates/orderPage.html',
    controller: 'orderPageCtrl'
  })

  .state('logIn', {
    url: '/loginpage',
    templateUrl: 'templates/logIn.html',
    controller: 'logInCtrl'
  })

$urlRouterProvider.otherwise('/page1')


});