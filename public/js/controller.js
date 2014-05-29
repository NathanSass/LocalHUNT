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
  },

  showForm: function(){
    $('.mark-something').click(function(){
      $('form').toggle('slow')
      $('.mark-something').toggleClass('drop-pin');
      this.createNewMarker()
    }.bind(this));
  },

  createNewMarker: function(event){
    $('.drop-pin').on("click", function(){
      console.log("below drop-pin")
      if($('input').val().length > 5){
        console.log("in input")
        var newMarker = new Marker(this.map)
        newMarker.placeMarker(this.position)
        $('form').hide('slow')
      }
        $(".drop-pin").unbind( "click");
        $(".mark-something").unbind( "click");
        this.bindListeners();
    }.bind(this))
  }
}