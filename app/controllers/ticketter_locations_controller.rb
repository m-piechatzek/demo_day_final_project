class TicketterLocationsController < ApplicationController
  def index
    @ticketter_locations = TicketterLocation.all
  end

  def create
    @ticketter_location = TicketterLocation.new ticketter_params
    # @ticketters_lat = TicketterLocation.select("tick_lat");
    # @ticketters_lng = TicketterLocation.select("tick_lng");
    # @ticketter_location = TicketterLocation.new
    # @ticketter_location.lat = @user.lat
    @checkins_lat = User.select("lat");
    @checkins_lng = User.select("long");

      respond_to do |format|
       if @ticketter_location.save #grab all the check ins
         format.html { redirect_to root_path, notice: 'Other Users Notified!' }
         format.json { render json: {tick_lat: @ticketter_location.tick_lat, tick_lng: @ticketter_location.tick_lng, users_lat: @checkins_lat, users_lng: @checkins_lng} }
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