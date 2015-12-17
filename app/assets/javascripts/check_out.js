"btn_location_signout"
function initCheckOutMap() {

      $("#btn_location_signout").click(function(){

          user_id = $('#current_user').val();
          $.ajax({
            url: '/checkin_locations/',
            method: "DELETE",
            dataType: 'json'
          }).done(function(response) {

            if(response.status == "FAIL"){
             swal("Cancelled", "You cannot check out more than once", "error");
          }else {
            swal("You checked out!","Check back in for users to find you", "success")
          }
            });
        });
       };
