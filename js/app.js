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

});
};
start();
/*
$(window).on("scroll", function(){
  if($("body").scrollTop() === 10){
    $(window).off("scroll");
       window.alert("Hello");
  }
}
*/
/*
$(window).scroll(function(){
    $(".diary1").css("opacity", $(window).scrollTop() / 500);
  });
*/    

$(window).scroll(function() {
  if ($(this).scrollTop()> 300) {
    $("#diary1-text").fadeIn();
    $("#diary2-text").fadeIn();
   } else {
    $("#diary1-text").fadeOut();
    $("#diary2-text").fadeOut();
   }
    
});
$(window).scroll(function() {
  if ($(this).scrollTop()> 650) {
    $("#diary3-text").fadeIn();
    $("#diary4-text").fadeIn();
   } else {
    $("#diary3-text").fadeOut();
    $("#diary4-text").fadeOut();
   }
  if ($(this).scrollTop()> 1250) {
    $("#my-story-title").fadeIn();
    $("#story-form").fadeIn();
   } else {
    $("#my-story-title").fadeOut();
    $("#story-form").fadeOut();
   }
    
});
