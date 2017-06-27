angular.module('newapp') 
  .controller('ProductpageCtrl', function ($scope,$http) {   
	$http.get("http://45.113.136.146:7070/shop/getCategories").then(function(resp) {
	  console.log(resp);
		$scope.menuitem=resp.data.categoryData;
	  });
	 $scope.mouseOver=function(param){			
			 $scope.set_bg = function(){				
				 $scope.bgimg=(param.title).replace(/ /g,"_");
			//	  console.log($scope.bgimg);
        return {			
			"background-image":"url(/clients/onesevenhomev3/img/"+$scope.bgimg+".jpg)"			
			};
		}			
	}
	$http.get("js/controllers/productpage.json").then(function(resp) {
	  console.log(resp);
		$scope.ppage=resp.data.productpage;
	  });
	  
	  	$http.get("/js/controllers/vendor.json").then(function(resp) {
	  console.log(resp);
		$scope.ven=resp.data.vendor;
	  });
	
	$http.get("/js/controllers/recomended.json").then(function(resp) {
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
		
	$http.get("/js/controllers/recentbrought.json").then(function(resp) {
		console.log(resp);
		$scope.recently=resp.data.brought;		
	    $scope.RecentlyLoaded = true;
		$scope.slickrecentbroughtConfig = {
         dots: false,
		arrows: true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4 ,  
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