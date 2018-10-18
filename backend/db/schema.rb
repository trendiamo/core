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

ActiveRecord::Schema.define(version: 20181018171429) do

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

  create_table "expositions", force: :cascade do |t|
    t.string "domain"
    t.string "cta_text"
    t.string "cta_url"
    t.string "description"
    t.bigint "influencer_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["influencer_id"], name: "index_expositions_on_influencer_id"
  end

  create_table "expositions_instagram_posts", id: false, force: :cascade do |t|
    t.bigint "exposition_id", null: false
    t.bigint "instagram_post_id", null: false
    t.index ["exposition_id"], name: "index_expositions_instagram_posts_on_exposition_id"
    t.index ["instagram_post_id"], name: "index_expositions_instagram_posts_on_instagram_post_id"
  end

  create_table "expositions_videos", id: false, force: :cascade do |t|
    t.bigint "exposition_id", null: false
    t.bigint "video_id", null: false
    t.index ["exposition_id"], name: "index_expositions_videos_on_exposition_id"
    t.index ["video_id"], name: "index_expositions_videos_on_video_id"
  end

  create_table "influencers", force: :cascade do |t|
    t.string "name"
    t.string "profile_pic"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "instagram_posts", force: :cascade do |t|
    t.string "url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
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
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "auth_tokens", "users"
  add_foreign_key "expositions", "influencers"
end
