angular.module("myApp", ["ngAnimate"]);

angular.module("myApp").controller("myController", function ($scope) {
  $scope.inventory = [
    {
      id: 1,
      category: "water bottle",
      description: "small water bottle",
      price: 89.99,
      qty: 1
    }    
  ];

  $scope.cart = [];

  var findItemById = function (items, id) {
    return _.find(items, function (item) {
      return item.id === id;
    });
  };

  $scope.getCost = function (item) {
	  var qty= 1
	  if(item.qty <= 10)
		{
		item.price = 89.99
		return item.qty * item.price;
		}
		if(item.qty > 10 && item.qty <= 20){
			item.price = 65.99	
			
			return item.qty * item.price;
		}
		else{
			item.price = 50.98							
			return item.qty * item.price;
		}
    
  };
  
  $scope.getDiscount = function (item) {
	  var qty= 1
	
		if(item.qty > 10 && item.qty <= 20){
		discount = (89.99-65.99)* item.qty;
		return discount
		}
		else{
		discount = (89.99-50.98)* item.qty;
		return discount
		}
    
  };

  $scope.addItem = function (itemToAdd) {
    var found = findItemById($scope.cart, itemToAdd.id);
    if (found) {
      found.qty += itemToAdd.qty;
    } else {
      $scope.cart.push(angular.copy(itemToAdd));
    }
  };

 $scope.getTotalDiscount = function () {
    var total = _.reduce(
      $scope.cart,	 
      function (sum, item) {
        return sum + $scope.getDiscount(item);
      },
      0
    );
    console.log("total: " + total);
    return total;
  };

  $scope.getTotal = function () {
    var total = _.reduce(
      $scope.cart,	 
      function (sum, item) {
        return sum + $scope.getCost(item);
      },
      0
    );
    console.log("total: " + total);
    return total;
  };

  $scope.clearCart = function () {
    $scope.cart.length = 0;
  };

  $scope.removeItem = function (item) {
    var index = $scope.cart.indexOf(item);
    $scope.cart.splice(index, 1);
  };
});
