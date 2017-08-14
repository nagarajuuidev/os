angular.module('newapp')
  .controller('viewmsgctrl', function ($scope,$http,$routeParams) {
	if(localStorage.loggedInUser !=undefined) {
		$scope.loggedInUser=localStorage.loggedInUser;
		$scope.userlogged=true;
	} else {
		$scope.userlogged=false;
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
	$http.get("js/controllers/viewmsg.json").then(function(resp) {
		console.log(resp);
		$scope.vmsg = resp.data.viewmsg;
	});
	$http.get("http://103.92.235.45/shop/cart/displayCart?userId="+localStorage.loggedInUserId).then(function(resp){
		console.log(resp);
		$scope.cartlist=resp.data;
		console.log($scope.cartlist);
		$scope.lengthofcart = resp.data.shoppingCartItems.length;
		console.log($scope.lengthofcart);
	});
});