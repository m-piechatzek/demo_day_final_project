class TicketterLocationsController < ApplicationController
  def index
    @checkin_location = CheckinLocation.find_by_user_id current_user
    @ticketters_lat = TicketterLocation.select("tick_lat")
    @ticketters_lng = TicketterLocation.select("tick_lng")

    respond_to do |format|
       format.html { redirect_to ticketter_locations_path, notice: 'Other Users Notified!' }
       format.json { render json: {status: "SUCCESS", tick_lat: @ticketters_lat,
          tick_lng: @ticketters_lng, user_lat: @checkin_location.check_lat,
           user_lng: @checkin_location.check_lng, time: @checkin_location.time} }

   end
  end

  def create
    @ticketter_location = TicketterLocation.new ticketter_params
    @checkins_lat = CheckinLocation.select("check_lat");
    @checkins_lng = CheckinLocation.select("check_lng");
    @all_checkin_users = CheckinLocation.select("user_id")

    @all_checkins = {check_lat: @checkins_lat, check_lng: @checkins_lng, all_checkin_user: @all_checkin_users}

      respond_to do |format|
       if @ticketter_location.save #grab all the check ins
         format.html { redirect_to root_path, notice: 'Other Users Notified!' }
         format.json { render json: {all_checkins: @all_checkins,  tick_lat: @ticketter_location.tick_lat, tick_lng: @ticketter_location.tick_lng, users_lat: @checkins_lat, users_lng: @checkins_lng} }
       else
         format.html { render root_path }
         format.json { render json: {status: "FAIL"} }
       end
     end
  end

  private

  def ticketter_params
    params.require(:ticketterlocation).permit(:tick_lat, :tick_lng, :user_id)
  end
end
