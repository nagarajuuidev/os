angular.module('newapp') 
  .controller('cartctrl', function ($scope, $http, $location) {
	if (localStorage.loggedInUser !=undefined) {
		$scope.loggedInUser=localStorage.loggedInUser;
		$scope.userlogged=true;
	} else {
		$scope.userlogged=false;
	}
	$scope.logout = function (){
		localStorage.removeItem("loggedInUser");
		$location.path('/login');
	}
	$http.get("http://45.113.136.146:7070/shop/getAllCategories").then(function(resp) {
            console.log(resp);
            $scope.menuitem = resp.data.categoryData;
        });
        $scope.mouseOver = function(param) {
            $scope.set_bg = function() {
                $scope.bgimg = param.imageURL;
                return {
                    "background-image": "url(/clients/oneseven_home_v2/img/" + $scope.bgimg + ".jpg)"
                };
            }
        }
		$http.get("js/controllers/cart.json").then(function(resp){
			console.log(resp);
			$scope.cartlist=resp.data.cart;
		});
});