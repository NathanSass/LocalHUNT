
//models
//some of the functions should accept variables.

function Map(){
  this.pageLocation = document.getElementById('map')
}

Map.prototype = {
  mapOptions: function(){
    var mapOptions = {
      center: new google.maps.LatLng(37.7831, -122.4039),
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.TERRAIN
  };
  return mapOptions
  }
}


function Marker(){
  //need a map
  //they take lat and long
  //options
}
Marker.prototype = {
  placeMarker: function(location){
    var marker = new google.maps.Marker({
        animation: google.maps.Animation.DROP,
        position: location,
        map: map,
        clickable: true
      });
      marker.info = new google.maps.InfoWindow({
        content: prompt("Please enter the cool thing","A dead squirrel")
      });
  }
}

function Controller(){}

Controller.prototype = {
  bindListeners: function(){ /////////issue with marker naming below
    google.maps.event.addListener(map, 'click', this.createMarker(event.latLng));
  },
  createMarker: function(location){
    var newMarker = new Marker() //sketchy but possibly awesome
    newMarker.placeMarker(location)

  }
}


$(document).ready(function(){
  var controller = new Controller()

  var newMap = new Map()

  var googleMap = new google.maps.Map(newMap.pageLocation, newMap.mapOptions())

  controller.bindListeners()


})