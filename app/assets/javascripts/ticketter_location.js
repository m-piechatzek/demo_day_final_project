function initTicketterMap() {

  //finds the location of current user ***********************
  if(navigator.geolocation) {

    var map;
    var mapOptions = {
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById('map'), mapOptions);


              //when button is clicked, check-in location should be saved and ran against ticketter locations

      $('#btn_ticketter').click(function(){

        // start a spinner
        navigator.geolocation.getCurrentPosition(function(position) {
          // stop the spinner
          user_id = $('#current_user').val();
          $.ajax({
            url: '/users/' + user_id + ".json",
            method: "PUT",
            data: {user: {"lat": position.coords.latitude, "long": position.coords.longitude}},
            dataType: 'json'
          }).done(function() {
            // distance(response.lat, response.long);
          });

          $.ajax({
            url: '/ticketter_locations/',
            method: "POST",
            data:  {ticketterlocation: {"tick_lat": position.coords.latitude, "tick_lng": position.coords.longitude, "user_id": user_id}},
            dataType: 'json'
          }).done(function(response) {
            distance(response.users_lat, response.users_lng, response.tick_lat, response.tick_lng, response.all_checkins);


          });
        });
      });


// ***************************************
// have to change over users
// i think i did it
    var distance = function(users_lat, users_lng,lat, lng, users) {
      var user_id_js = users["all_checkin_user"]
      var user_lat_js = users["check_lat"]
      var user_lng_js = users["check_lng"]
          navigator.geolocation.getCurrentPosition(function(position) {
    //searches one ticketter location against many user check-ins
          var ticketter_loca = new google.maps.LatLng(lat, lng);

            $.each(user_lat_js, function(i, item)  {
              var users_latitude = user_lat_js[i].check_lat
              var users_longitude = user_lng_js[i].check_lng

// alert(checkin_users)

              var checkin_users = new google.maps.LatLng(users_latitude, users_longitude);
              //calculates the distance between ticketters and recent checkin
              var distance = google.maps.geometry.spherical.computeDistanceBetween(ticketter_loca, checkin_users);


            if (distance<= 350){
              // swal("You have alerted someone!", "", "success");
              current_user_js = $('#current_user').val();

              if(user_id_js[i].user_id == current_user_js)
              {

                swal("There is a ticketter in your area!", "", "warning");
              }
      //instead of markings there will be push notifications letting users who have checked in know there is a ticketter in the area
                  // var marker = new google.maps.Marker({
                  //   map: map,
                  //   position: new google.maps.LatLng(lat,
                  //      lng),
                  //   title: 'current ticketter'
                  // });
                  // var circle = new google.maps.Circle({
                  //   map: map,
                  //   radius: 350,    // 10 miles in metres
                  //   fillColor: '#AA0000'
                  // });
                  // circle.bindTo('center', marker, 'position');
                }
                // var marker2 = new google.maps.Marker({
                //   map: map,
                //   position: new google.maps.LatLng(49.2820030,
                //      -123.1072000),
                //      icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
                //   title: 'Ticketter Location'
                // });
          //*********************
              //marker of current_user

                // Add circle/radius

                //the map centers around the current_user's position

            // map.setCenter(ticketter_loca);

          //hardcode test for location
        });
      });
    }
  } else {
      document.getElementById('map').innerHTML = 'No Geolocation Support.';
  }


};
