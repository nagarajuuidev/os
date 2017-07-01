angular.module('newapp') 
  .controller('ProductlistCtrl', function ($scope,$http,$routeParams) { 

$scope.categorytype=$routeParams.cid;

if($routeParams.sid == "" || $routeParams.sid == undefined){
	$scope.subcattype=false;
}else{
	$scope.subcategorytype=$routeParams.sid.replace(/_/g," ");
	$scope.subcattype=true;
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
$http.get("/clients/oneseven_home_v2/js/controllers/productlist.json").then(function(resp) {
	  console.log(resp);
		$scope.plist=resp.data.productlist;
	  });
	$http.get("/clients/oneseven_home_v2/js/controllers/recentbrought.json").then(function(resp) {
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