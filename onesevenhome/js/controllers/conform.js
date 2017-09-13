angular.module('newapp') 
  .controller('conformCtrl', function ($scope,$http, $location) {
	  if(localStorage.loggedInUser !=undefined){
		$scope.loggedInUser=localStorage.loggedInUser;
		$scope.userlogged=true;
	} else{
		$scope.userlogged=false;
	}
	$scope.logout = function (){
		localStorage.removeItem("loggedInUser");
		$location.path('/login');
	}
	$http.get("http://localhost:8080/shop/getAllCategories").then(function(resp) {
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
		$http.get("http://localhost:8080/shop/getContactUS").then(function(resp){
			console.log(resp);
			$scope.contactdetails=resp.data;
		});
	$http.get("http://localhost:8080/shop/cart/displayCart?userId="+localStorage.loggedInUserId).then(function(resp){
		console.log(resp);
		$scope.cartlist=resp.data;
		console.log($scope.cartlist);
		$scope.lengthofcart = resp.data.shoppingCartItems.length;
		console.log($scope.lengthofcart);
	});
});