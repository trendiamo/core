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

ActiveRecord::Schema.define(version: 20181030141330) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "accounts", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "auth_tokens", force: :cascade do |t|
    t.string "body"
    t.bigint "user_id"
    t.datetime "last_used_at"
    t.string "ip_address"
    t.string "user_agent"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["body"], name: "index_user_auth_tokens_on_body"
    t.index ["user_id"], name: "index_user_auth_tokens_on_user_id"
  end

  create_table "chat_messages", force: :cascade do |t|
    t.integer "delay", null: false
    t.text "text", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "chat_step_id"
    t.index ["chat_step_id"], name: "index_chat_messages_on_chat_step_id"
  end

  create_table "chat_options", force: :cascade do |t|
    t.string "text", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "chat_step_id"
    t.bigint "destinaton_chat_step_id"
    t.index ["chat_step_id"], name: "index_chat_options_on_chat_step_id"
    t.index ["destinaton_chat_step_id"], name: "index_chat_options_on_destinaton_chat_step_id"
  end

  create_table "chat_steps", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "chat_id"
    t.index ["chat_id"], name: "index_chat_steps_on_chat_id"
  end

  create_table "chats", force: :cascade do |t|
    t.string "path", null: false
    t.string "title", null: false
    t.bigint "influencer_id"
    t.bigint "website_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["influencer_id"], name: "index_chats_on_influencer_id"
    t.index ["website_id"], name: "index_chats_on_website_id"
  end

  create_table "influencers", force: :cascade do |t|
    t.string "name", null: false
    t.text "description", null: false
    t.string "profile_pic_url", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "account_id", null: false
    t.index ["account_id"], name: "index_influencers_on_account_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username", default: "", null: false
    t.string "email", default: "", null: false
    t.string "first_name", default: "", null: false
    t.string "last_name", default: "", null: false
    t.string "customer_ref"
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "profile_pic_url"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.boolean "subscribed_to_newsletter", default: false, null: false
    t.string "exposition_hostname"
    t.string "website_ref"
    t.bigint "account_id", null: false
    t.index ["account_id"], name: "index_users_on_account_id"
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "websites", force: :cascade do |t|
    t.string "name", null: false
    t.string "title", null: false
    t.string "subtitle"
    t.string "hostnames", null: false, array: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "account_id", null: false
    t.index ["account_id"], name: "index_websites_on_account_id"
    t.index ["hostnames"], name: "index_websites_on_hostnames", using: :gin
  end

  add_foreign_key "auth_tokens", "users"
  add_foreign_key "chat_messages", "chat_steps"
  add_foreign_key "chat_options", "chat_steps"
  add_foreign_key "chat_options", "chat_steps", column: "destinaton_chat_step_id"
  add_foreign_key "chat_steps", "chats"
  add_foreign_key "chats", "influencers"
  add_foreign_key "chats", "websites"
  add_foreign_key "influencers", "accounts"
  add_foreign_key "users", "accounts"
  add_foreign_key "websites", "accounts"
end
