

$(document).ready(function() {
  // This is called after the document has loaded in its entirety
  var mapOptions = {
      center: new google.maps.LatLng(37.7831,-122.4039),
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  new google.maps.Map(document.getElementById('map'), mapOptions);
  console.log('js is loaded')

  // This guarantees that any elements we bind to will exist on the page
  // when we try to bind to them

  // See: http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
});
