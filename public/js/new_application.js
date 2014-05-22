/////////////////
///MAP MODEL
/////////////////

function Map(){
  this.pageLocation = document.getElementById('map')
}

Map.prototype = {
  initialize: function(){
    return this.mapOptions()
  },
  mapOptions: function(position){
    var currentLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude)
    var mapOptions = {
      center: currentLocation,
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.TERRAIN
    };
    return mapOptions
  },
   useGeoLocation: function(){
    navigator.geolocation.getCurrentPosition(this.mapOptions.bind(this))
  },

  getCurrentLocation: function(){
     return new google.maps.LatLng(location.coords.latitude, location.coords.longitude)
  }
}


function Marker(map){
  this.map = map
}

/////////////////
///MARKER MODEL
/////////////////

Marker.prototype = {
  placeMarker: function(location){
    var marker = new google.maps.Marker({
        animation: google.maps.Animation.DROP,
        position: location,
        map: this.map,
        clickable: true
      });
      this.addLabel(marker)
      this.bindShowContentListener(marker)
      var markerObject = this.prepareMarkerForAjax(marker)
      /////////////////
      ///AJAX CALL HERE
      /////////////////
      this.ajaxSendtoDB(markerObject).done(this.onSuccess)
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
  },

  prepareMarkerForAjax: function(marker){
    var lat = marker["position"]["k"]
    var longi = marker["position"]["A"]
    var content = marker.info["content"]
    var markerObj = { latitude: lat, longitude: longi, content: content }
    return markerObj
  },

  ajaxSendtoDB: function(markerObj){
     var response = $.ajax({
        type: "post",
        url: '/events',
        data: markerObj,
        success: this.onSuccess
      })
    return response
  },

  onSuccess: function(){
    console.log("on success")
  },

  populateMap: function(){
    var response = $.ajax({
        url: '/db',
        type: 'GET',
        dataType: 'json'
    })
    return response
  },

  placePins: function(allEvents){
    for(var i = 0; i < allEvents.length; i++){
      var latLng = new google.maps.LatLng(allEvents[i]['event']['latitude'],allEvents[i]['event']['longitude']);
      var content = allEvents[i]['event']['content']
      this.placeDBMarker(latLng, content)
    }
  },
  placeDBMarker: function(location, content){
    var marker = new google.maps.Marker({
        animation: google.maps.Animation.DROP,
        position: location,
        map: this.map,
        clickable: true
      });
      this.addDBLabel(marker,content)
      this.bindShowContentListener(marker)
      var markerObject = this.prepareMarkerForAjax(marker)
  },
  addDBLabel: function(marker, content){
    marker.info = new google.maps.InfoWindow({
      content: content
    });
  }
}

/////////////////
///CONTROLLER
/////////////////


function Controller(map){
  this.map = map
}

Controller.prototype = {
  initialize: function(){
    this.bindListeners()
  },

  bindListeners: function(){
    google.maps.event.addListener(this.map, 'click', this.createMarker.bind(this));
  },

  createMarker: function(event){
    var newMarker = this.initializeMarker()
    newMarker.placeMarker(event.latLng)
  },

  initializeMarker: function(){
    return new Marker(this.map)
  }

}


/////////////////
///INITIALIZE
/////////////////

$(document).ready(function(){
  var geo = {
    newMap: null,
    makeMap: function(position){
      var newMap = new Map()
      googleMap = new google.maps.Map(newMap.pageLocation, newMap.mapOptions(position))
      var controller = new Controller(googleMap)
      var addDBMarkers = new Marker(googleMap)
      controller.initialize()
      /////////////////
      ///AJAX CALL HERE
      /////////////////
      addDBMarkers.populateMap().done(addDBMarkers.placePins.bind(addDBMarkers))
    }
  }
  navigator.geolocation.getCurrentPosition(geo.makeMap)//could add code here for error
})