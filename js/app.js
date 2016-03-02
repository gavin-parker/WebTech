var start = function(){
  "use strict";
  angular.module('webApp', ['ui.bootstrap', 'ngAnimate', 'duScroll'])
  .controller('FeedCtrl', function($scope, $http){
    $scope.test = 'hi';
    $scope.filter = function(query){
      console.log(query);
    };

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




  })
  .controller('FormCtrl', function($scope){
    $scope.story = {};
    $scope.buttonText = "Share";
    var shared = false;
    $scope.submit = function(story){
      if(shared){
        return;
      }
      $scope.story = angular.copy(story);
      console.log($scope.story);
       if (validate($scope.story)){
         $scope.buttonText = "Done!";
         shared = true;
       }
    };



    var validate = function(story){
      if(story.Name.length > 20){
        console.log("error in name");
        return false;
      }
      if(story.Destination.length > 20){
        console.log("error in destination");
        return false;
      }
      if(story.Email.indexOf('@') == -1){
        console.log("error in email");
        return false;
      }
      return true;
    };
  })
  .controller('MainCtrl', function($scope){

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
