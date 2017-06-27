angular.module('newapp') 
  .controller('DetailservicesCtrl', function ($scope,$http,$routeParams) {   
	$http.get("http://45.113.136.146:7070/shop/getCategories").then(function(resp) {
	  console.log(resp);
		$scope.menuitem=resp.data.categoryData;
	  });
	$scope.mouseOver=function(param){			
		$scope.set_bg = function(){				
			$scope.bgimg=(param.title).replace(/ /g,"_");
			  //console.log($scope.bgimg);
        return {			
			"background-image":"url(/img/"+$scope.bgimg+".jpg)"			
			};
			}			
		}
/*
$scope.gridOptions = {
enableSorting: true,
columnDefs: [
{ field: 'firstName' },
{ field: 'lastName' },
{ field: 'eMail' },
{ field: 'mobileNumber' },
{ field: 'location' }
]
};


  $http.get("http://45.113.136.146:7070/shop/services/"+$routeParams.sid+"/workers").then(function(resp) {
	   console.log(resp);
		$scope.gridOptions.data=resp.data.workers;
    });
*/
	$http.get("/js/controllers/detailservices.json").then(function(resp) {
            console.log(resp);
            $scope.servicedetails = resp.data.services;
        });
	
	$http.get("/js/controllers/recomended.json").then(function(resp) {
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
	
	$http.get("/js/controllers/recommendedvendors.json").then(function(resp) {
            console.log(resp);
            $scope.vendorrecommended= resp.data.recommendedvendor;
            $scope.RecommendvendorLoaded = true;
            $scope.slickrecommendedvendorsConfig = {
                dots: false,
                arrows: true,
                infinite: true,
                slidesToShow: 5,
                slidesToScroll: 1
        };
    });
 });