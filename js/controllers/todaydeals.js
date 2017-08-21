 angular.module('newapp') 
  .controller('TodaydealsCtrl', function ($scope,$http,$location) {
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
	$http.get("http://103.92.235.45/shop/getRecommendedProduct").then(function(resp) {
            console.log(resp);
            $scope.recommend = resp.data.recommendedProducts;
            $scope.RecomendLoaded = true;
            $scope.slickrecommendedprocutsConfig = {
                dots: false,
                arrows: false,
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1	
            };
        });
	$http.get("http://103.92.235.45/shop/getTodaysDeals").then(function(resp) {
		console.log(resp);
		$scope.deal=resp.data.todaysDealsData;
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
			centerPadding: '0px',
			slidesToShow: 3,
			slidesToScroll: 1
		  }
		},
		{
		  breakpoint: 800,
		  settings: {
			arrows: false,
			centerMode: true,
			centerPadding: '0px',
			slidesToShow: 2,
			slidesToScroll: 1
		  }
		},
		{
		  breakpoint: 767,
		  settings: {
			arrows: false,
			centerMode: true,
			centerPadding: '0px',
			slidesToShow: 1,
			slidesToScroll: 1 
		  }
		}
	   ]
      };
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
 