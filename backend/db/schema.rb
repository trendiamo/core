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

ActiveRecord::Schema.define(version: 20190802144445) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "accounts", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name"
    t.string "slug", default: "", null: false
    t.index ["slug"], name: "index_accounts_on_slug", unique: true
  end

  create_table "generated_urls", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_generated_urls_on_user_id"
  end

  create_table "invites", force: :cascade do |t|
    t.string "email", null: false
    t.string "role", null: false
    t.bigint "sender_id"
    t.bigint "recipient_id"
    t.bigint "account_id"
    t.datetime "accepted_at"
    t.string "token"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["account_id"], name: "index_invites_on_account_id"
    t.index ["recipient_id"], name: "index_invites_on_recipient_id"
    t.index ["sender_id"], name: "index_invites_on_sender_id"
  end

  create_table "memberships", force: :cascade do |t|
    t.integer "role", default: 0
    t.bigint "user_id"
    t.bigint "account_id"
    t.index ["account_id"], name: "index_memberships_on_account_id"
    t.index ["user_id"], name: "index_memberships_on_user_id"
  end

  create_table "outros", force: :cascade do |t|
    t.bigint "seller_id"
    t.bigint "account_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "graphcms_ref"
    t.string "name", null: false
    t.string "chat_bubble_text"
    t.string "chat_bubble_button_yes"
    t.string "chat_bubble_button_no"
    t.integer "lock_version", default: 1
    t.bigint "owner_id", null: false
    t.boolean "use_seller_animation", default: false, null: false
    t.index ["account_id"], name: "index_outros_on_account_id"
    t.index ["owner_id"], name: "index_outros_on_owner_id"
    t.index ["seller_id"], name: "index_outros_on_seller_id"
  end

  create_table "pictures", force: :cascade do |t|
    t.string "url", null: false
    t.bigint "account_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "active", default: false
    t.string "file_format", null: false
    t.index ["account_id"], name: "index_pictures_on_account_id"
  end

  create_table "product_picks", force: :cascade do |t|
    t.bigint "account_id"
    t.bigint "spotlight_id"
    t.string "name", null: false
    t.string "url", null: false
    t.string "description", null: false
    t.string "display_price"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "order"
    t.bigint "pic_id"
    t.json "pic_rect", default: {}
    t.index ["account_id"], name: "index_product_picks_on_account_id"
    t.index ["pic_id"], name: "index_product_picks_on_pic_id"
    t.index ["spotlight_id"], name: "index_product_picks_on_spotlight_id"
  end

  create_table "products", force: :cascade do |t|
    t.bigint "account_id"
    t.string "name", null: false
    t.string "url", null: false
    t.string "source", null: false
    t.json "payload"
    t.bigint "source_id", null: false
    t.index ["account_id"], name: "index_products_on_account_id"
  end

  create_table "sellers", force: :cascade do |t|
    t.string "name", null: false
    t.text "description", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "account_id", null: false
    t.string "graphcms_ref"
    t.string "instagram_url"
    t.bigint "profile_pic_id"
    t.integer "lock_version", default: 1
    t.json "pic_rect", default: {}
    t.bigint "profile_pic_animation_id"
    t.index ["account_id"], name: "index_sellers_on_account_id"
    t.index ["profile_pic_animation_id"], name: "index_sellers_on_profile_pic_animation_id"
    t.index ["profile_pic_id"], name: "index_sellers_on_profile_pic_id"
  end

  create_table "showcases", force: :cascade do |t|
    t.bigint "account_id"
    t.bigint "seller_id"
    t.string "title", null: false
    t.string "subtitle", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "graphcms_ref"
    t.string "name", null: false
    t.string "chat_bubble_text"
    t.string "chat_bubble_extra_text"
    t.integer "lock_version", default: 1
    t.bigint "owner_id", null: false
    t.boolean "use_seller_animation", default: false, null: false
    t.index ["account_id"], name: "index_showcases_on_account_id"
    t.index ["owner_id"], name: "index_showcases_on_owner_id"
    t.index ["seller_id"], name: "index_showcases_on_seller_id"
  end

  create_table "simple_chat_messages", force: :cascade do |t|
    t.integer "order"
    t.bigint "simple_chat_step_id"
    t.bigint "account_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "type"
    t.string "title"
    t.string "url"
    t.string "display_price"
    t.string "video_url"
    t.bigint "pic_id"
    t.boolean "group_with_adjacent", default: false
    t.json "pic_rect", default: {}
    t.string "html"
    t.index ["account_id"], name: "index_simple_chat_messages_on_account_id"
    t.index ["pic_id"], name: "index_simple_chat_messages_on_pic_id"
    t.index ["simple_chat_step_id"], name: "index_simple_chat_messages_on_simple_chat_step_id"
  end

  create_table "simple_chat_steps", force: :cascade do |t|
    t.string "key", default: "default", null: false
    t.integer "order"
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
    t.bigint "seller_id"
    t.bigint "account_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "chat_bubble_extra_text"
    t.integer "lock_version", default: 1
    t.bigint "owner_id", null: false
    t.boolean "use_seller_animation", default: false, null: false
    t.index ["account_id"], name: "index_simple_chats_on_account_id"
    t.index ["owner_id"], name: "index_simple_chats_on_owner_id"
    t.index ["seller_id"], name: "index_simple_chats_on_seller_id"
  end

  create_table "spotlights", force: :cascade do |t|
    t.bigint "account_id"
    t.bigint "seller_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "showcase_id"
    t.integer "order"
    t.boolean "use_seller_animation", default: false, null: false
    t.index ["account_id"], name: "index_spotlights_on_account_id"
    t.index ["seller_id"], name: "index_spotlights_on_seller_id"
    t.index ["showcase_id"], name: "index_spotlights_on_showcase_id"
  end

  create_table "tagged_products_clients", force: :cascade do |t|
    t.string "hostname"
    t.json "payload"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "triggers", force: :cascade do |t|
    t.integer "order"
    t.string "url_matchers", null: false, array: true
    t.string "flow_type"
    t.bigint "flow_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "account_id"
    t.integer "lock_version", default: 1
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
    t.integer "onboarding_stage", default: 0
    t.boolean "admin", default: false, null: false
    t.json "pic_rect", default: {}
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "website_settings", force: :cascade do |t|
    t.bigint "account_id", null: false
    t.bigint "website_id", null: false
    t.string "theme_color", default: "#232323"
    t.integer "text_color", default: 0
    t.boolean "round_edges", default: true, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["account_id"], name: "index_website_settings_on_account_id"
    t.index ["website_id"], name: "index_website_settings_on_website_id"
  end

  create_table "websites", force: :cascade do |t|
    t.string "name", null: false
    t.string "hostnames", null: false, array: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "account_id", null: false
    t.boolean "preview_mode", default: false
    t.boolean "is_e_commerce", default: true, null: false
    t.index ["account_id"], name: "index_websites_on_account_id"
    t.index ["hostnames"], name: "index_websites_on_hostnames", using: :gin
  end

  add_foreign_key "generated_urls", "users"
  add_foreign_key "invites", "accounts"
  add_foreign_key "memberships", "accounts"
  add_foreign_key "memberships", "users"
  add_foreign_key "outros", "accounts"
  add_foreign_key "outros", "sellers"
  add_foreign_key "outros", "users", column: "owner_id"
  add_foreign_key "pictures", "accounts"
  add_foreign_key "product_picks", "accounts"
  add_foreign_key "product_picks", "pictures", column: "pic_id"
  add_foreign_key "product_picks", "spotlights"
  add_foreign_key "products", "accounts"
  add_foreign_key "sellers", "accounts"
  add_foreign_key "sellers", "pictures", column: "profile_pic_animation_id"
  add_foreign_key "sellers", "pictures", column: "profile_pic_id"
  add_foreign_key "showcases", "accounts"
  add_foreign_key "showcases", "sellers"
  add_foreign_key "showcases", "users", column: "owner_id"
  add_foreign_key "simple_chat_messages", "accounts"
  add_foreign_key "simple_chat_messages", "pictures", column: "pic_id"
  add_foreign_key "simple_chat_messages", "simple_chat_steps"
  add_foreign_key "simple_chat_steps", "accounts"
  add_foreign_key "simple_chat_steps", "simple_chats"
  add_foreign_key "simple_chats", "accounts"
  add_foreign_key "simple_chats", "sellers"
  add_foreign_key "simple_chats", "users", column: "owner_id"
  add_foreign_key "spotlights", "accounts"
  add_foreign_key "spotlights", "sellers"
  add_foreign_key "spotlights", "showcases"
  add_foreign_key "triggers", "accounts"
  add_foreign_key "website_settings", "accounts"
  add_foreign_key "website_settings", "websites"
  add_foreign_key "websites", "accounts"
end
