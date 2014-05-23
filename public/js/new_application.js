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