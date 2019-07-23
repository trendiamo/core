class AddUsePersonaAnimationToResources < ActiveRecord::Migration[5.1]
  def change
    add_column :outros, :use_persona_animation, :boolean, default: false, null: false
    add_column :showcases, :use_persona_animation, :boolean, default: false, null: false
    add_column :simple_chats, :use_persona_animation, :boolean, default: false, null: false
    add_column :spotlights, :use_persona_animation, :boolean, default: false, null: false
  end
end
