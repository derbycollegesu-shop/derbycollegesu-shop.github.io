angular.module('app.services', [])

.run(['$rootScope', function($rootScope){
    $rootScope.user = [];
    $rootScope.user.name = "User Name";
    $rootScope.user.email = "example@example.com";
    $rootScope.user.gravImg = "https://www.gravatar.com/avatar/23463b99b62a72f26ed677cc556c44e8.jpg?s=100";
}])

.factory('shopFactory', [function(){
    var shopCategories = [];
    var shopSections = [];
    var shopProducts = [];

    return {
        categories: shopCategories,
        sections: shopSections,
        products: shopProducts
    };
}])


.factory('dataService', [function(){
    var data = [];
    
    
    return {data: data};
}]);