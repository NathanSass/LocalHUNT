function Marker(map){
  this.map = map
}

Marker.prototype = {
  placeMarker: function(location){
    var marker = new google.maps.Marker({
        animation: google.maps.Animation.DROP,
        position:  location,
        map:       this.map,
        clickable: true,
        draggable: true,
        icon:      '../img/green_icon.png'
      });
      this.addLabel(marker)
      this.bindShowContentListener(marker)
      
      google.maps.event.addListener(marker, 'dragstart', function() {
        console.log(marker.getPosition());
      });
      google.maps.event.addListener(marker, 'dragend', function() {
        console.log(marker.getPosition());
      });

      var markerObject = this.prepareMarkerForAjax(marker)
      /////////////////
      ///AJAX CALL HERE
      /////////////////
      this.ajaxSendtoDB(markerObject).done(this.onSuccess)
  },

  addLabel: function(marker){
    marker.info = new google.maps.InfoWindow({
      content: prompt("Please enter the cool thing","A dead squirrel")
    });
  },

  bindMarkerListeners: function(){
    this.bindShowContentListener();
  }

  bindShowContentListener: function(marker){
    google.maps.event.addListener(marker, 'click', function() {
      marker.info.open(this.map, marker);
    });
  },

  prepareMarkerForAjax: function(marker){
    var lat       = this._roundNumber(marker["position"]["k"]);
    var longi     = this._roundNumber(marker["position"]["A"]);
    var content   = marker.info["content"]
    var markerObj = { latitude: lat, longitude: longi, content: content }
    return markerObj
  },

  _roundNumber: function(num){
    return Math.round(num * 1000) / 1000
  },

  ajaxSendtoDB: function(markerObj){
     var response = $.ajax({
        type: "post",
        url: '/events',
        data: markerObj,
        success: this.onSuccess
      })
    return response
  },

  onSuccess: function(){
    console.log("on success, marker model line 54")
  },

  populateMap: function(){
    var response = $.ajax({
        url:      '/db',
        type:     'GET',
        dataType: 'json'
    })
    return response
  },

  placePins: function(allEvents){
    for(var i = 0; i < allEvents.length; i++){
      var latLng  = new google.maps.LatLng(allEvents[i]['event']['latitude'],allEvents[i]['event']['longitude']);
      var content = allEvents[i]['event']['content']
      this.placeDBMarker(latLng, content)
    }
  },

  placeDBMarker: function(location, content){
    var marker = new google.maps.Marker({
        animation:  google.maps.Animation.DROP,
        position:   location,
        map:        this.map,
        clickable:  true
      });
      this.addDBLabel(marker,content)
      this.bindShowContentListener(marker)
      var markerObject = this.prepareMarkerForAjax(marker)
  },

  addDBLabel: function(marker, content){
    marker.info = new google.maps.InfoWindow({
      content: content
    });
  }
}