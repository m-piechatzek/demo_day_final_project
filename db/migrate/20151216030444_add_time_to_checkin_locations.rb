class AddTimeToCheckinLocations < ActiveRecord::Migration
  def change
    add_column :checkin_locations, :time, :integer
  end
end
