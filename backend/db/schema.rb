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

ActiveRecord::Schema.define(version: 20181128134905) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "accounts", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name"
  end

  create_table "chat_messages", force: :cascade do |t|
    t.integer "delay", null: false
    t.text "text", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "chat_step_id"
    t.bigint "account_id"
    t.index ["account_id"], name: "index_chat_messages_on_account_id"
    t.index ["chat_step_id"], name: "index_chat_messages_on_chat_step_id"
  end

  create_table "chat_options", force: :cascade do |t|
    t.string "text", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "chat_step_id"
    t.bigint "destinaton_chat_step_id"
    t.bigint "account_id"
    t.index ["account_id"], name: "index_chat_options_on_account_id"
    t.index ["chat_step_id"], name: "index_chat_options_on_chat_step_id"
    t.index ["destinaton_chat_step_id"], name: "index_chat_options_on_destinaton_chat_step_id"
  end

  create_table "chat_steps", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "scripted_chat_id"
    t.bigint "account_id"
    t.bigint "chat_option_id"
    t.bigint "refering_chat_option_id"
    t.index ["account_id"], name: "index_chat_steps_on_account_id"
    t.index ["chat_option_id"], name: "index_chat_steps_on_chat_option_id"
    t.index ["refering_chat_option_id"], name: "index_chat_steps_on_refering_chat_option_id"
    t.index ["scripted_chat_id"], name: "index_chat_steps_on_scripted_chat_id"
  end

  create_table "curations", force: :cascade do |t|
    t.bigint "account_id"
    t.bigint "persona_id"
    t.string "title", null: false
    t.string "subtitle", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "graphcms_ref"
    t.index ["account_id"], name: "index_curations_on_account_id"
    t.index ["persona_id"], name: "index_curations_on_persona_id"
  end

  create_table "outros", force: :cascade do |t|
    t.bigint "persona_id"
    t.bigint "account_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "graphcms_ref"
    t.index ["account_id"], name: "index_outros_on_account_id"
    t.index ["persona_id"], name: "index_outros_on_persona_id"
  end

  create_table "personas", force: :cascade do |t|
    t.string "name", null: false
    t.text "description", null: false
    t.string "profile_pic_url", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "account_id", null: false
    t.string "graphcms_ref"
    t.index ["account_id"], name: "index_personas_on_account_id"
  end

  create_table "product_picks", force: :cascade do |t|
    t.bigint "account_id"
    t.bigint "spotlight_id"
    t.string "name", null: false
    t.string "url", null: false
    t.string "description", null: false
    t.string "pic_url", null: false
    t.string "display_price", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["account_id"], name: "index_product_picks_on_account_id"
    t.index ["spotlight_id"], name: "index_product_picks_on_spotlight_id"
  end

  create_table "scripted_chats", force: :cascade do |t|
    t.string "title", null: false
    t.bigint "persona_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "account_id"
    t.string "graphcms_ref"
    t.index ["account_id"], name: "index_scripted_chats_on_account_id"
    t.index ["persona_id"], name: "index_scripted_chats_on_persona_id"
  end

  create_table "spotlights", force: :cascade do |t|
    t.bigint "account_id"
    t.bigint "persona_id"
    t.string "text", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "curation_id"
    t.index ["account_id"], name: "index_spotlights_on_account_id"
    t.index ["curation_id"], name: "index_spotlights_on_curation_id"
    t.index ["persona_id"], name: "index_spotlights_on_persona_id"
  end

  create_table "triggers", force: :cascade do |t|
    t.integer "order", null: false
    t.string "url_matchers", null: false, array: true
    t.string "flow_type"
    t.bigint "flow_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "account_id"
    t.string "name"
    t.index ["account_id"], name: "index_triggers_on_account_id"
    t.index ["flow_type", "flow_id"], name: "index_triggers_on_flow_type_and_flow_id"
    t.index ["url_matchers"], name: "index_triggers_on_url_matchers", using: :gin
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
    t.bigint "account_id", null: false
    t.index ["account_id"], name: "index_users_on_account_id"
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "websites", force: :cascade do |t|
    t.string "name", null: false
    t.string "hostnames", null: false, array: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "account_id", null: false
    t.index ["account_id"], name: "index_websites_on_account_id"
    t.index ["hostnames"], name: "index_websites_on_hostnames", using: :gin
  end

  add_foreign_key "chat_messages", "accounts"
  add_foreign_key "chat_messages", "chat_steps"
  add_foreign_key "chat_options", "accounts"
  add_foreign_key "chat_options", "chat_steps"
  add_foreign_key "chat_options", "chat_steps", column: "destinaton_chat_step_id"
  add_foreign_key "chat_steps", "accounts"
  add_foreign_key "chat_steps", "chat_options"
  add_foreign_key "chat_steps", "chat_options", column: "refering_chat_option_id"
  add_foreign_key "chat_steps", "scripted_chats"
  add_foreign_key "curations", "accounts"
  add_foreign_key "curations", "personas"
  add_foreign_key "outros", "accounts"
  add_foreign_key "outros", "personas"
  add_foreign_key "personas", "accounts"
  add_foreign_key "product_picks", "accounts"
  add_foreign_key "product_picks", "spotlights"
  add_foreign_key "scripted_chats", "accounts"
  add_foreign_key "scripted_chats", "personas"
  add_foreign_key "spotlights", "accounts"
  add_foreign_key "spotlights", "curations"
  add_foreign_key "spotlights", "personas"
  add_foreign_key "triggers", "accounts"
  add_foreign_key "users", "accounts"
  add_foreign_key "websites", "accounts"
end
