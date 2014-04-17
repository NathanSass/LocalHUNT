
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


function Marker(map){
  this.map = map
}

Marker.prototype = {
  placeMarker: function(location){
    var marker = new google.maps.Marker({
        animation: google.maps.Animation.DROP,
        position: location,
        map: this.map, //need to have the proper mao
        clickable: true
      });
      this.addLabel(marker)
      this.bindShowContentListener(marker)
  },
  addLabel: function(marker){
    marker.info = new google.maps.InfoWindow({
      content: prompt("Please enter the cool thing","A dead squirrel")
    });
  },
  bindShowContentListener: function(marker){
    google.maps.event.addListener(marker, 'click', function() {
      marker.info.open(this.map, marker);
    });
  }
}

function Controller(map){
  this.map = map
}

Controller.prototype = {
  bindListeners: function(){ /////////possibly sketchy naming
    google.maps.event.addListener(this.map, 'click', this.createMarker.bind(this));


  },
  initializeMarker: function(){
    return new Marker(this.map)
  },
  createMarker: function(event){
    var newMarker = this.initializeMarker()
    newMarker.placeMarker(event.latLng)

  }
}


$(document).ready(function(){

  var newMap = new Map()

  var googleMap = new google.maps.Map(newMap.pageLocation, newMap.mapOptions())
  var controller = new Controller(googleMap)

  controller.bindListeners(googleMap)


})