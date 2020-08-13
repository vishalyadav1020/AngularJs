(function(){
    'use strict';

angular.module('NarrowItDownApp',[])
.controller('NarrowItDownController',NarrowItDownController)
.service('MenuSearchService',MenuSearchService)
.constant('ApiPath','https://davids-restaurant.herokuapp.com')
.directive('foundItems',FoundItems);



function FoundItems(){
    var ddo = {
        restrict: 'E',
        templateUrl: 'foundItems.html',
        scope: {
            foundItems: '<',
            onEmpty: '<',
            onRemove: '&'
        },
        controller: NarrowItDownController,
        controllerAs: 'ctrl',
        bindToController: true  
    };
    return ddo;
}


NarrowItDownController.$inject = ['MenuSearchService']
function NarrowItDownController(MenuSearchService){
    var ctrl = this;
    ctrl.shortName='';
    
    ctrl.searchMenuItems = function(searchTerm){
        var promise = MenuSearchService.getMatchedMenuItems(searchTerm);

        promise.then(function(items){
            if (items && items.length > 0) {
                ctrl.message = '';
                ctrl.found = items;
            } else {
                ctrl.message = 'Nothing found!';
                ctrl.found = [];
            }
        });
    }

    ctrl.removeItem = function(itemIndex) {
        ctrl.found.splice(itemIndex,1);
    };
}


MenuSearchService.$inject = ['$http','ApiPath'];
function MenuSearchService($http,ApiPath){
    var service = this;
    service.getMatchedMenuItems = function(searchTerm){
        return $http({
            method: "GET",
            url: (ApiPath + '/menu_items.json')
        })
        .then(function(result){
            var foundItems = [];
            for(var i = 0;i < result.data['menu_items'].length;i++){
                if(searchTerm.length > 0 && result.data['menu_items'][i]['description'].toLowerCase().indexOf(searchTerm) !== -1){
                    foundItems.push(result.data['menu_items'][i]);
                }
            }
            return foundItems;
        });
    };
};
})();