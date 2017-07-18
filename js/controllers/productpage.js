angular.module('newapp') 
  .controller('ProductpageCtrl', function ($scope,$http, $location, $routeParams) {   
	if(localStorage.loggedInUser !=undefined){
			$scope.loggedInUser=localStorage.loggedInUser;
			$scope.userlogged=true;
		}else{
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
	$http.get("http://45.113.136.146:7070/shop/products/100").then(function(resp) {
	  console.log(resp);
		$scope.ppage=resp.data;
	});
	$http.get("http://45.113.136.146:7070/shop/products/"+ $routeParams.prodid +"/reviews").then(function(resp) {
		console.log(resp);
		$scope.prod=resp.data;
		$scope.averagereview=resp.data.avgReview;
		$scope.totalreview=resp.data.totalRatingCount;		
	});
	$http.post("http://45.113.136.146:7070/shop/products/reviews/save").then(function(resp) {
		console.log(resp);
	});
	$http.get("/clients/oneseven_home_v2/js/controllers/recomended.json").then(function(resp) {
            console.log(resp);
            $scope.recommend = resp.data.recomended;
            $scope.RecomendLoaded = true;
            $scope.slickrecommendedprocutsConfig = {
                dots: true,
                arrows: true,
                infinite: true,
                slidesToShow: 4,
                slidesToScroll: 2
            };
        });
		
	$http.get("/clients/oneseven_home_v2/js/controllers/recentbrought.json").then(function(resp) {
		console.log(resp);
		$scope.recently=resp.data.brought;		
	    $scope.RecentlyLoaded = true;
		$scope.slickrecentbroughtConfig = {
         dots: false,
		arrows: false,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4 , 
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
			slidesToScroll: 3 
		  }
		},
		{
		  breakpoint: 800,
		  settings: {
			arrows: false,
			centerMode: true,
			centerPadding: '40px',
			slidesToShow: 2,
			slidesToScroll: 2 
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
		}
	   ]
      };
	});
});