angular.module('newapp') 
  .controller('TodaydealsCtrl', function ($scope,$http,$location) {
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
$http.get("/clients/oneseven_home_v2/js/controllers/todaydeals.json").then(function(resp) {
		console.log(resp);
		$scope.menuitem=resp.data.todaydeal;
    });
	
	$http.get("/clients/oneseven_home_v2/js/controllers/recomended.json").then(function(resp) {
            console.log(resp);
            $scope.recommend = resp.data.recomended;
            $scope.RecomendLoaded = true;
            $scope.slickrecommendedprocutsConfig = {
                dots: false,
                arrows: false,
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1	
            };
        });
	
	$http.get("http://45.113.136.146:7070/shop/getTodaysDeals").then(function(resp) {
		console.log(resp);
		$scope.deal=resp.data.todaysDealsData;
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
 