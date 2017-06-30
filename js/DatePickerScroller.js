/* !!! IMPORTANT: Rename "mymodule" below and add your module to Angular Modules above. */

angular.module('app.datePickerScroller', [])

.run(function(){
    moment.locale('en');
    moment.updateLocale('en', {
        monthsShort : [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ],
        weekdaysShort : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    });
})

.factory('datePickerService', ['$timeout', function($timeout){
    var dp_options = {}, dp_dateObject = [], dp_sliderObject=[], dp_currentIndex=3;
    
    dp_options = {
        loop: false,
        speed: 500,
        slidesPerView: 7,
        initialSlide: 3,
        pagination: 'none',
        autoplayDisableOnInteraction: false,
        spaceBetween: 3,
        centeredSlides: true,
        effect: 'slide'
    };
    
    var getDates = function(){
        var d = moment();
    
        for(i = -5; i < 14; i++){
            e = d.clone().add(i,'days');
            dp_dateObject.push({
                dday: moment.weekdaysShort(e.day()),
                ddate: e.date(),
                dmonth: moment.monthsShort(e.month()),
                ddtest: e.day()
            });
        }
    };
    getDates();
    
    return {
        options: dp_options,
        dateData: dp_dateObject,
        setSlider: function(object, scope){
            dp_sliderObject = object;
            var prevX = 0;
            dp_sliderObject.on('touchStart', function(e){
                dp_currentIndex = e.snapIndex;
                prevX = e.touches.diff; // SET INITIAL POSITION OF TOUCH
                startIndex = e.snapIndex; //START INDEX IS ALWAYS 0x
            });
            dp_sliderObject.on('touchMove',function(e){
                if(e.touches.diff < prevX){
                    if((e.snapGrid[dp_currentIndex+1]-e.snapGrid[startIndex]) + e.touches.diff <= 15){
                        dp_currentIndex = dp_currentIndex + 1;   
                        //$scope.curIndex = curIndex;
                        $timeout(function(){
                            scope.$apply();
                        });
                    } 
                } else {
                    if((e.snapGrid[dp_currentIndex-1]-e.snapGrid[startIndex]) + e.touches.diff >= -15){
                        dp_currentIndex = dp_currentIndex - 1;   
                        // $scope.curIndex = curIndex;
                        $timeout(function(){
                            scope.$apply();
                        });
                    }
                }
                prevX = e.touches.diff;
            });
            dp_sliderObject.on('touchEnd',function(e){
                //   curIndex = e.snapIndex;
                //   $scope.curIndex = e.snapIndex;
                //   $timeout(function(){
                //                 $scope.$apply();
                //             });
            });
            scope.$on("$ionicSlides.slideChangeEnd", function(event, data){
                dp_currentIndex = data.slider.snapIndex;
                $timeout(function(){
                    scope.$apply();
                });
            });
            console.log('Slider Object set up');
            console.log(dp_sliderObject);
        },
        getDay: function(){
            return dp_dateObject[dp_currentIndex].dday;
        },
        getMonth: function(){
            return dp_dateObject[dp_currentIndex].dmonth;
        },
        moveTo: function(index){
            $timeout(function(){
                dp_sliderObject.slideTo(index);
            },200);
        } 
        
    }
}])
/* Ex.: 

.service('BlankService', [function(){

}]);

*/