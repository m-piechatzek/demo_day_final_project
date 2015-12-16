
function initRecentTickMap() {

  //finds the location of current user ***********************
  if(navigator.geolocation) {

      var map;
      var mapOptions = {
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      map = new google.maps.Map(document.getElementById('map'), mapOptions);
            //when button is clicked, check-in location should be saved and ran against ticketter locations

      $('#btn_recent_ticketters').click(function(){

        // start a spinner
        navigator.geolocation.getCurrentPosition(function(position) {
          // stop the spinner
          user_id = $('#current_user').val();
          $.ajax({
            url: '/ticketter_locations/',
            method: "GET",
            dataType: 'json'
          }).done(function(response) {
            if (response.status == "SUCCESS"){
            all_ticketters(
                    response.tick_lat, response.tick_lng);
                    console.log("hi");
          } else {
            alert("No ticketters in your city!");
          }
          });
        });
       });

var all_ticketters = function(tick_lat, tick_lng){
  navigator.geolocation.getCurrentPosition(function(position) {
        //the position of the checkin


console.log(tick_lng)
    //iterates through TicketterLocation's lat and lng
      $.each(tick_lat, function(i, item) {
  alert("hey");

        var ticketters_latitude = tick_lat[i].tick_lat
        var ticketters_longitude = tick_lng[i].tick_lng

        //finds all the ticketter locations

              //mark of the current checkin, don't really need this
            var marker = new google.maps.Marker({
              map: map,
              position: new google.maps.LatLng(ticketters_latitude,ticketters_longitude),
              icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
              title: 'Ticketters'
            });


        });
        var center_vancouver = new google.maps.LatLng(49.2827, -123.116226);
      map.setCenter(center_vancouver);
    });
  }

     } else {
       document.getElementById('map').innerHTML = 'No Geolocation Support.';
     }
   };
