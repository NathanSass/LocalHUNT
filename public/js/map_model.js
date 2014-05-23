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