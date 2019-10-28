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

ActiveRecord::Schema.define(version: 20191028152114) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "accounts", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name"
    t.string "slug", default: "", null: false
    t.boolean "is_affiliate", default: false
    t.string "private_api_key"
    t.index ["private_api_key"], name: "index_accounts_on_private_api_key", unique: true
    t.index ["slug"], name: "index_accounts_on_slug", unique: true
  end

  create_table "affiliate_links", force: :cascade do |t|
    t.bigint "affiliation_id"
    t.string "url", null: false
    t.boolean "default_link", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["affiliation_id"], name: "index_affiliate_links_on_affiliation_id"
    t.index ["url"], name: "index_affiliate_links_on_url", unique: true
  end

  create_table "affiliations", force: :cascade do |t|
    t.bigint "account_id"
    t.bigint "user_id"
    t.string "token"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["account_id"], name: "index_affiliations_on_account_id"
    t.index ["user_id"], name: "index_affiliations_on_user_id"
  end

  create_table "brands", force: :cascade do |t|
    t.string "name", null: false
    t.string "logo_url"
    t.text "description"
    t.bigint "account_id"
    t.text "full_description"
    t.text "terms_and_conditions"
    t.string "commission_description"
    t.decimal "commission_rate"
    t.string "header_image_url"
    t.string "instagram_url"
    t.string "facebook_url"
    t.string "twitter_url"
    t.string "available_locations"
    t.integer "order", default: 1, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "is_preview", default: false, null: false
    t.index ["account_id"], name: "index_brands_on_account_id"
  end

  create_table "generated_urls", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_generated_urls_on_user_id"
  end

  create_table "images", force: :cascade do |t|
    t.string "url", null: false
    t.bigint "account_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "active", default: false
    t.string "file_format", null: false
    t.bigint "user_id"
    t.index ["account_id"], name: "index_images_on_account_id"
    t.index ["user_id"], name: "index_images_on_user_id"
  end

  create_table "interests", force: :cascade do |t|
    t.bigint "account_id"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["account_id"], name: "index_interests_on_account_id"
    t.index ["user_id"], name: "index_interests_on_user_id"
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

  create_table "login_events", force: :cascade do |t|
    t.bigint "user_id"
    t.datetime "timestamp", null: false
    t.string "domain", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_login_events_on_user_id"
  end

  create_table "memberships", force: :cascade do |t|
    t.integer "role", default: 0
    t.bigint "user_id"
    t.bigint "account_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["account_id"], name: "index_memberships_on_account_id"
    t.index ["user_id"], name: "index_memberships_on_user_id"
  end

  create_table "orders", force: :cascade do |t|
    t.bigint "account_id"
    t.bigint "seller_id"
    t.datetime "captured_at", null: false
    t.decimal "commission_rate", null: false
    t.integer "amount_in_cents", null: false
    t.string "currency", null: false
    t.json "products"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "source"
    t.bigint "source_id"
    t.json "payload"
    t.index ["account_id"], name: "index_orders_on_account_id"
    t.index ["seller_id"], name: "index_orders_on_seller_id"
  end

  create_table "outros", force: :cascade do |t|
    t.bigint "seller_id"
    t.bigint "account_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "graphcms_ref"
    t.string "name", null: false
    t.string "teaser_message"
    t.string "chat_bubble_button_yes"
    t.string "chat_bubble_button_no"
    t.integer "lock_version", default: 1
    t.bigint "owner_id", null: false
    t.boolean "use_seller_animation", default: false, null: false
    t.index ["account_id"], name: "index_outros_on_account_id"
    t.index ["owner_id"], name: "index_outros_on_owner_id"
    t.index ["seller_id"], name: "index_outros_on_seller_id"
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
    t.bigint "img_id"
    t.json "img_rect", default: {}
    t.index ["account_id"], name: "index_product_picks_on_account_id"
    t.index ["img_id"], name: "index_product_picks_on_img_id"
    t.index ["spotlight_id"], name: "index_product_picks_on_spotlight_id"
  end

  create_table "products", force: :cascade do |t|
    t.bigint "account_id"
    t.string "name", null: false
    t.string "url", null: false
    t.string "source", null: false
    t.json "payload"
    t.bigint "source_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["account_id"], name: "index_products_on_account_id"
  end

  create_table "sellers", force: :cascade do |t|
    t.string "name", null: false
    t.text "bio", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "account_id", null: false
    t.string "graphcms_ref"
    t.string "instagram_url"
    t.bigint "img_id"
    t.integer "lock_version", default: 1
    t.json "img_rect", default: {}
    t.bigint "animated_img_id"
    t.index ["account_id"], name: "index_sellers_on_account_id"
    t.index ["animated_img_id"], name: "index_sellers_on_animated_img_id"
    t.index ["img_id"], name: "index_sellers_on_img_id"
  end

  create_table "showcases", force: :cascade do |t|
    t.bigint "account_id"
    t.bigint "seller_id"
    t.string "heading", null: false
    t.string "subheading", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "graphcms_ref"
    t.string "name", null: false
    t.string "teaser_message"
    t.string "extra_teaser_message"
    t.integer "lock_version", default: 1
    t.bigint "owner_id", null: false
    t.boolean "use_seller_animation", default: false, null: false
    t.index ["account_id"], name: "index_showcases_on_account_id"
    t.index ["owner_id"], name: "index_showcases_on_owner_id"
    t.index ["seller_id"], name: "index_showcases_on_seller_id"
  end

  create_table "simple_chat_messages", force: :cascade do |t|
    t.integer "order"
    t.bigint "simple_chat_section_id"
    t.bigint "account_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "type"
    t.string "title"
    t.string "url"
    t.string "display_price"
    t.string "video_url"
    t.bigint "img_id"
    t.boolean "group_with_adjacent", default: false
    t.json "img_rect", default: {}
    t.string "html"
    t.index ["account_id"], name: "index_simple_chat_messages_on_account_id"
    t.index ["img_id"], name: "index_simple_chat_messages_on_img_id"
    t.index ["simple_chat_section_id"], name: "index_simple_chat_messages_on_simple_chat_section_id"
  end

  create_table "simple_chat_sections", force: :cascade do |t|
    t.string "key", default: "default", null: false
    t.integer "order"
    t.bigint "simple_chat_id"
    t.bigint "account_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["account_id"], name: "index_simple_chat_sections_on_account_id"
    t.index ["simple_chat_id"], name: "index_simple_chat_sections_on_simple_chat_id"
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
    t.string "heading"
    t.string "teaser_message"
    t.bigint "seller_id"
    t.bigint "account_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "extra_teaser_message"
    t.integer "lock_version", default: 1
    t.bigint "owner_id", null: false
    t.boolean "use_seller_animation", default: false, null: false
    t.bigint "brand_id"
    t.index ["account_id"], name: "index_simple_chats_on_account_id"
    t.index ["brand_id"], name: "index_simple_chats_on_brand_id"
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

  create_table "taggings", force: :cascade do |t|
    t.bigint "tag_id"
    t.bigint "user_id"
    t.bigint "brand_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["brand_id"], name: "index_taggings_on_brand_id"
    t.index ["tag_id"], name: "index_taggings_on_tag_id"
    t.index ["user_id"], name: "index_taggings_on_user_id"
  end

  create_table "tags", force: :cascade do |t|
    t.string "name", null: false
    t.string "tag_type", null: false
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
    t.string "img_url"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.boolean "subscribed_to_newsletter", default: false, null: false
    t.integer "onboarding_stage", default: 0
    t.boolean "admin", default: false, null: false
    t.json "img_rect", default: {}
    t.integer "affiliate_role", default: 0, null: false
    t.string "social_media_url"
    t.string "referral_code"
    t.string "referred_by_code"
    t.datetime "requested_upgrade_to_seller_at"
    t.string "currency", default: "eur", null: false
    t.text "bio"
    t.string "shipping_first_name"
    t.string "shipping_last_name"
    t.string "address_line1"
    t.string "address_line2"
    t.string "zip_code"
    t.string "city"
    t.string "country"
    t.datetime "accepted_terms_and_conditions_at"
    t.string "stripe_user_id"
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

  add_foreign_key "affiliate_links", "affiliations"
  add_foreign_key "affiliations", "accounts"
  add_foreign_key "affiliations", "users"
  add_foreign_key "brands", "accounts"
  add_foreign_key "generated_urls", "users"
  add_foreign_key "images", "accounts"
  add_foreign_key "images", "users"
  add_foreign_key "interests", "accounts"
  add_foreign_key "interests", "users"
  add_foreign_key "invites", "accounts"
  add_foreign_key "login_events", "users"
  add_foreign_key "memberships", "accounts"
  add_foreign_key "memberships", "users"
  add_foreign_key "orders", "accounts"
  add_foreign_key "orders", "users", column: "seller_id"
  add_foreign_key "outros", "accounts"
  add_foreign_key "outros", "sellers"
  add_foreign_key "outros", "users", column: "owner_id"
  add_foreign_key "product_picks", "accounts"
  add_foreign_key "product_picks", "images", column: "img_id"
  add_foreign_key "product_picks", "spotlights"
  add_foreign_key "products", "accounts"
  add_foreign_key "sellers", "accounts"
  add_foreign_key "sellers", "images", column: "animated_img_id"
  add_foreign_key "sellers", "images", column: "img_id"
  add_foreign_key "showcases", "accounts"
  add_foreign_key "showcases", "sellers"
  add_foreign_key "showcases", "users", column: "owner_id"
  add_foreign_key "simple_chat_messages", "accounts"
  add_foreign_key "simple_chat_messages", "images", column: "img_id"
  add_foreign_key "simple_chat_messages", "simple_chat_sections"
  add_foreign_key "simple_chat_sections", "accounts"
  add_foreign_key "simple_chat_sections", "simple_chats"
  add_foreign_key "simple_chats", "accounts"
  add_foreign_key "simple_chats", "brands"
  add_foreign_key "simple_chats", "sellers"
  add_foreign_key "simple_chats", "users", column: "owner_id"
  add_foreign_key "spotlights", "accounts"
  add_foreign_key "spotlights", "sellers"
  add_foreign_key "spotlights", "showcases"
  add_foreign_key "taggings", "brands"
  add_foreign_key "taggings", "tags"
  add_foreign_key "taggings", "users"
  add_foreign_key "triggers", "accounts"
  add_foreign_key "website_settings", "accounts"
  add_foreign_key "website_settings", "websites"
  add_foreign_key "websites", "accounts"
end
