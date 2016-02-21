var start = function(){
"use strict";
angular.module('webApp', ['ui.bootstrap', 'ngAnimate'])
.controller('FeedCtrl', function($scope, $http){
  $scope.test = 'hi';

  var recieveHolidays = function(result){
    $scope.holidays = result.holidays;
    console.log($scope.holidays);
  };

  $http.get('holidays.json').success(recieveHolidays);
  $scope.showDetails = function(holiday){
    console.log("hi");
  };

  $scope.toPounds = function(price){
    var out = "";
    for(var i=0;i<price;i++){
      out += "£";
    }
    return out;
  };
  $scope.toSuns = function(weather){
    var out = "";
    for(var i=0;i<weather;i++){
      out +=  "\u2600";
    }
    return out;
  };




});
};
start();
