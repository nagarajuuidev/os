angular.module('newapp') 
  .controller('vendorregCtrl', function ($scope, $http, $location, $route) {
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
	$scope.alerthide=function(){
		$scope.errmsg=false;
	}
	
	// === Upload Functionality Starts === //
	$scope.files = [];
	$scope.$on("seletedFile", function (event, args) {
        $scope.$apply(function () {
            //add the file object to the scope's files collection
            $scope.files.push(args.file);
        });
    });
	$scope.regvendor = function (vendor) {
		//delete vendor.vatRegNo;
	console.log(vendor);
	vendor.activationURL="http://rainiersoft.com/clients/onesevenhome/#/activateuser";
	$http({
            method: 'POST',
            url: "http://103.92.235.45/shop/vendor/register",
            headers: { 'Content-Type': undefined },
            transformRequest: function (data) {
                var formData = new FormData();
                formData.append("vendorRequest", JSON.stringify(vendor));
                for (var i = 0; i < data.file.length; i++) {
                   // formData.append("file", data.file);
					  formData.append("file", data.file[i]);
                }
                return formData;
            },
            data: { fileInfo: vendor, file: $scope.files }
        }).
        success(function (resp, status, headers, config) {
			console.log(resp);
			console.log(resp.status);
			/*if (status === 200) {
            $location.path('/conform');
        } else {
            alert("success with some error !");
            console.log("error");
        }*/
		
		
		if(resp.status == "true"){
		$location.path('/conform');
	}
	else {
		$scope.errmsg=true;
		$location.path('/vendorreg');
		$scope.errmessage = resp.errorMessage;
	}
	
	
		
		
        }).
        error(function (data, status, headers, config) {
            $location.path('/vendorreg');
        });
		};
	});
	newapp.directive('uploadFiles', function () {
	return {
	//create a new scope
	scope: true,
	  link: function (scope, el, attrs) {
		el.bind('change', function (event) {
		  var files = event.target.files;
			//iterate files since 'multiple' may be specified on the element
              for (var i = 0; i < files.length; i++) {
				//emit event upward
                scope.$emit("seletedFile", { file: files[i] });
              }
          });
        }
	  };
	});