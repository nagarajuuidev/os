angular.module('newapp')
    .controller('ServicesCtrl', function($scope, $http) {
        $http.get("http://45.113.136.146:7070/shop/getCategories").then(function(resp) {
            console.log(resp);
            $scope.menuitem = resp.data.categoryData;
        });
        $scope.mouseOver = function(param) {
            $scope.set_bg = function() {
                $scope.bgimg = (param.title).replace(/ /g, "_");
                //console.log($scope.bgimg);
                return {
                    "background-image": "url(/clients/onesevenhomev3/img/" + $scope.bgimg + ".jpg)"
                };
            }
        }

        $http.get("http://45.113.136.146:7070/shop/services").then(function(resp) {
            console.log(resp);
            $scope.deal = resp.data.services;
        });

    });
	
	
	
	