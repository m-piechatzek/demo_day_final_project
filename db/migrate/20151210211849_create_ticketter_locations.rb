class CreateTicketterLocations < ActiveRecord::Migration
  def change
    create_table :ticketter_locations do |t|
      t.float :tick_lat
      t.float :tick_lng
      t.references :user, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
