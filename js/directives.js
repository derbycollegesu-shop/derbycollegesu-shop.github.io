angular.module('app.directives', [])

// .directive('dynamicSlides', function () {
//         return {
//             require: ['^ionSlideBox'],
//             link: function (scope, elem, attrs, slider) {
//                 scope.$watch(function () {
//                     return scope.$eval(attrs.dynamicSlides).length;
//                 }, function () {
//                     slider[0].__slider.update();
//                 });
//             }
//         };
//     })


/*
This directive allows us to pass a function in on an enter key to do what we want.
 */
 .filter('filterStatus', function () {
  return function (items, statuses) {
    var filtered = [];
    angular.forEach(items, function(key, value){
        //console.log(key.id, key.status, statuses[key.status]);
        if(statuses[key.status] === true){
            this.push(key);
        }
    }, filtered);
    return filtered;
  };
})

.filter('userFilter', function () {
  return function (items, type, isAdmin) {
    var filtered = [];
    //console.log(isAdmin);
    angular.forEach(items, function(key, value){
        if(key.type === type){
          if(isAdmin) {
              if(key.admin) this.push(key);
          } else {
              this.push(key);
          }
        }
    }, filtered);
    return filtered;
  };
})
 
 
.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });
 
                event.preventDefault();
            }
        });
    };
})

.directive('blankDirective', [function(){

}]);