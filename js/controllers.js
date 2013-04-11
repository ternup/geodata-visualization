'use strict';

/* Controllers */	
var rnd = [];
function FetchCtrl($scope, $http) {
  $scope.method = 'GET';
  $scope.url = 'data/locations.json'
  
  $scope.fetch = function() {
    $scope.code = null;
    $scope.response = null;
    $http({method: $scope.method, url: $scope.url}).
      success(function(data, status) {
        $scope.status = status;
        $scope.data = data;
		appReady = true;
		
      }).
      error(function(data, status) {
        $scope.data = data || "Request failed";
        $scope.status = status;
    });
  };

	$scope.fetch();
	
}


