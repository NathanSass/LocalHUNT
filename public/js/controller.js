function Controller(map, position){
  this.map = map
  this.position = position
}

Controller.prototype = {
  initialize: function(){
    this.bindListeners()
  },
//re write these to drop a pin on position
  bindListeners: function(){
    this.showForm()
    $('.drop-pin').click(this.createDBMarkers.bind(this))
  },

  showForm: function(){
    $('.mark-something').click(function(){
      $('form').show('slow')
    });
  },

  createDBMarkers: function(event){
    var newMarker = this.initializeMarker()
    // debugger
    // debugger
    newMarker.placeMarker(this.position)
    // google.maps.event.clearInstanceListeners(this.map);
  },

  initializeMarker: function(){
    return new Marker(this.map)
  }
}