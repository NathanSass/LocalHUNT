
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
  // createGoogleMap: function(){

  // var newMap = new Map()
  // }
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
      var markerObject = this.prepareMarkerForAjax(marker)
      console.log(markerObject)
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
     $.ajax({
        type: "post",
        url: '/events',
        data: markerObj,
        success: this.onSuccess
      })
    return response //ERROR HERE
  },
  onSuccess: function(){
    console.log("on success")
  }
}

function Controller(map){
  this.map = map
}

Controller.prototype = {
  bindListeners: function(){
    google.maps.event.addListener(this.map, 'click', this.createMarker.bind(this));
  },
  initializeMarker: function(){
    return new Marker(this.map)
  },
  createMarker: function(event){
    var newMarker = this.initializeMarker()
    newMarker.placeMarker(event.latLng)
  }
  //NEED TO DO ADD IN WAYS TO SEND DATA TO THE MODEL

}


$(document).ready(function(){
  var newMap = new Map()
  var googleMap = new google.maps.Map(newMap.pageLocation, newMap.mapOptions()) //I need to save this map so I can always reference it
  var controller = new Controller(googleMap) //redefine the name of google map
  controller.bindListeners(googleMap)


})