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
	$http.get("http://103.92.235.45/shop/getUser/"+localStorage.loggedInuserId).then(function(resp) {
		console.log(resp);
		if($scope.loggedInUserType=="CUSTOMER"){
			$scope.userprofile = resp.data.customerDetails;
			$scope.userprofile.address =resp.data.customerDetails.delivery.address;
			$scope.userprofile.state =resp.data.customerDetails.delivery.stateProvince;
			$scope.userprofile.city =resp.data.customerDetails.delivery.city;
			$scope.userprofile.phone =resp.data.customerDetails.delivery.phone;
			$scope.userprofile.postalCode =resp.data.customerDetails.delivery.postalCode;
			console.log($scope.userprofile);
		}
		else {
			$scope.vendorprofile = resp.data.vendorDetails;
			console.log($scope.vendorprofile);
		}
	});
	$scope.alerthide=function(){
		$scope.errmsg=false;
	}
	//Profile Update
	
	if($scope.loggedInUserType=="CUSTOMER"){
	$scope.Update = function(userprofile) {
		console.log(userprofile);
		delete userprofile.billing;
		delete userprofile.delivery;
		delete userprofile.activated;
		delete userprofile.dob;
		delete userprofile.password;
	$http.post("http://103.92.235.45/shop/customer/update", userprofile).then(function(resp) {
		
		
		if(resp.data.status == "true"){
			$scope.errmsg=true;			
			$scope.errmessage = resp.data.successMessage;
		}
		else {
			$scope.errmsg=true;
			
			$scope.errmessage = resp.data.errorMessage;
		}
	});
	};
	}
	else {
		$scope.vendorUpdate = function(vendorprofile) {
			console.log(vendorprofile);
	$http.post("http://103.92.235.45/shop/vendor/update", vendorprofile).then(function(resp) {
		
		if(resp.data.status == "true"){
			$scope.errmsg=true;			
			$scope.errmessage = resp.data.successMessage;
		}
		else {
			$scope.errmsg=true;
			
			$scope.errmessage = resp.data.errorMessage;
		}
	});
	};
	}
});