angular.module('newapp')
  .controller('subcategoryCtrl', function ($scope,$http,$routeParams) {
	if(localStorage.loggedInUser !=undefined){
		$scope.loggedInUser=localStorage.loggedInUser;
		$scope.userlogged=true;
	} else {
		$scope.userlogged=false;
	}
	$scope.logout = function (){
		localStorage.clear();
		$location.path('/login');
	}
	$scope.categorytype = $routeParams.cid;
	if ($routeParams.sid == "" || $routeParams.sid == undefined) {
		$scope.subcattype = false;
	} else {
		$scope.subcategorytype = $routeParams.sid.replace(/_/g, " ");
		$scope.subcattype = true;
	}
	$http.get("http://45.113.136.146:7070/shop/getAllCategories").then(function(resp) {
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
	$http.get("js/controllers/subcategory.json").then(function(resp) {
		console.log(resp);
		$scope.subca = resp.data.subcat;
	});
	$http.get("js/controllers/recomendedsub.json").then(function(resp) {
		console.log(resp);
		$scope.recommend = resp.data.recomended;
	});
	$http.get("/clients/onesevenhome/js/controllers/recentbrought.json").then(function(resp) {
		console.log(resp);
		$scope.recently = resp.data.brought;
		$scope.RecentlyLoaded = true;
		$scope.slickrecentbroughtConfig = {
			dots: false,
			arrows: false,
			infinite: true,
			slidesToShow: 4,
			slidesToScroll: 1,
			autoplay: true,
		    autoplayspeed: 500,
				responsive: [{
					breakpoint: 1024,
						settings: {
							arrows: false,
							centerMode: true,
							centerPadding: '40px',
							slidesToShow: 3,
							slidesToScroll: 1
                    }
                }, {
                    breakpoint: 800,
                    settings: {
                        arrows: false,
                        centerMode: true,
                        centerPadding: '40px',
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                }, {
                    breakpoint: 767,
                    settings: {
                        arrows: false,
                        centerMode: true,
                        centerPadding: '40px',
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }]
            };
        });
});