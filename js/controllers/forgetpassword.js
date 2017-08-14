angular.module('newapp')
  .controller('forgetPassCtrl', function($scope, $http, $location) {
	$http.get("http://103.92.235.45/shop/getAllCategories").then(function(resp) {
		console.log(resp);
		$scope.menuitem = resp.data.categoryData;
	});
	$scope.mouseOver = function(param) {
		$scope.set_bg = function() {
		$scope.bgimg = param.imageURL;
			return {
				"background-image": "url(/clients/onesevenhome/img/" + $scope.bgimg + ".jpg)"
			};
		}
	}
	$scope.forget = function (user) {
		$http.post("http://103.92.235.45/shop/customer/user/register", user)
			.then(function(resp) {
			console.log(resp)
			$location.path('/newpassword');
		});
	};
	$http.get("http://103.92.235.45/shop/cart/displayCart?userId="+localStorage.loggedInUserId).then(function(resp){
		console.log(resp);
		$scope.cartlist=resp.data;
		console.log($scope.cartlist);
		$scope.lengthofcart = resp.data.shoppingCartItems.length;
		console.log($scope.lengthofcart);
	});
	$scope.forget = function (setnew) {
		setnew.activationURL="http://localhost:8081/clients/oneseven_home_v2/#/activateuser";
		$http.post("http://103.92.235.45/shop/customer/register", setnew)
			.then(function(resp) {
			console.log(resp)
			alert("Please Check your Mail for activation");
			$location.path('/login');
		});
	};
});