angular.module('newapp')
  .controller('DashboardCtrl', function ($scope,$http) {
	    $scope.topslides=[{"img1":"img/pic1.jpg","img2":"img/pic2.jpg","img3":"img/pic3.jpg"},{"img1":"img/pic4.jpg","img2":"img/pic5.jpg","img3":"img/pic6.jpg"},{"img1":"img/pic7.jpg","img2":"img/pic8.jpg","img3":"img/pic9.jpg"}];
	
	   $scope.slicktopslideConfig = {
			dots: true,
		arrows: false,
        infinite: true,
			autoplay: true,
		autoplayspeed: 1000
		};
   $http.get("http://45.113.136.146:7070/shop/getCategories").then(function(resp) {
	   console.log(resp);
	   $scope.menuitem=resp.data.categoryData;		
		});		
		$scope.mouseOver=function(param){			
			 $scope.set_bg = function(){				
				 $scope.bgimg=(param.title).replace(/ /g,"_");
			//	  console.log($scope.bgimg);
        return {			
			"background-image":"url(/clients/onesevenhome/img/"+$scope.bgimg+".jpg)"	

			};
			}			
		}
			
	$http.get("/js/controllers/deals.json").then(function(resp) {
	   console.log(resp);
	   $scope.dealsdata=resp.data.deals;		
	   $scope.DealsLoaded = true;
	   $scope.slickDealsConfig = {
         dots: true,
		 arrows: false,
         infinite: true,
         slidesToShow: 3,
         slidesToScroll: 3 , 
	   responsive: [
		{
		  breakpoint: 1024,
		  settings: {
			arrows: false,
			centerMode: true,
			centerPadding: '40px',
			slidesToShow: 2
		  }
		},
		{
		  breakpoint: 767,
		  settings: {
			arrows: false,
			centerMode: true,
			centerPadding: '40px',
			slidesToShow: 1
		  }
		}
	  ]
    };
	});
	$http.get("/clients/oneseven_home_v2/js/controllers/newproducts.json").then(function(resp) {
	   console.log(resp);
	   $scope.products=resp.data.newproducts;		
	   $scope.NewproductsLoaded = true;
		$scope.slicknewproductsConfig = {
        dots: true,
		arrows: false,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 2
      };
	});	
	$http.get("/clients/oneseven_home_v2/js/controllers/recomended.json").then(function(resp) {
	   console.log(resp);
	   $scope.recomend=resp.data.recomended;		
	   $scope.RecomendLoaded = true;
		$scope.slickrecommendedprocutsConfig = {
        dots: true,
		arrows: false,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 2
      };
	});
	$http.get("/clients/oneseven_home_v2/js/controllers/review.json").then(function(resp) {
		console.log(resp);
		$scope.review=resp.data.reviewsection;
		$scope.ReviewLoaded = true;
		$scope.slickreviewsectionConfig = {
			dots: true,
			arrows: false,
			infinite: true,
			slidesToShow:1,
			slidesToScroll: 1
		};
 });
});