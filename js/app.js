document.onmousemove = function(e){
    dispayX = e.pageX;
    dispayY = e.pageY;
    $('.cube').css({
        marginLeft: `-${~~(dispayX/25)}px`,
        marginTop: `-${~~(dispayY/25)}px`,
        transition: '0.1s ease'
    })};
const app = angular.module('cutawayApp', []);

app.controller('cubesController', function($scope){
    $scope.cubesCount = [];
    for (let i = 0; i < 35; i++) {                                      // how many cubes want to create
        $scope.cubesCount.push('cube');
    }

    $scope.cubesConstructions = [{                                      // for ng-repeat class-names
        side: 'left',
        caption: 'HTML'
    }, {
        side: 'right',
        caption: 'CSS'
    }, {
        side: 'front',
        caption: 'JS'
    }, {
        side: 'back',
        caption: 'ANGULAR'
    }, {
        side: 'top',
        caption: 'THREE.JS'
    }, {
        side: 'bottom',
        caption: 'GSAP'
    }];

});

app.directive('cubesDir', function (mainFactory) {
    return {
        restrict: 'E',
        template: `
        <div class="cube-container">
            <div class="{{cube.side}}-side" ng-repeat="cube in cubesConstructions">{{cube.caption}}</div>
        </div>`,
        scope: false,
        transclude: true,
        link: function (scope, element, attr) {
            let rand = (min,max) => mainFactory.randomNumber(min,max);     // random number function to shortly use name
             (function moveCubesAnimation() {
                $(element).css({
                    transition: '15s ease-in-out',
                    left: `${rand(10,90)}%`,
                    top: `${rand(10,90)}%`,
                    transform: `scale(${rand(30,100)/100}) rotate(${rand(30,480)}deg) rotateZ(${rand(30,480)}deg)`
                    });
                    setTimeout(moveCubesAnimation, 15000);                  // infinite animation 
                })();

            element.addClass('cube');
        }
            
    }
});

app.factory('mainFactory', function (){
 return {
    randomNumber : function(min, max) { 
        return Math.round(Math.random() * ((max-min)+1) + min);}             // random number function from min to max
 }
});