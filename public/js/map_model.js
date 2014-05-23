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
      mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
      }
    };
    return mapOptions
  },

  mapStyles: function(){
     var styles = [
    {
      stylers: [
        { hue: "#00ffe6" },
        { saturation: -20 }
      ]
    },{
      featureType: "road",
      elementType: "geometry",
      stylers: [
        { lightness: 100 },
        { visibility: "simplified" }
      ]
    },{
      featureType: "road",
      elementType: "labels",
      stylers: [
        { visibility: "off" }
      ]
    }
  ];
  return styles;
  },

   useGeoLocation: function(){
    navigator.geolocation.getCurrentPosition(this.mapOptions.bind(this))
  },

  getCurrentLocation: function(){
     return new google.maps.LatLng(location.coords.latitude, location.coords.longitude)
  }
}