var start = function(){
  "use strict";
  angular.module('webApp', ['ui.bootstrap', 'ngAnimate', 'duScroll'])
  .controller('FeedCtrl', function($scope, $http){
    $scope.test = 'hi';
    $scope.down = "\u25BC";
    $scope.filter = function(query){
      console.log(query);
    };

    var recieveHolidays = function(result){
      console.log(result);
      $scope.holidays = sortBy(result, "rating").reverse();
      console.log($scope.holidays);
    };

    $scope.getArrow = function(active){
      if(active){
        return "\u25B2";
      }else{
        return "\u25BC";
      }
    };
    $scope.getNumber = function(num){
      return new Array(parseInt(num));
    };
    $scope.heart = function(index){
      if($scope.holidays[index].heart){
        $scope.holidays[index].heart = false;
        $scope.holidays[index].rating --;
        $http({
          method: 'POST',
          url: '/rating?holid='+ $scope.holidays[index].id + '&up=false'
        }).then(function(){
          console.log("submitted rating");
        }, function(){
          console.log("Failed to send rating to server");
        });
      }else{
        $scope.holidays[index].heart = true;
        $scope.holidays[index].rating ++;
        $http({
          method: 'POST',
          url: '/rating?holid='+ $scope.holidays[index].id + '&up=true'
        }).then(function(){
          console.log("submitted rating");
        }, function(){
          console.log("Failed to send rating to server");
        });
      }
    };

    $scope.getHeartStyle = function(index){
      if($scope.holidays[index].heart){
        return {color : '#F48FB1'};
      }else{
        return {color : '#E0E0E0'};
      }
    };
    $http.get('?query=holidays').success(recieveHolidays);
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
    $scope.submitComment = function(comment, index){
      $scope.holidays[index].Commented = true;
      $scope.holidays[index].comments.push(comment);
      $http({
        method: 'POST',
        url: '/comment?text=' + comment.contents + '&name=' + comment.name + '&locID=' + $scope.holidays[index].id
      }).then(function(){
        console.log("submitted comment");
      }, function(){
        console.log("failed to submit comment");
      }
    );
    };
    var sortBy = function(holidays, key){
      return holidays.sort(function(a, b) {
              var x = a[key]; var y = b[key];
              return ((x < y) ? -1 : ((x > y) ? 1 : 0));
      });
    };




  })
  .controller('FormCtrl', function($scope, $http){
    $scope.story = {};
    $scope.buttonText = "Share";
    $("#country").countrySelect();



    function resetFormAnimation(){
      var elem = document.getElementById("story-form");
      var pos = window.getComputedStyle(elem,null).getPropertyValue("marginTop");
      var width = elem.clientHeight;
      console.log(width);
      var id = setInterval(frame, 5);
      function frame(){
        pos = pos - 4;
        elem.style.marginTop = pos + 'px';
        if(pos < -width){
          clearInterval(id);
          elem.style.marginTop = "5%";
          $scope.story = {};
          return;
        }
      }
    }


    $scope.submit = function(story){
      $scope.story = angular.copy(story);
      console.log(story);
         $scope.buttonText = "Done!";
         story.Country = $("#country").countrySelect("getSelectedCountryData").name;
         $http({
           method: 'POST',
           url: '/post?name=' + story.Name + '&dest=' + story.Destination + '&country=' + story.Country + '&email=' + story.Email + '&desc=' + story.Description + "&weather=" + story.Weather + "&price=" + story.Price
         }).then(function(){
           console.log("hi");
           resetFormAnimation();
           story = {};
           $scope.story = {};
         }, function(){
           console.log("oh dear");
         }
        );
    };
  })
  .controller('indexCtrl', function($scope, $http){
    $scope.holidays = [];
    var recieveHolidays = function(result){
      console.log(result);
      $scope.holidays = sortBy(result, "rating").reverse();
      console.log($scope.holidays);
    };
    $http.get('?query=holidays').success(recieveHolidays);
    var sortBy = function(holidays, key){
      return holidays.sort(function(a, b) {
              var x = a[key]; var y = b[key];
              return ((x < y) ? -1 : ((x > y) ? 1 : 0));
      });
    };
  })
  .controller('mapCtrl', function($scope, $http){
    var mymap = L.map('map').setView([51.505, -0.09], 2);
    console.log("hello");
    //http://otile4.mqcdn.com/tiles/1.0.0/osm/3/5/2.png
    var osmUrl='http://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png';
	  var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
	  var osm = new L.TileLayer(osmUrl, {minZoom: 2, maxZoom: 4, attribution: osmAttrib});
    mymap.addLayer(osm);
    mymap.invalidateSize();
    $scope.holidays = [];

    var recieveHolidays = function(result){
      console.log(result);
      $scope.holidays = sortBy(result, "rating").reverse();
      for(var i=0;i<10;i++){
        try{
        var loc = JSON.parse($scope.holidays[i].loc);
        console.log(loc);
        var marker = L.marker(loc).addTo(mymap);
        var popup = "<b>" + $scope.holidays[i].destination + "</b><br/>" + $scope.holidays[i].description;
        marker.bindPopup(popup);
      }catch(error){

      }
      }
    };

    $http.get('?query=holidays').success(recieveHolidays);

    var sortBy = function(holidays, key){
      return holidays.sort(function(a, b) {
              var x = a[key]; var y = b[key];
              return ((x < y) ? -1 : ((x > y) ? 1 : 0));
      });
    };

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
