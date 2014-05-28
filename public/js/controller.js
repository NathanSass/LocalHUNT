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
    // this.createNewMarker()
  },

  showForm: function(){
    $('.mark-something').click(function(){
      $('form').toggle('slow')
      $('.mark-something').toggleClass('drop-pin');
      this.createNewMarker();
    }.bind(this));
  },

  createNewMarker: function(event){
    $('.drop-pin').on("click", function(){
       console.log("in drop")
      var newMarker = new Marker(this.map)
      newMarker.placeMarker(this.position)
      $('form').hide('slow')
      $(".drop-pin").unbind( "click");
      $(".mark-something").unbind( "click");
      this.bindListeners();
    }.bind(this))
  }
}