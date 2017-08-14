angular.module('newapp')
    .controller('ProductlistCtrl', function($scope, $http, $routeParams, $location,$window)  {   
	
	if(localStorage.loggedInUser !=undefined){
		$scope.loggedInUser=localStorage.loggedInUser;
		$scope.loggedInUserName=localStorage.loggedInUserName;
		$scope.loggedInUserType=localStorage.loggedInUserType;
		$scope.loggedInuserId=localStorage.loggedInuserId;
		$scope.userlogged=true;
		if($scope.loggedInUserType=="VENDOR" && $location.path().split("/")[1]=="vendorcategories"){
			
			$scope.vendoradd=true;
		}else{$scope.vendoradd=false;}
		
		
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
	$http.get("http://103.92.235.45/shop" + $scope.routeurl +"?"+"pageNumber="+$scope.page+"&pageSize=15").then(function(resp) {
		$scope.routedata=resp;
		console.log(resp);
			$scope.plist = resp.data.responseData;
			$scope.totalCount=resp.data.paginationData.totalCount; 
		});
	filterparam($scope.routeurl);
	//filterparam($scope.categorytype)
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
	filterparam($scope.routeurl)
    $http.get("http://103.92.235.45/shop" + $scope.routeurl+"?"+"pageNumber="+$scope.page+"&pageSize=15").then(function(resp) {
		$scope.routedata=resp;
       $scope.plist = resp.data.responseData;
			$scope.totalCount=resp.data.paginationData.totalCount; 
    });
	};
	$scope.vendoraddprod=function(){		
		var productId = $(".vendor-chk-select input:checkbox:checked").map(function(){
      return $(this).val();
    }).get();		
		var reqobj={"vendorId":$scope.loggedInuserId,"productId":productId}
	$http.post("http://103.92.235.45/shop/addVendorProducts", reqobj).then(function(resp) {
	console.log(resp)
	});		
	}	
	var filterIds = [];
	$scope.filteritem = function(filparam, paramval) {
    if (paramval == true)
        //if (filterIds.indexOf(filparam) == -1) {}
        filterIds.push(filparam)
    else {
        filterIds = jQuery.grep(filterIds, function(a) {
            return a !== filparam;
        });
    }
	console.log(filterIds.length);
	if(filterIds.length !=0){
    
	var reqobj={"filterIds":filterIds}
	$http.post("http://103.92.235.45/shop/getProductsByFilters", reqobj).then(function(resp) {	 
	 $scope.plist = resp.data.filteredProducts;
			$scope.totalCount=resp.data.paginationData.totalCount; 	 
	});	
	}
	else{		
		$scope.plist = $scope.routedata.data.responseData;
			$scope.totalCount=resp.$scope.routedata.paginationData.totalCount;
	}
	
	
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
function filterparam(rparams){
	
	console.log(rparams.split("/")[2]);
	
	var rparam=rparams.split("/")[2];
	
	
	$http.get("http://103.92.235.45/shop/getFiltersByCategory/"+rparam).then(function(resp) {
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
}
	
});