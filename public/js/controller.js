function Controller(map, position){
  this.map = map
  this.position = position
}

Controller.prototype = {
  initialize: function(){
    this.bindListeners()
  },

  bindListeners: function(){
    this.showForm()
    this.createNewMarker()
  },

  showForm: function(){
    $('.mark-something').click(function(){
      $('form').toggle('slow')
    });
  },

  createNewMarker: function(event){
    $('.drop-pin').click(function(){
      var newMarker = new Marker(this.map)
      newMarker.placeMarker(this.position)
      $('form').hide('slow')
    }.bind(this))
  }
}