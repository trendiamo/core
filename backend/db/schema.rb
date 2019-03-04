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

ActiveRecord::Schema.define(version: 20190304104641) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "accounts", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name"
  end

  create_table "chat_messages", force: :cascade do |t|
    t.text "text", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "chat_step_id"
    t.bigint "account_id"
    t.integer "order", default: 1, null: false
    t.index ["account_id"], name: "index_chat_messages_on_account_id"
    t.index ["chat_step_id"], name: "index_chat_messages_on_chat_step_id"
  end

  create_table "chat_options", force: :cascade do |t|
    t.string "text", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "chat_step_id"
    t.bigint "destination_chat_step_id"
    t.bigint "account_id"
    t.integer "order", default: 1, null: false
    t.index ["account_id"], name: "index_chat_options_on_account_id"
    t.index ["chat_step_id"], name: "index_chat_options_on_chat_step_id"
    t.index ["destination_chat_step_id"], name: "index_chat_options_on_destination_chat_step_id"
  end

  create_table "chat_steps", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "scripted_chat_id"
    t.bigint "account_id"
    t.index ["account_id"], name: "index_chat_steps_on_account_id"
    t.index ["scripted_chat_id"], name: "index_chat_steps_on_scripted_chat_id"
  end

  create_table "generated_urls", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_generated_urls_on_user_id"
  end

  create_table "navigation_items", force: :cascade do |t|
    t.bigint "account_id"
    t.bigint "navigation_id"
    t.string "text"
    t.string "url"
    t.string "pic_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "order", default: 1, null: false
    t.index ["account_id"], name: "index_navigation_items_on_account_id"
    t.index ["navigation_id"], name: "index_navigation_items_on_navigation_id"
  end

  create_table "navigations", force: :cascade do |t|
    t.bigint "account_id"
    t.string "name"
    t.bigint "persona_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "chat_bubble_text"
    t.string "title", default: "", null: false
    t.string "chat_bubble_extra_text"
    t.index ["account_id"], name: "index_navigations_on_account_id"
    t.index ["persona_id"], name: "index_navigations_on_persona_id"
  end

  create_table "outros", force: :cascade do |t|
    t.bigint "persona_id"
    t.bigint "account_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "graphcms_ref"
    t.string "name", null: false
    t.string "chat_bubble_text"
    t.string "chat_bubble_button_yes"
    t.string "chat_bubble_button_no"
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
    t.string "instagram_url"
    t.string "profile_pic_animation_url"
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
    t.integer "order", default: 1, null: false
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
    t.string "name", null: false
    t.string "chat_bubble_text"
    t.string "chat_bubble_extra_text"
    t.index ["account_id"], name: "index_scripted_chats_on_account_id"
    t.index ["persona_id"], name: "index_scripted_chats_on_persona_id"
  end

  create_table "showcases", force: :cascade do |t|
    t.bigint "account_id"
    t.bigint "persona_id"
    t.string "title", null: false
    t.string "subtitle", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "graphcms_ref"
    t.string "name", null: false
    t.string "chat_bubble_text"
    t.string "chat_bubble_extra_text"
    t.index ["account_id"], name: "index_showcases_on_account_id"
    t.index ["persona_id"], name: "index_showcases_on_persona_id"
  end

  create_table "simple_chat_messages", force: :cascade do |t|
    t.string "text", null: false
    t.integer "order", default: 1, null: false
    t.bigint "simple_chat_step_id"
    t.bigint "account_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["account_id"], name: "index_simple_chat_messages_on_account_id"
    t.index ["simple_chat_step_id"], name: "index_simple_chat_messages_on_simple_chat_step_id"
  end

  create_table "simple_chat_steps", force: :cascade do |t|
    t.string "key", default: "default", null: false
    t.integer "order", default: 1, null: false
    t.bigint "simple_chat_id"
    t.bigint "account_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["account_id"], name: "index_simple_chat_steps_on_account_id"
    t.index ["simple_chat_id"], name: "index_simple_chat_steps_on_simple_chat_id"
  end

  create_table "simple_chats", force: :cascade do |t|
    t.string "name", null: false
    t.string "title", null: false
    t.string "chat_bubble_text"
    t.bigint "persona_id"
    t.bigint "account_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "chat_bubble_extra_text"
    t.index ["account_id"], name: "index_simple_chats_on_account_id"
    t.index ["persona_id"], name: "index_simple_chats_on_persona_id"
  end

  create_table "spotlights", force: :cascade do |t|
    t.bigint "account_id"
    t.bigint "persona_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "showcase_id"
    t.integer "order", default: 1, null: false
    t.index ["account_id"], name: "index_spotlights_on_account_id"
    t.index ["persona_id"], name: "index_spotlights_on_persona_id"
    t.index ["showcase_id"], name: "index_spotlights_on_showcase_id"
  end

  create_table "triggers", force: :cascade do |t|
    t.integer "order", default: 1, null: false
    t.string "url_matchers", null: false, array: true
    t.string "flow_type"
    t.bigint "flow_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "account_id"
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
    t.integer "onboarding_stage", default: 0
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
    t.boolean "preview_mode", default: false
    t.index ["account_id"], name: "index_websites_on_account_id"
    t.index ["hostnames"], name: "index_websites_on_hostnames", using: :gin
  end

  add_foreign_key "chat_messages", "accounts"
  add_foreign_key "chat_messages", "chat_steps"
  add_foreign_key "chat_options", "accounts"
  add_foreign_key "chat_options", "chat_steps"
  add_foreign_key "chat_options", "chat_steps", column: "destination_chat_step_id"
  add_foreign_key "chat_steps", "accounts"
  add_foreign_key "chat_steps", "scripted_chats"
  add_foreign_key "generated_urls", "users"
  add_foreign_key "navigation_items", "accounts"
  add_foreign_key "navigation_items", "navigations"
  add_foreign_key "navigations", "accounts"
  add_foreign_key "navigations", "personas"
  add_foreign_key "outros", "accounts"
  add_foreign_key "outros", "personas"
  add_foreign_key "personas", "accounts"
  add_foreign_key "product_picks", "accounts"
  add_foreign_key "product_picks", "spotlights"
  add_foreign_key "scripted_chats", "accounts"
  add_foreign_key "scripted_chats", "personas"
  add_foreign_key "showcases", "accounts"
  add_foreign_key "showcases", "personas"
  add_foreign_key "simple_chat_messages", "accounts"
  add_foreign_key "simple_chat_messages", "simple_chat_steps"
  add_foreign_key "simple_chat_steps", "accounts"
  add_foreign_key "simple_chat_steps", "simple_chats"
  add_foreign_key "simple_chats", "accounts"
  add_foreign_key "simple_chats", "personas"
  add_foreign_key "spotlights", "accounts"
  add_foreign_key "spotlights", "personas"
  add_foreign_key "spotlights", "showcases"
  add_foreign_key "triggers", "accounts"
  add_foreign_key "users", "accounts"
  add_foreign_key "websites", "accounts"
end
