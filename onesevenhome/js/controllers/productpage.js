angular.module('newapp') 
  .controller('ProductpageCtrl', function ($scope, $http, $location, $routeParams) {   
	if(localStorage.loggedInUser !=undefined) {
		$scope.loggedInUser=localStorage.loggedInUser;
		$scope.loggedInUserName=localStorage.loggedInUserName;
		$scope.userlogged=true;
	} else {
		$scope.userlogged=false;
	}
	$scope.logout = function (){
		localStorage.removeItem("loggedInUser");
		localStorage.removeItem("loggedInUserId");
		$location.path('/login');
	}
	$scope.cartvalue=0;
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
	$http.get("http://103.92.235.45/shop/products/"+ $routeParams.prodid).then(function(resp) {
		console.log(resp);
		$scope.ppage=resp.data;
	});
	$http.get("http://103.92.235.45/shop/products/"+ $routeParams.prodid +"/reviews").then(function(resp) {
		console.log(resp);
		$scope.prod=resp.data;
		$scope.averagereview=resp.data.avgReview;
		$scope.totalreview=resp.data.totalRatingCount;		
	});
	/*  SAVE RATING
	
	$http.post("http://103.92.235.45/shop/products/reviews/save").then(function(resp) {
		console.log(resp);
	});*/
	$scope.addcart = function () {
		var cartproduct = {
			"productId" : $routeParams.prodid,
			"quantity"  : "1"
		}
	console.log(cartproduct);
		$http.post("http://103.92.235.45/shop/cart/addShoppingCartItem?userId="+localStorage.loggedInUserId, cartproduct).then(function(resp) {
		//$scope.proId = cartparam.productId;
			console.log(resp);
			$scope.cartvalue=resp.data.cartQuantity;
			console.log($scope.cartvalue);
		});
	}
	$http.get("http://103.92.235.45/shop/getRecommendedProduct").then(function(resp) {
		console.log(resp);
		$scope.recommend = resp.data.recommendedProducts;
		$scope.RecomendLoaded = true;
		$scope.slickrecommendedprocutsConfig = {
			dots: false,
			arrows: false,
			infinite: true,
			slidesToShow: 4,
			slidesToScroll: 1,
			autoplay: true,
			autoplayspeed: 500
		};
	});
	$http.get("http://103.92.235.45/shop/getRecentBought").then(function(resp) {
		console.log(resp);
		$scope.recently=resp.data.recentlyBought;		
	    $scope.RecentlyLoaded = true;
		$scope.slickrecentbroughtConfig = {
			dots: false,
			arrows: false,
			infinite: true,
			slidesToShow: 4,
			slidesToScroll: 1, 
			autoplay: true,
			autoplayspeed: 500,		
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					arrows: false,
					centerMode: true,
					centerPadding: '40px',
					slidesToShow: 3,
					slidesToScroll: 1
				}
			},
		{
			breakpoint: 800,
			settings: {
				arrows: false,
				centerMode: true,
				centerPadding: '40px',
				slidesToShow: 2,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 767,
			settings: {
				arrows: false,
				centerMode: true,
				centerPadding: '40px',
				slidesToShow: 1,
				slidesToScroll: 1 
			}
		}]};
	});
});