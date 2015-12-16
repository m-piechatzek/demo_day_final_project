class CheckinLocationsController < ApplicationController


  def create
    @checkin_location = CheckinLocation.new checkin_params

    @ticketters_lat = TicketterLocation.select("tick_lat")
    @ticketters_lng = TicketterLocation.select("tick_lng")


      respond_to do |format|
       if @checkin_location.save #sends all the ticketter locations and current checkin
         format.html { redirect_to root_path, notice: 'Other Users Notified!' }
         format.json { render json: {status: "SUCCESS", tick_lat: @ticketters_lat,
            tick_lng: @ticketters_lng, user_lat: @checkin_location.check_lat,
             user_lng: @checkin_location.check_lng, time: @checkin_location.time} }
       else
         format.html { redirect_to root_path }
         format.json { render json: {status: "FAIL"} }
       end
     end
  end

  def destroy
    @checkin = current_user.checkin_location
    respond_to do |format|
      if @checkin == nil
        format.html { redirect_to root_path }
        format.json { render json: {status: "FAIL"} }
      elsif @checkin.destroy
        current_user.check_in = false
        current_user.save
        format.json { render json: {status: "checked out"} }
      else
        format.html { redirect_to root_path }
        format.json { render json: {status: "FAIL"} }
      end
    end
  end

  private

  def checkin_params
    params.require(:checkinlocation).permit(:check_lat, :check_lng, :user_id, :timer, :time)
  end


end
