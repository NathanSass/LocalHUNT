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
      if($('input').val().length > 5){
        this.createNewMarker();
      }
    }.bind(this));
  },

  createNewMarker: function(event){
    $('.drop-pin').on("click", function(){
      // if($('input').val().length > 5){
        var newMarker = new Marker(this.map)
        newMarker.placeMarker(this.position)
        $('form').hide('slow')
        $(".drop-pin").unbind( "click");
        $(".mark-something").unbind( "click");
        this.bindListeners();
        
      // }
    }.bind(this))
  }
}