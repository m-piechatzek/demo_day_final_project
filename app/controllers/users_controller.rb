class UsersController < ApplicationController
  def index
    @latitude = current_user.lat
    @longitude = current_user.long
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new user_params
       if @user.save
         session[:user_id] = @user.id
         redirect_to root_path, notice: "Logged In!"
       else
         render :new
       end
  end

   def update
     puts params[:user][:long]
     @user = current_user
     respond_to do |format|
       if  @user.update(user_params)
        format.html { redirect_to root_path, notice: 'User was successfully created.' }
      else
        format.html { render root_path }
      end
    end
   end

   def show

   end


  private

  def user_params
    params.require(:user).permit(:username, :license_pl, :prov, :email,
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
