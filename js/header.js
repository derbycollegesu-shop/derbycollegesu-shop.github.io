/* !!! IMPORTANT: Rename "mymodule" below and add your module to Angular Modules above. */

angular.module('app.header', [])

.run( function($rootScope){
    var head = [];
    head.src = '<div class="logo"><img src="https://s3-eu-west-1.amazonaws.com/nusdigital/page/images/29053/twobythree/SU_General_Logo.PNG" /></div><div class="title"><p>Derby College Students\' Union</p></div>';
    
    $rootScope.header = head;
});

/* Ex.: 

.service('BlankService', [function(){

}]);

*/