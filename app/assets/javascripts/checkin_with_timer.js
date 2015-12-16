// function checkin_with_timer() {
// var hour = $("#hour").val();
// var min = $("#min").val();
// var timer = new Date(0000, 00, 00, hour, min, 0);
//
//   user_id = $('#current_user').val();
//   $('#form_check_timer').ajax({
//     url: '/checkin_locations/',
//     method: 'POST',
//     data:  {checkinlocation: {"check_lat": position.coords.latitude, "check_lng": position.coords.longitude, "user_id": user_id, "timer": timer }},
//     dataType: 'json'
//   })
// });
// }
function initCheckInWithTimerMap() {

  //finds the location of current user ***********************
  if(navigator.geolocation) {

      var map;
      var mapOptions = {
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      map = new google.maps.Map(document.getElementById('map'), mapOptions);
            //when button is clicked, check-in location should be saved and ran against ticketter locations

      $('#check_timer').click(function() {
        var hour = $("#hour").val();
        var min = $("#min").val();

        var timer = ((parseInt(hour)*60)+(parseInt(min)*60))*1000;
        // start a spinner
        console.log(timer)
        navigator.geolocation.getCurrentPosition(function(position) {
          // stop the spinner
          user_id = $('#current_user').val();
          $.ajax({
            url: '/checkin_locations/',
            method: 'POST',
            data:  {checkinlocation: {"check_lat": position.coords.latitude, "check_lng": position.coords.longitude, "user_id": user_id, "time": timer }},
            dataType: 'json'
          }).done(function(response) {
            if (response.status == "SUCCESS"){
              setTimeout(function() {distance(response.user_lat,
                response.user_lng, response.tick_lat,
                response.tick_lng)}, response.time);
          } else {
            alert("Cannot check in more than once!");
          }
        });
        });
      });

  var distance = function(lat,lng,tick_lat,tick_lng){
    navigator.geolocation.getCurrentPosition(function(position) {
          //the position of the checkin
      var check_in = new google.maps.LatLng(lat, lng);


      //iterates through TicketterLocation's lat and lng
        $.each(tick_lat, function(i, item) {

          var ticketters_latitude = tick_lat[i].tick_lat
          var ticketters_longitude = tick_lng[i].tick_lng

          //finds all the ticketter locations
          var ticketter = new google.maps.LatLng(ticketters_latitude, ticketters_longitude);

          //calculates the distance between ticketters and recent checkin
          var distance = google.maps.geometry.spherical.computeDistanceBetween(ticketter, check_in);

            //if distance is 350 meters or smaller, recent checkin will be notified
            if (distance<= 350){

              //messages back if there has been any ticketters
                alert("you have a ticketter in your area");
                console.log("alert")
                //mark of the current checkin, don't really need this
              var marker2 = new google.maps.Marker({
                map: map,
                position: new google.maps.LatLng(lat,lng),
                icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
                title: 'Check in Location'
              });
              //radius of current check in, dont really need this
              var circle = new google.maps.Circle({
                map: map,
                radius: 350,    // 10 miles in metres
                fillColor: '#AA0000'
              });
              circle.bindTo('center', marker2, 'position');
            }
          });
        map.setCenter(check_in);
      });
    }
  }else {
      document.getElementById('map').innerHTML = 'No Geolocation Support.';
  }
};
