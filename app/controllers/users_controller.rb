class UsersController < ApplicationController
  def index
    if current_user.present?
    @latitude = current_user.lat
    @longitude = current_user.long
    @checkin_location = CheckinLocation.new
  end
    @ticketter_locations = TicketterLocation.all
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new user_params
    # @ticketter_location = TicketterLocation.new
    # @ticketter_location.lat = @user.lat
       if @user.save
         session[:user_id] = @user.id
         redirect_to root_path, notice: "Logged In!"
       else
         render :new
       end
  end

   def update
    #  puts params[:user][:long]
     @user = current_user
     @ticketters_lat = TicketterLocation.select("tick_lat");
     @ticketters_lng = TicketterLocation.select("tick_lng");
     @ticketters_time = TicketterLocation.select("created_at");
     respond_to do |format|
       if  @user.update(user_params)
        format.html { redirect_to root_path, notice: 'User was successfully created.' }
        format.json { render json: {tick_time: @ticketters_time, lat: @user.lat, long: @user.long, tick_lat: @ticketters_lat, tick_lng: @ticketters_lng} }
      else
        format.html { render root_path }
        format.json { render json: {status: "FAIL"} }
      end
    end
   end

   def show

   end


  private

  def user_params
    params.require(:user).permit(:username, :license_pl, :prov, :email, :check_in, :alert,
                                            :password, :password_confirmation, :f_name, :l_name, :location, :long, :lat)
  end
end
#     puts "user = "
#          puts params[:user][:f_name]
#
#      @user = User.new user_params
#
#      respond_to do |format|
#     if @user.save
#         format.html { redirect_to root_path, notice: 'User was successfully created.' }
#     else
#         format.html { render root_path }
#     end
# end
