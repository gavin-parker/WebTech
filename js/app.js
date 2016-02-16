angular.module('webApp', ['ui.bootstrap', 'ngAnimate'])
.controller('FeedCtrl', function($scope, $http){
  $scope.test = 'hi';
  $http.get('holidays.json').success(function(result){
    $scope.holidays = result.holidays;
    console.log($scope.holidays);
  });

});
