$(document).ready(function() {

    function initialize(location)
    {
        var currentLocation = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);
        var mapOptions = {    center: currentLocation,
            zoom: 14,
            mapTypeID: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
        var marker = new google.maps.Marker({
            position: currentLocation,
            map: map,
        });
        iconFile = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
        marker.setIcon(iconFile)

        google.maps.event.addListener(map, 'click', function(event) {
            console.log(event.latLng)
            var new_lat  = event.latLng.k
            var new_long = event.latLng.A
            var comment = prompt("Tell what you found","a glowing frog");
            var marker = new google.maps.Marker({
                animation: google.maps.Animation.DROP,
                position: event.latLng,
                map: map,
                title: comment,
                clickable: true
            });

            $.ajax({
                url: "/events",
                type: "post",
                data: {'lat':new_lat, 'long':new_long, 'comment':comment}
            })

            var contentString = '<div id="event_desc">'+comment+'</div>';

            var infowindow = new google.maps.InfoWindow();

            infowindow.setContent(contentString);

            google.maps.event.addListener(marker, 'click', function() {
                console.log("clicked on marker");
                infowindow.open(map,marker);
            });

        }); // end listener for map

        var placePins = function(allEvents) {
            for(var i = 0; i < allEvents.length; i++)
            {
                var latLng = new google.maps.LatLng(allEvents[i]['event']['lat'],allEvents[i]['event']['long']);
                var marker = new google.maps.Marker({
                                                        position: latLng,
                                                        map: map,
                                                        title: content,
                                                        clickable: true
                                                     });
                var content = allEvents[i]['event']['comment'];
                var infowindow = new google.maps.InfoWindow();

                google.maps.event.addListener(marker, 'click', (function(marker, i) { return function(){
                                                                                var content = allEvents[i]['event']['comment'];
                                                                                var contentString = '<div id="event_desc">'+content+'</div>';
                                                                                infowindow.setContent(contentString);
                                                                                infowindow.open(map,marker);
                                                                                    }
                                                                                })(marker, i));

            } // end for loop
        } // end placePins

        var populateMap = function() {
            console.log('hey')
            $.ajax({
                url: '/db',
                type: 'GET',
                dataType: 'json',
                success: function(events) {placePins(events)}
            })
        } // end populateMap

        populateMap();

    } // end initialize

    navigator.geolocation.getCurrentPosition(initialize);

}); // end document ready
