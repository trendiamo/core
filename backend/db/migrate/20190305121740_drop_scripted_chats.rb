class DropScriptedChats < ActiveRecord::Migration[5.1]
  def change
    drop_table "chat_messages" do |t|
      t.text "text", null: false
      t.datetime "created_at", null: false
      t.datetime "updated_at", null: false
      t.bigint "chat_step_id"
      t.bigint "account_id"
      t.integer "order", default: 1, null: false
      t.index ["account_id"], name: "index_chat_messages_on_account_id"
      t.index ["chat_step_id"], name: "index_chat_messages_on_chat_step_id"
    end
    drop_table "chat_options" do |t|
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
    drop_table "chat_steps" do |t|
      t.datetime "created_at", null: false
      t.datetime "updated_at", null: false
      t.bigint "scripted_chat_id"
      t.bigint "account_id"
      t.index ["account_id"], name: "index_chat_steps_on_account_id"
      t.index ["scripted_chat_id"], name: "index_chat_steps_on_scripted_chat_id"
    end
    drop_table "scripted_chats" do |t|
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
  end
end
