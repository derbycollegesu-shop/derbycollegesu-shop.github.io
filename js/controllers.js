angular.module('app.controllers', [])
  
.controller('ordersPageCtrl', ['authService', 'dataService', '$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function (authService, dataService, $scope, $stateParams) {
    $scope.data = [];
    var newArr;
    firebase.database().ref('orders').on('value', function(snapshot){
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
   
.controller('orderPageCtrl', ['authService', 'dataService', '$scope', '$stateParams', 'Gravatar', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function (authService, dataService, $scope, $stateParams, Gravatar) {
    $scope.data = [];
    $scope.data = dataService.data[$stateParams.id];
    // console.log($stateParams.id);
    // console.log(dataService.data[$stateParams.id].id);
    $scope.gravImg = Gravatar.get($scope.data.billing__email, 100);
    var d = $scope.data.line_items;
    d = "{" + d + "}";
    d = d.replace(/\n\n/g,"},{");
    d = d.replace(/\n/g,"\",\"");
    d = d.replace(/NU:/g,"NU");
    d = d.replace(/: /g,"\":\"");
    d = d.replace(/{/g,"{\"");
    d = d.replace(/}/g,"\"}");
    
   // console.log(d);
    d = JSON.parse("["+d+"]");
    $scope.items = [];
    $scope.items = d;
    //console.log(d);

}])
   
.controller('logInCtrl', ['$scope', '$stateParams', 'authService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, authService) {
    $scope.logOut = function(){
        firebase.auth().signOut();
    };
}])
 