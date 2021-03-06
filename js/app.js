var start = function(){
  "use strict";
  angular.module('webApp', ['ui.bootstrap', 'ngAnimate', 'duScroll'])
  .controller('FeedCtrl', function($scope, $http){
    $scope.test = 'hi';
    $scope.down = "\u25BC";
    $scope.loggedIn = false;
    var name = null;
    $scope.filter = function(query){
      console.log(query);
    };


    if(typeof(Storage) !== "undefined"){
      console.log("storage on");
      name = sessionStorage.getItem("user");
      console.log(name);
      if(name !== null){
        $scope.loggedIn = true;
      }
    }
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
        url: '/comment?text=' + comment.contents + '&name=' + name + '&locID=' + $scope.holidays[index].id
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
    $scope.name="";
    $scope.loggedIn = false;
    $scope.isError = false;
    $scope.errorMessage = "";
    $("#country").countrySelect();

    if(typeof(Storage) !== "undefined"){
      console.log("storage on");
      var name = sessionStorage.getItem("user");
      console.log(name);
      if(name !== null){
        $scope.name = name;
        $scope.loggedIn = true;
      }
    }

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

      if($scope.story.Name === undefined){
        $scope.errorMessage = "Please enter a name";
        $scope.isError = true;
        return;
      }
      if($scope.story.Destination === undefined){
        $scope.errorMessage = "Please enter a destination city";
        $scope.isError = true;
        return;
      }
      if($scope.story.Email === undefined){
        $scope.errorMessage = "Please enter an email";
        $scope.isError = true;
        return;
      }
      if($scope.story.Description === undefined){
        $scope.errorMessage = "Please enter a description";
        $scope.isError = true;
        return;
      }
      if($scope.story.Weather === undefined){
        $scope.errorMessage = "Please select a weather option";
        $scope.isError = true;
        return;
      }
      if($scope.story.Price === undefined){
        $scope.errorMessage = "Please select a price option";
        $scope.isError = true;
        return;
      }
      $scope.isError=false;
      console.log(story);
         $scope.buttonText = "Done!";
         story.Country = $("#country").countrySelect("getSelectedCountryData").name;
         var url =  '/post?name=' + encodeURIComponent(story.Name);
         url += '&dest='  + encodeURIComponent(story.Destination);
         url += '&country=' + encodeURIComponent(story.Country);
         url += '&email=' + encodeURIComponent(story.Email);
         url += '&desc=' + encodeURIComponent(story.Description);
         url +=  "&weather=" + story.Weather;
         url += "&price=" + story.Price;
         $http({
           method: 'POST',
           url:url
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
  .controller('indexCtrl', function($scope, $http, $interval){
    $scope.holidays = [];
    $scope.display = [];
    var item = 0;
    $scope.show = [1,1,1,1];
    var displayUpdater;
    var recieveHolidays = function(result){
      console.log(result);
      $scope.holidays = sortBy(result, "rating").reverse();
      $scope.display[0] = $scope.holidays[0];
      $scope.display[0].id = 0;
      $scope.display[1] = $scope.holidays[1];
      $scope.display[1].id = 1;
      $scope.display[2] = $scope.holidays[2];
      $scope.display[2].id = 2;
      $scope.display[3] = $scope.holidays[3];
      $scope.display[3].id = 3;
      displayUpdater = $interval(updateItem,3000);
      console.log($scope.holidays);
    };
    $http.get('?query=holidays').success(recieveHolidays);
    var sortBy = function(holidays, key){
      return holidays.sort(function(a, b) {
              var x = a[key]; var y = b[key];
              return ((x < y) ? -1 : ((x > y) ? 1 : 0));
      });
    };
    var updateItem = function(){
      var index = $scope.display[item].id;
      var len = $scope.holidays.length;
      $scope.display[item] = $scope.holidays[(index+4)%len];
      $scope.display[item].id = (index+4)%len;
      item = (item+1)%4;
      console.log("updated" + item);
      $scope.show[item] = 1;
    };
  })
  .controller("loginCtrl",function($scope,$http, $window) {
    $scope.isError = false;
    $scope.errorMessage="";
    $scope.isSuccess = false;
    $scope.successMessage="";
    console.log("hi");
    $scope.create = function(user){
      if(user === undefined){
        return;
      }
      console.log("hi");
        var data = JSON.stringify(user);
        console.log(data);
        $http({
          method: 'POST',
          url: '/create?user=' + user.name + '&pass=' + user.pass
        }).then(function(res){
          console.log(res);
          if(res.data == "failure"){
            $scope.errorMessage = "A user with that name already exists";
            $scope.isError = true;
          }else{
            $scope.isError = false;
            $scope.isSuccess = true;
            $scope.successMessage = "Welcome, " + user.name + ". Click 'Login' to continue";
          }
        },function(){
          console.log("oh dear");
        });

    };
        $scope.login = function(user) {
          if(user === undefined){
            return;
          }
          console.log("hi");
            var data = JSON.stringify(user);
            console.log(data);
            $http({
              method: 'POST',
              url: '/login?user=' + user.name + '&pass=' + user.pass
            }).then(function(res){
              console.log(res.data);
              if(res.data == "failure"){
                $scope.errorMessage = "Incorrect username or password";
                $scope.isError = true;
              }else{
                $scope.isError = false;
                if(typeof(Storage) !== "undefined"){
                  sessionStorage.setItem("user", user.name);
                  sessionStorage.setItem("pass", user.pass);
                }else{
                  alert("You appear to be using an incompatible browser");
                }
                $window.location.href = 'index.html';
              }
            },function(){
              console.log("oh dear");
            });
        };
    }
  )
  .controller('navCtrl', function($scope){
    $scope.welcome = "";
    $scope.loggedIn = false;

    if(typeof(Storage) !== "undefined"){
      console.log("storage on");
      var name = sessionStorage.getItem("user");
      console.log(name);
      if(name !== null){
        $scope.welcome = "Hello, " + name + "!";
        $scope.loggedIn = true;
      }
    }

    $scope.logout = function(){
      sessionStorage.clear();
      $route.reload();
    };
  })
  .controller('mapCtrl', function($scope, $http){
    var myMarker = L.icon({
      iconUrl: './img/locationsmall.png',
      iconAnchor: [8,8],
      popupAnchor: [8, 8]
    });
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
        var marker = L.marker(loc, {icon:myMarker}).addTo(mymap);
        var popup = "<b>" + $scope.holidays[i].destination + "</b><br/>" + $scope.holidays[i].description;
        marker.bindPopup(popup);
      }catch(error){

      }
      }
      mymap.invalidateSize();

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
      /*
    if ($(this).scrollTop() < 1250) {
        $("#diaries").css("border-bottom","4px solid orangered");
        $("#diaries").css("color","orangered");
    }
    else {
        $("#diaries").css("border-bottom","0px");
        $("#diaries").css("color","#777");
    }
      */
  } else {
    $("#diary1-text").fadeOut();
    $("#diary2-text").fadeOut();
      /*
    $("#diaries").css("border-bottom","0px");
    $("#diaries").css("color","#777");
        */
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
      /*
    if ($(this).scrollTop() < 1850) {
        $("#your-story").css("border-bottom","4px solid orangered");
        $("#your-story").css("color","orangered");
    }
    else {
        $("#your-story").css("border-bottom","0px");
        $("#your-story").css("color","#777");
    }
    */
    $("#my-story-title").fadeIn();
    $("#story-form").fadeIn();
  } else {
    $("#my-story-title").fadeOut();
    $("#story-form").fadeOut();
      /*
    $("#your-story").css("border-bottom","0px");
    $("#your-story").css("color","#777");
    */
  }
  if ($(this).scrollTop()> 2450) {
    $("#contact-title").fadeIn();
    $("#gavin").fadeIn();
    $("#mudit").fadeIn();
  } else {
    $("#contact-title").fadeOut();
    $("#gavin").fadeOut();
    $("#mudit").fadeOut();
  }

});
