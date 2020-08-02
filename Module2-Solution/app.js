(function(){
    'use strict';

angular.module("ShoppingListCheckOff",[])
.controller('toBuyController',toBuyController)
.controller('AlreadyBoughtController',AlreadyBoughtController)
.service('ShoppingListCheckOffService',ShoppingListCheckOffService);

toBuyController.$inject = ['ShoppingListCheckOffService'];
function toBuyController(ShoppingListCheckOffService){
    var toBuy = this;
    
    toBuy.items = ShoppingListCheckOffService.getToBuyItems();
    toBuy.buy = function(index) {
        ShoppingListCheckOffService.buyItem(index);
    };
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
    var bought = this;

    bought.items = ShoppingListCheckOffService.getBoughtItems();
    
}


function ShoppingListCheckOffService(){
    var service = this;

    var toBuyItems = [
        {
            name: 'Cookies',
            quantity: 10
        },{
            name: 'Milk',
            quantity: 7
        },{
            name: 'Bread',
            quantity: 5
        },{
            name: 'Chips',
            quantity: 5
        },{
            name: 'Soda',
            quantity: 10
        }
    ];

    var boughtItems = [];

    service.buyItem = function(index){
        boughtItems.push(toBuyItems[index]);
        toBuyItems.splice(index,1);
    };

    service.getToBuyItems = function() {
        return toBuyItems;
    };
    
    service.getBoughtItems = function() {
        return boughtItems;
    };
}
})();