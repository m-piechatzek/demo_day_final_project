class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :username
      t.string :license_pl
      t.string :prov
      t.boolean :check_in
      t.boolean :alert
      t.integer :points
      t.string :location
      t.float :long
      t.float :lat
      t.string :f_name
      t.string :l_name
      t.string :email
      t.string :password_digest

      t.timestamps null: false
    end
    add_index :users, :email, unique: true
    add_index :users, :license_pl
  end
end
