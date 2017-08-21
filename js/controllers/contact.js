angular.module('newapp') 
  .controller('ContactCtrl', function ($scope,$http, $location) {
	  if(localStorage.loggedInUser !=undefined){
		$scope.loggedInUser=localStorage.loggedInUser;
		$scope.loggedInUserName=localStorage.loggedInUserName;
		$scope.userlogged=true;
	} else{
		$scope.userlogged=false;
	}
	$scope.logout = function (){
		localStorage.clear();
		$location.path('/login');
	}
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
		$http.get("http://103.92.235.45/shop/getContactUS").then(function(resp){
			console.log(resp);
			$scope.contactdetails=resp.data;
		});
	$http.get("http://103.92.235.45/shop/cart/displayCart?userId="+localStorage.loggedInUserId).then(function(resp){
		console.log(resp);
		$scope.cartlist=resp.data;
		console.log($scope.cartlist);
		$scope.lengthofcart = resp.data.shoppingCartItems.length;
		console.log($scope.lengthofcart);
	});
	$scope.lengthofcart = 0;
});