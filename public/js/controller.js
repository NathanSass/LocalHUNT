function Controller(map){
  this.map = map
}

Controller.prototype = {
  initialize: function(){
    this.bindListeners()
  },

  bindListeners: function(){
    $('button').click(function(){
      this.allowMapClick(); 
    }.bind(this));
  },

  allowMapClick: function(){
    var listener = google.maps.event.addListener(this.map, 'click', this.createDBMarkers.bind(this));
  },

  createDBMarkers: function(event){
    var newMarker = this.initializeMarker()
    newMarker.placeMarker(event.latLng)
    google.maps.event.clearInstanceListeners(this.map);
  },

  initializeMarker: function(){
    return new Marker(this.map)
  }
}