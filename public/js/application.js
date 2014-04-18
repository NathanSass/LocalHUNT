
$(document).ready(function() {
  var mapOptions = {
      center: new google.maps.LatLng(37.7831, -122.4039), //start location
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.TERRAIN
  };
  var map = new google.maps.Map(document.getElementById('map'), mapOptions);

  var markerOptions = {
      position: new google.maps.LatLng(37.7831, -122.4039)
  };

  var marker = new google.maps.Marker(markerOptions);
  marker.setMap(map);

  google.maps.event.addListener(map, 'click', function(event) {
   placeMarker(event.latLng);
  });

  function placeMarker(location) {
    var marker = new google.maps.Marker({
      animation: google.maps.Animation.DROP,
      position: location,
      map: map,
      clickable: true
    });
    marker.info = new google.maps.InfoWindow({
      content: prompt("Please enter the cool thing","A dead squirrel")
    });


    console.log(marker["position"]["k"])
    console.log(marker["position"]["A"])
    console.log(marker.info["content"])



    google.maps.event.addListener(marker, 'click', function() {
      marker.info.open(map, marker);
    });



  }


})


