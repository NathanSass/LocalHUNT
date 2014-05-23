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