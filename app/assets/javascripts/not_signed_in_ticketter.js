
function initNotSignedTicketterMap() {

  //finds the location of current user ***********************
  if(navigator.geolocation) {
    var map;
    var mapOptions = {
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
        //when button is clicked, ticketter location is saved and sent to all checkins that apply
      $("#btn_ticketter_no_signup").click(function(){

        // start a spinner
        navigator.geolocation.getCurrentPosition(function(position) {
          $.ajax({
            url: '/ticketter_locations/',
            method: "POST",
            data:  {ticketterlocation: {"tick_lat": position.coords.latitude, "tick_lng": position.coords.longitude}},
            dataType: 'json'
          }).done(function(response) {
            distance(response.users_lat, response.users_lng, response.tick_lat, response.tick_lng);
            console.log(response.users_lat)
          });
        });
      });

      var distance = function(users_lat, users_lng,lat, lng) {

          navigator.geolocation.getCurrentPosition(function(position) {
    //searches one ticketter location against many user check-ins
          var ticketter_loca = new google.maps.LatLng(lat, lng);

            $.each(users_lat, function(i, item)  {
              var users_latitude = users_lat[i].lat
              var users_longitude = users_lng[i].long
console.log(users_longitude)
console.log(users_latitude)

              var checkin_users = new google.maps.LatLng(users_latitude, users_longitude);

              //calculates the distance between ticketters and recent checkin
              var distance = google.maps.geometry.spherical.computeDistanceBetween(ticketter_loca, checkin_users);
                if (distance<= 350){
                  alert("you have alerted someone ")
                }
            });
          });
    }
  } else {
      document.getElementById('map').innerHTML = 'No Geolocation Support.';
  }


};
