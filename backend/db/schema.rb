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

ActiveRecord::Schema.define(version: 20180806114333) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

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

  create_table "brands", force: :cascade do |t|
    t.string "name"
    t.string "legal_address_city"
    t.string "legal_address_number"
    t.string "legal_address_postal_code"
    t.string "legal_address_street"
    t.string "legal_address_country"
    t.string "legal_name"
    t.string "logo_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.text "short_description"
    t.text "long_description"
    t.string "header_content_photo"
    t.string "header_content_video"
    t.string "domestic_shipping_time"
    t.string "eu_shipping_time"
    t.string "outside_eu_shipping_time"
    t.text "general_shipping_info"
    t.text "trendiamo_shipping_info"
    t.index ["user_id"], name: "index_brands_on_user_id"
  end

  create_table "collection_modals", force: :cascade do |t|
    t.bigint "collection_id", null: false
    t.string "logo_pic_url", null: false
    t.string "cover_pic_url", null: false
    t.string "title", null: false
    t.string "text", null: false
    t.string "cta_text", null: false
    t.index ["collection_id"], name: "index_collection_modals_on_collection_id"
  end

  create_table "collections", force: :cascade do |t|
    t.string "handle", null: false
    t.string "title", null: false
    t.string "type", null: false
    t.string "profile_pic_url", null: false
    t.string "cover_pic_url", null: false
    t.text "description", null: false
  end

  create_table "comments", force: :cascade do |t|
    t.bigint "user_id"
    t.text "content", null: false
    t.boolean "pinned", default: false, null: false
    t.integer "upvotes_count", default: 0, null: false
    t.integer "inappropriate_flags_count", default: 0, null: false
    t.datetime "removed_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "product_id", null: false
    t.integer "anonymous_upvotes_count", default: 0, null: false
    t.index ["product_id"], name: "index_comments_on_product_id"
    t.index ["user_id"], name: "index_comments_on_user_id"
  end

  create_table "fenced_collections", force: :cascade do |t|
    t.bigint "collection_id", null: false
    t.string "domain_name", null: false
    t.string "favicon_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["collection_id"], name: "index_fenced_collections_on_collection_id"
  end

  create_table "inappropriate_flags", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "comment_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["comment_id"], name: "index_inappropriate_flags_on_comment_id"
    t.index ["user_id"], name: "index_inappropriate_flags_on_user_id"
  end

  create_table "likes", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "product_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["product_id"], name: "index_likes_on_product_id"
    t.index ["user_id"], name: "index_likes_on_user_id"
  end

  create_table "products", force: :cascade do |t|
    t.bigint "user_id"
    t.string "product_ref", null: false
    t.integer "likes_count", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.json "media_items"
    t.integer "anonymous_likes_count", default: 0, null: false
    t.index ["user_id"], name: "index_products_on_user_id"
  end

  create_table "upvotes", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "comment_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["comment_id"], name: "index_upvotes_on_comment_id"
    t.index ["user_id"], name: "index_upvotes_on_user_id"
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
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "auth_tokens", "users"
  add_foreign_key "brands", "users"
  add_foreign_key "collection_modals", "collections"
  add_foreign_key "comments", "users"
  add_foreign_key "fenced_collections", "collections"
  add_foreign_key "inappropriate_flags", "comments"
  add_foreign_key "inappropriate_flags", "users"
  add_foreign_key "likes", "products"
  add_foreign_key "likes", "users"
  add_foreign_key "products", "users"
  add_foreign_key "upvotes", "comments"
  add_foreign_key "upvotes", "users"
end
