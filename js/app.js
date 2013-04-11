'use strict';

// Declare app level module which depends on filters, and services
angular.module('sanhack', []).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {templateUrl: 'partials/toilets.html', controller: FetchCtrl});   
    $routeProvider.otherwise({redirectTo: '/'});
  }]);

	