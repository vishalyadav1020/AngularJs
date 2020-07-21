(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchController', LunchController);

LunchController.$inject = ['$scope'];

function LunchController($scope) {
    $scope.checkDish = function () {
        var num = countDish($scope.dishes);
        $scope.message = messagefunc(num);
    };

    function countDish(dishes) {
        var count = 0;
        if (dishes) {
            var array = dishes.split(',');
            for (var i in array) {
                 if (array[i].trim().length != 0) {
                    count++;
                }
            }
        }
        return count;
    }

    function messagefunc(num) {
        if (num === 0) {
            return 'Please enter data first';
        }
        else if (num <= 3) {
            return 'Enjoy!';
        } else {
            return 'Too much!';
        }
    }
}

})();