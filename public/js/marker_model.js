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
        // draggable: true, ADD THIS LINE BACK IN FOR FULL FUNCATIONALITY
        icon:      '../img/green_icon.png'
      });

      this.addLabel(marker);
      this.bindShowContentListener(marker);
      this.updateMarkerPositionAfterDrag(marker);
      var markerObject = this.prepareMarkerForAjax(marker)
      /////////////////
      ///AJAX CALL HERE
      /////////////////
      this.ajaxSendtoDB(markerObject, '/events').done(this.onSuccess);
  },

  addLabel: function(marker){
    marker.info = new google.maps.InfoWindow({
      content: prompt("Please enter the cool thing","A dead squirrel")
    });
  },

  updateMarkerPositionAfterDrag: function(marker){
    google.maps.event.addListener(marker, 'dragstart', function(){
      var dragStart = this.prepareMarkerForAjax(marker)
      google.maps.event.addListener(marker, 'dragend', function(){
        var dragEnd    = this.prepareMarkerForAjax(marker)
        var markerInfo = { initialPos: dragStart, endPos: dragEnd }
        /////////////////
        ///AJAX CALL HERE
        /////////////////
        this.ajaxSendtoDB(markerInfo, '/events/update').done(this.onSuccess);
      }.bind(this))
    }.bind(this));
  },

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

  ajaxSendtoDB: function(markerObj, action){
     var response = $.ajax({
        type: 'POST',
        url: action,
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
        type:     'GET',
        url:      '/db',
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