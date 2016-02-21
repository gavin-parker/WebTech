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


  $scope.toPounds = function(price){
    var out = "";
    for(var i=0;i<price;i++){
      out += "£";
    }
    return out;
  };

});
};
start();
