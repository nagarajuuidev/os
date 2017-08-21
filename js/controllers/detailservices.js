angular.module('newapp')
  .controller('DetailservicesCtrl', function ($scope, $http, $routeParams, $location) {   
  $scope.locvalue = false;
  var initializing = true;
  $scope.$watch('searchlocation', function() {
	  angular.element('#filterloc').val("");
      if (initializing) {
          initializing = false;
      } else {
          $scope.fillocation = $scope.searchlocation;
          if ($scope.fillocation != "") {
              $scope.locvalue = true;
              $scope.filterlocation = function(location) {
                  return function(userloc) {
                      return (userloc.street == location || userloc.area == location || userloc.city == location || userloc.state == location)
                  }
              }
          } else {
              $scope.locvalue = "";
              $scope.filterlocation = function(location) {
                  return function(userloc) {
                      return true;
                  }
              }
          }
      }
  });
  $scope.removelocation = function() {
      $scope.searchlocation = "";
  }
		if(localStorage.loggedInUser !=undefined){
			$scope.loggedInUser=localStorage.loggedInUser;
			$scope.loggedInUserName=localStorage.loggedInUserName;
			$scope.userlogged=true;
		}else{
			$scope.userlogged=false;
		}
		$scope.logout = function (){
			localStorage.clear();
			$location.path('/login');
		}
	$scope.selectedtype=$routeParams.sid;
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
	$http.get("http://103.92.235.45/shop/services").then(function(resp) {
		console.log(resp);
		$scope.workers = resp.data.services;
	});
	$http.get("http://103.92.235.45/shop/services/"+$routeParams.sid+"/workers").then(function(resp) {
            console.log(resp);
            $scope.servicedetails = resp.data.workers;
	});
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
	$http.get("/clients/onesevenhome/js/controllers/recommendedvendors.json").then(function(resp) {
		console.log(resp);
		$scope.vendorrecommended= resp.data.recommendedvendor;
		$scope.RecommendvendorLoaded = true;
		$scope.slickrecommendedvendorsConfig = {
			dots: false,
			arrows: false,
			infinite: true,
			slidesToShow: 5,
			slidesToScroll: 1,
			autoplay: true,
			autoplayspeed: 500
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