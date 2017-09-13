angular.module('newapp')
    .controller('ProductlistCtrl', function($scope, $http, $routeParams, $location,$window)  {   
	
	if(localStorage.loggedInUser !=undefined){
		$scope.loggedInUser=localStorage.loggedInUser;
		$scope.loggedInUserName=localStorage.loggedInUserName;
		$scope.userlogged=true;
	} else {
		$scope.userlogged=false;
	}
	$scope.logout = function () {
		localStorage.removeItem("loggedInUser");
		$location.path('/login');
	}
	$scope.categorytype = $routeParams.cid.replace(/_/g, " ");
	if ($routeParams.sid == "" || $routeParams.sid == undefined) {
		$scope.subcattype = false;
	} else {
		$scope.subcategorytype = $routeParams.sid.replace(/_/g, " ");
		$scope.subcattype = true;
	}
	$http.get("http://103.92.235.45/shop/getAllCategories").then(function(resp) {
    $scope.menuitem = resp.data.categoryData;
	var menudata = resp.data.categoryData;
    var index = menudata.findIndex(function(item, i) {
        return item.title === $scope.categorytype;
    });
    $scope.categorySub = $scope.menuitem[index].subCategory
    var sindex = $scope.categorySub.findIndex(function(item, i) {
        return item.title === $scope.subcategorytype;
    });
    if ($routeParams.sid == "" || $routeParams.sid == undefined) {
        $scope.categorySub[0].checked = true;
		$scope.routeurl=$scope.categorySub[0].url;
    } else {
        $scope.categorySub[sindex].checked = true;
		$scope.routeurl=$scope.categorySub[sindex].url;
    }
	console.log("===========")
	console.log($scope.routeurl)
	$http.get("http://103.92.235.45/shop/" + $scope.routeurl +"?"+"pageNumber="+$scope.page+"&pageSize=15").then(function(resp) {
		console.log(resp);
			$scope.plist = resp.data.responseData;
			$scope.totalCount=resp.data.paginationData.totalCount; 
		});
	});
	$scope.mouseOver = function(param) {
		$scope.set_bg = function() {
			$scope.bgimg = param.imageURL;
			return {
				"background-image": "url(/clients/onesevenhome/img/" + $scope.bgimg + ".jpg)"
			};
		}
	}
	$scope.page = 1;
	$scope.PagingAct = function(page, pageSize, total) {
				$http.get("http://103.92.235.45/shop/" + $scope.routeurl +"?"+"pageNumber="+page+"&pageSize=15").then(function(resp) {
		$window.scrollTo(0, 0);
			$scope.plist = resp.data.responseData;
			$scope.totalCount=resp.data.paginationData.totalCount; 
	
	});
	}
	
	$scope.fil = function(subfil) {
    angular.forEach($scope.categorySub, function(item) {
        item.checked = false;
    });
    subfil.checked = true;
	$scope.routeurl=subfil.url;
    $http.get("http://103.92.235.45/shop" + $scope.routeurl+"?"+"pageNumber="+$scope.page+"&pageSize=15").then(function(resp) {
       $scope.plist = resp.data.responseData;
			$scope.totalCount=resp.data.paginationData.totalCount; 
    });
	};
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
		    autoplayspeed: 600
		};
	});
	$http.get("http://103.92.235.45/shop/getRecentBought").then(function(resp) {
		console.log(resp);
		$scope.recently = resp.data.recentlyBought;
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
		},
		{
			breakpoint: 800,
			settings: {
				arrows: false,
				centerMode: true,
				centerPadding: '40px',
				slidesToShow: 3,
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
	$http.get("http://103.92.235.45/shop/cart/displayCart?userId="+localStorage.loggedInUserId).then(function(resp){
		console.log(resp);
		$scope.cartlist=resp.data;
		console.log($scope.cartlist);
		$scope.lengthofcart = resp.data.shoppingCartItems.length;
		console.log($scope.lengthofcart);
	});
	$scope.lengthofcart = 0;

	$http.get("http://103.92.235.45/shop/getFiltersByCategory/"+$routeParams.cid).then(function(resp) {
		console.log(resp);
		$scope.branditem = resp.data.filters;
		$scope.selection = [];
		$scope.toggleSelection = function toggleSelection(branditem) {
      var idx = $scope.selection.indexOf(branditem);
      
      // is currently selected
      if (idx > -1) {
        $scope.selection.splice(idx, 1);
      }
      // is newly selected
      else {
        $scope.selection.push(branditem);
      }
    };
	});
	/*
	$http.get("js/controllers/type.json").then(function(resp) {
		console.log(resp);
		$scope.typeitem = resp.data.type;
		$scope.selectionType = [];
		$scope.toggleSelectionType = function toggleSelectionType(typeitem) {
      var idx = $scope.selectionType.indexOf(typeitem);
      
      // is currently selected
      if (idx > -1) {
        $scope.selectionType.splice(idx, 1);
      }
      // is newly selected
      else {
        $scope.selectionType.push(typeitem);
      }
    };
	});
	$http.get("js/controllers/quantity.json").then(function(resp) {
		console.log(resp);
		$scope.quantityitem = resp.data.quantity;
		$scope.selectionQuantity = [];
		$scope.toggleSelectionQuantity = function toggleSelectionQuantity(quantityitem) {
      var idx = $scope.selectionQuantity.indexOf(quantityitem);
      
      // is currently selected
      if (idx > -1) {
        $scope.selectionQuantity.splice(idx, 1);
      }
      // is newly selected
      else {
        $scope.selectionQuantity.push(quantityitem);
      }
    };
	});
	*/
});