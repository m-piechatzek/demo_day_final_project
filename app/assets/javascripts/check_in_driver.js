// <script type="text/javascript">




function initMap() {
// var lat = $('.loca').data('latitude')
// var lat1 = <%= @latitude %>
// var long1 = <%= @longitude %>
console.log(lat1)
console.log(long1)
//finds the location of current user ***********************
if(navigator.geolocation) {

    var map;
    var mapOptions = {
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById('map'), mapOptions);

    navigator.geolocation.getCurrentPosition(function(position) {
  var user2 = new google.maps.LatLng(lat1, long1);
      //************************
console.log(user2)
      //geolocate is the location of the user
    var geolocate = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    //_pCord hardcoded position of another 'user'
    var _pCord = new google.maps.LatLng(49.2820030, -123.1072000);
    //finds the distance between current_user and _pCord
    var distance = google.maps.geometry.spherical.computeDistanceBetween(_pCord, user2);
    //if distance is within 700m then the marker will show *****************
          console.log(google.maps.geometry.spherical.computeDistanceBetween(_pCord, user2));
      if (distance<= 350){

            var marker = new google.maps.Marker({
              map: map,
              position: new google.maps.LatLng(lat1,
                 long1),
              title: 'Check in'
            });
          }
            var marker2 = new google.maps.Marker({
              map: map,
              position: new google.maps.LatLng(49.2820030,
                 -123.1072000),
                 icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
              title: 'Ticketter Location'
            });
      //*********************
          //marker of current_user

            // Add circle/radius
            var circle = new google.maps.Circle({
              map: map,
              radius: 350,    // 10 miles in metres
              fillColor: '#AA0000'
            });
            circle.bindTo('center', marker2, 'position');

            //the map centers around the current_user's position
        map.setCenter(_pCord);

      //hardcode test for location
        var blah = 12.0;

          //when button is clicked, user location should be saved
        $('#btn_location').click(function(){
        user_id = $('#current_user').val();
          $.ajax({
            type: "PUT",
            url: '/users/' + user_id,
            data: {user: {"lat": position.coords.latitude, "long": position.coords.longitude}},
            success: function() {
              alert('worked')
            },
            dataType: 'json'
          });
        });
    });

} else {
    document.getElementById('map').innerHTML = 'No Geolocation Support.';
}

};

// </script>
// <script async defer
//   src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBQscgJMUX5SPRMKa6eA1hFdoPSBnc33ig&libraries=geometry&callback=initMap">
// </script>
