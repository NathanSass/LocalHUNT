$(document).ready(function(){
  var geo = {
    makeMap: function(position){
      var currentLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude)
      console.log("currentLocation below")
      console.log(currentLocation)
      var newMap     = new Map(currentLocation);
      var styledMap  = new google.maps.StyledMapType(newMap.mapStyles(), { name: "Styled Map"});
      googleMap      = new google.maps.Map(newMap.pageLocation, newMap.mapOptions(position))
      googleMap.mapTypes.set('map_style', styledMap);
      googleMap.setMapTypeId('map_style');
      var controller   = new Controller(googleMap, currentLocation)
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