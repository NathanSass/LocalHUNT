
$(document).ready(function() {

  var mapOptions = {
      center: new google.maps.LatLng(37.7831, -122.4039),
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
   // console.log("longitude below")
   // console.log(event.latLng["k"])
   // console.log(event.latLng["A"])
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

    console.log(marker["position"]["k"]) //lat
    console.log(marker["position"]["A"]) //long
    console.log(marker.info["content"]) //content


    google.maps.event.addListener(marker, 'click', function() {
      marker.info.open(map, marker);
    });



  }

})

///below

// function GoogleAPI(){
//   this.map; //very important semi-colon
//   this.mapOptions = {
//       center: new google.maps.LatLng(37.7831, -122.4039),
//       zoom: 12,
//       mapTypeId: google.maps.MapTypeId.TERRAIN
//   };
// }

// GoogleAPI.prototype = {
//   initialize: function(){
//    this.map = new google.maps.Map(document.getElementById('map'), this.mapOptions);
//   },
// }

// markerOptions = {

// }

// function Marker(lat, longi){
//   this.LatLng = LatLng(lat, longi)
//   this.placeMarker =

// }

// Marker.prototype = {
//   createMarker: function(markerOptions){
//     return new google.maps.Marker(markerOptions)
//   },
//   setMarker: function(createdMarker){
//     createdMarker.setMap(this.map)
//   }
// }


// $(document).ready(function() {


// var myMap = new GoogleAPI()
// myMap.initialize()

// var markerOptions = {
//     position: new google.maps.LatLng(37.7831, -122.4039)
// };


// var myMarker = myMap.createMarker(markerOptions)
// myMarker.setMap(myMap);
// });

