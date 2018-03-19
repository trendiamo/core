class CreateInappropriateFlags < ActiveRecord::Migration[5.1]
  def change
    create_table :inappropriate_flags do |t|
      t.references :user, foreign_key: true
      t.references :comment, foreign_key: true

      t.timestamps
    end
  end
end
