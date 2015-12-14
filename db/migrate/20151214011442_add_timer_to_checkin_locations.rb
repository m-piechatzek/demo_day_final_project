class AddTimerToCheckinLocations < ActiveRecord::Migration
  def change
    add_column :checkin_locations, :timer, :datetime
  end
end
