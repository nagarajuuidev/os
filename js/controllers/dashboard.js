angular.module('newapp')
    .controller('DashboardCtrl', function($scope, $http,$location) {
		
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
        $scope.topslides = [{
            "img1": "img/pic1.png",
            "img2": "img/pic2.png",
            "img3": "img/pic3.png"
        }, {
            "img1": "img/pic4.jpg",
            "img2": "img/pic5.jpg",
            "img3": "img/pic6.jpg"
        }, {
            "img1": "img/pic7.jpg",
            "img2": "img/pic8.jpg",
            "img3": "img/pic9.jpg"
        }];

        $scope.slicktopslideConfig = {
            dots: true,
            arrows: false,
            infinite: true,
            autoplay: true,
            autoplayspeed: 1000
        };
        /*$http.get("http://45.113.136.146:7070/shop/getCategories").then(function(resp) {
            console.log(resp);
            $scope.menuitem = resp.data.categoryData;
        });*/
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
        $http.get("http://45.113.136.146:7070/shop/getDealOfDay").then(function(resp) {
            console.log(resp);
            $scope.dealday = resp.data;
			//var countDownDate = new Date(resp.data.dealOfDay.productPriceSpecialEndDate).getTime();
			var dd=new Date();
		dd.setDate(dd.getDate()+1);
        var dateobj=(dd.getMonth() + 1) + '/' + dd.getDate() + '/' +  dd.getFullYear();	
		var countDownDate = new Date(dateobj).getTime();
			/*---=== DEAL OF THE DAY "TIMER" STARTS ===--- */
		// Set the date we're counting down to
		

		// Update the count down every 1 second
		var x = setInterval(function() {
	
		// Get todays date and time
		var now = new Date().getTime();
		
		// Find the distance between now an the count down date
		var distance = countDownDate - now;
    
		// Time calculations for days, hours, minutes and seconds
		var days = Math.floor(distance / (1000 * 60 * 60 * 24));
		var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
		// Output the result in an element with id="demo"
		document.getElementById("demo").innerHTML =
		"<li><span>"+hours+"</span>" + " " + "Hours" +"</li>"+ " " +"<li><span>"+minutes+"</span>" + " " + "Minutes" + "</li>"+ " " +"<li><span>"+seconds+"</span>" + " " + "Seconds" + "</li>";
    
		// If the count down is over, write some text 
			if (distance < 0) {
			clearInterval(x);
			document.getElementById("demo").innerHTML ="<li><span>"+00+"</span>" + " " + "Hours" +"</li>"+ " " +"<li><span>"+00+"</span>" + " " + "Minutes" + "</li>"+ " " +"<li><span>"+00+"</span>" + " " + "Seconds" + "</li>";
		  }
		},
	1000);
	/*---=== DEAL OF THE DAY "TIMER" ENDS ===--- */
        });
        $http.get("/clients/oneseven_home_v2/js/controllers/newproducts.json").then(function(resp) {
            console.log(resp);
            $scope.products = resp.data.newproducts;
            $scope.NewproductsLoaded = true;
            $scope.slicknewproductsConfig = {
                dots: true,
                arrows: false,
                infinite: true,
                slidesToShow: 2,
                slidesToScroll: 1
            };
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
                slidesToScroll: 1
            };
        });
        $http.get("/clients/oneseven_home_v2/js/controllers/featured.json").then(function(resp) {
            console.log(resp);
            $scope.feature = resp.data.featured;
            $scope.FeaturedLoaded = true;
            $scope.slickfeatureproductsConfig = {
                dots: true,
                arrows: false,
                infinite: true,
                slidesToShow: 2,
                slidesToScroll: 1
            };
        });
		
        $http.get("/clients/oneseven_home_v2/js/controllers/review.json").then(function(resp) {
			console.log('----------');
			console.log(resp);
			$scope.review = resp.data.reviewsection;
			$scope.ReviewLoaded = true;
			$scope.slickreviewsectionConfig = {
				dots: true,
				arrows: true,
				infinite: true,
				slidesToShow: 1,
				slidesToScroll: 1
			};
		});
		
});