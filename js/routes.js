angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    

      .state('tabsController.homePage', {
    url: '/home',
    views: {
      'tab1': {
        templateUrl: 'templates/homePage.html',
        controller: 'homePageCtrl'
      }
    }
  })

  .state('tabsController.shop', {
    url: '/shop',
    views: {
      'tab2': {
        templateUrl: 'templates/shop.html',
        controller: 'shopCtrl'
      }
    }
  })

  .state('tabsController.adminPage', {
    url: '/admin',
    views: {
      'tab3': {
        templateUrl: 'templates/adminPage.html',
        controller: 'adminPageCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/tabs',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('login', {
    url: '/login',
	params: {
		prevState: "",
		prevParams: ""		
},
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl'
  })

  .state('tabsController.ordersPage', {
    url: '/orderspage',
    views: {
      'tab3': {
        templateUrl: 'templates/ordersPage.html',
        controller: 'ordersPageCtrl'
      }
    }
  })

  .state('tabsController.orderPage', {
    url: '/orderpage',
	params: {
		id: "4058"		
},
    views: {
      'tab3': {
        templateUrl: 'templates/orderPage.html',
        controller: 'orderPageCtrl'
      }
    }
  })

  .state('tabsController.productSections', {
    url: '/sections',
	params: {
		category: ""		
},
    views: {
      'tab2': {
        templateUrl: 'templates/productSections.html',
        controller: 'productSectionsCtrl'
      }
    }
  })

  .state('tabsController.products', {
    url: '/products',
	params: {
		section: ""		
},
    views: {
      'tab2': {
        templateUrl: 'templates/products.html',
        controller: 'productsCtrl'
      }
    }
  })

  .state('tabsController.myAccount', {
    url: '/myaccount',
    views: {
      'tab6': {
        templateUrl: 'templates/myAccount.html',
        controller: 'myAccountCtrl'
      }
    }
  })

  .state('tabsController.notifications', {
    url: '/notifications',
    views: {
      'tab4': {
        templateUrl: 'templates/notifications.html',
        controller: 'notificationsCtrl'
      }
    }
  })

  .state('tabsController.enrichment', {
    url: '/enrichment',
    views: {
      'tab5': {
        templateUrl: 'templates/enrichment.html',
        controller: 'enrichmentCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/tabs/notifications')


});