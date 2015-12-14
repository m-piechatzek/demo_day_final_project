class CreateCheckinLocations < ActiveRecord::Migration
  def change
    create_table :checkin_locations do |t|
      t.float :check_lat
      t.float :check_lng
      t.references :user, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
