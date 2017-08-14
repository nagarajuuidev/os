angular.module('newapp')
  .controller('myaccountCtrl', function ( $scope, $http, $location, $routeParams) {
	if(localStorage.loggedInUser !=undefined){
		$scope.loggedInUser=localStorage.loggedInUser;
		$scope.loggedInUserName=localStorage.loggedInUserName;
		$scope.loggedInUserType=localStorage.loggedInUserType;
		$scope.userlogged=true;
		
		if($scope.loggedInUserType=="CUSTOMER"){
		$scope.activity=true;
		$scope.userprofile=true;
		$scope.orderinvoice=true;
	}
	else {
		$scope.activity=true;
		$scope.wishlist=true;
		$scope.orderinvoices=true;
		$scope.profile=true;
		$scope.productlist=true;
		$scope.addproduct=true;
		$scope.inbox=true;
	}
		
	} else {
		$scope.userlogged=false;
	}
	
	if ($scope.userlogged==true) {
	$scope.logout = function (){
		localStorage.removeItem("loggedInUser");
		localStorage.removeItem("loggedInUserId");
		localStorage.removeItem("loggedInUserType");
		localStorage.removeItem("loggedInUserName");
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
	$http.get("js/controllers/myaccount.json").then(function(resp) {
		console.log(resp);
		$scope.account = resp.data.myacc;
	});
	$http.get("js/controllers/todayorders.json").then(function(resp) {
		console.log(resp);
		$scope.todayorder = resp.data.torder;
	});
	$http.get("js/controllers/order.json").then(function(resp) {
		console.log(resp);
		$scope.myorder = resp.data.order;
	});
	$http.get("js/controllers/myaccproductlist.json").then(function(resp) {
		console.log(resp);
		$scope.mplist = resp.data.myaccplist;
	});
	$http.get("js/controllers/myaccwishlist.json").then(function(resp) {
		console.log(resp);
		$scope.mwlist = resp.data.myaccwlist;
	});
	$http.get("js/controllers/inboxread.json").then(function(resp) {
		console.log(resp);
		$scope.readmsg = resp.data.read;
	});
	$http.get("js/controllers/inboxunread.json").then(function(resp) {
		console.log(resp);
		$scope.unreadmsg = resp.data.unread;
	});
	$http.get("http://103.92.235.45/shop/cart/displayCart?userId="+localStorage.loggedInUserId).then(function(resp){
		console.log(resp);
		$scope.cartlist=resp.data;
		console.log($scope.cartlist);
		$scope.lengthofcart = resp.data.shoppingCartItems.length;
		console.log($scope.lengthofcart);
	});
		$scope.lengthofcart = 0;
	}
	else {
		$location.path('/login')
	}
	
});