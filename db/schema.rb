# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20151214011442) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "checkin_locations", force: :cascade do |t|
    t.float    "check_lat"
    t.float    "check_lng"
    t.integer  "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "timer"
  end

  add_index "checkin_locations", ["user_id"], name: "index_checkin_locations_on_user_id", using: :btree

  create_table "ticketter_locations", force: :cascade do |t|
    t.float    "tick_lat"
    t.float    "tick_lng"
    t.integer  "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "ticketter_locations", ["user_id"], name: "index_ticketter_locations_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "username"
    t.string   "license_pl"
    t.string   "prov"
    t.boolean  "check_in"
    t.boolean  "alert"
    t.integer  "points"
    t.string   "location"
    t.float    "long"
    t.float    "lat"
    t.string   "f_name"
    t.string   "l_name"
    t.string   "email"
    t.string   "password_digest"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["license_pl"], name: "index_users_on_license_pl", using: :btree

  add_foreign_key "checkin_locations", "users"
  add_foreign_key "ticketter_locations", "users"
end
