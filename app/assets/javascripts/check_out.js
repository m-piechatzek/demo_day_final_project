"btn_location_signout"
function initCheckOutMap() {

      $("#btn_location_signout").click(function(){

          user_id = $('#current_user').val();
          $.ajax({
            url: '/checkin_locations/',
            method: "DELETE",
            dataType: 'json'
          }).done(function() {
            // distance(response.lat, response.long, response.tick_lat, response.tick_lng);
          });
          // $.ajax({
          //   url: '/checkin_locations/',
          //   method: "POST",
          //   data:  {checkinlocation: {"check_lat": position.coords.latitude, "check_lng": position.coords.longitude, "user_id": user_id}},
          //   dataType: 'json'
          // }).done(function(response) {
          //   distance(response.user_lat, response.user_lng, response.tick_lat, response.tick_lng);
          //   console.log(response.user_lat)
          // });
        });
       };

//   var distance = function(lat,lng,tick_lat,tick_lng){
//     navigator.geolocation.getCurrentPosition(function(position) {
//           //the position of the checkin
//       var check_in = new google.maps.LatLng(lat, lng);
//
//
//       //iterates through TicketterLocation's lat and lng
//         $.each(tick_lat, function(i, item) {
//
//           var ticketters_latitude = tick_lat[i].tick_lat
//           var ticketters_longitude = tick_lng[i].tick_lng
//
//           //finds all the ticketter locations
//           var ticketter = new google.maps.LatLng(ticketters_latitude, ticketters_longitude);
//
//           //calculates the distance between ticketters and recent checkin
//           var distance = google.maps.geometry.spherical.computeDistanceBetween(ticketter, check_in);
//
//             //if distance is 350 meters or smaller, recent checkin will be notified
//             if (distance<= 350){
//
//               //messages back if there has been any ticketters
//                 alert("you have a ticketter in your area");
//                 //mark of the current checkin, don't really need this
//               var marker2 = new google.maps.Marker({
//                 map: map,
//                 position: new google.maps.LatLng(lat,lng),
//                 icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
//                 title: 'Check in Location'
//               });
//               //radius of current check in, dont really need this
//               var circle = new google.maps.Circle({
//                 map: map,
//                 radius: 350,    // 10 miles in metres
//                 fillColor: '#AA0000'
//               });
//               circle.bindTo('center', marker2, 'position');
//             }
//           });
//         map.setCenter(check_in);
//       });
//     }
//   }else {
//       document.getElementById('map').innerHTML = 'No Geolocation Support.';
//   }
// };

            // var marker = new google.maps.Marker({
            //   map: map,
            //   position: new google.maps.LatLng(49.2820030, -123.1072000),
            //   title: 'Ticketter location'
            // });
      //*********************
          //marker of current_user

            // Add circle/radius

            //the map centers around the current_user's position
