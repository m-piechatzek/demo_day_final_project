"btn_location_signout"
function initCheckOutMap() {

      $("#btn_location_signout").click(function(){

          user_id = $('#current_user').val();
          $.ajax({
            url: '/checkin_locations/',
            method: "DELETE",
            dataType: 'json'
          }).done(function(response) {
            if(response.status == "FAIL")
            alert("cannot check out more than once")
            });
        });
       };
