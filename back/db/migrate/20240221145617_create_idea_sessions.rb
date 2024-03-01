class CreateIdeaSessions < ActiveRecord::Migration[7.1]
  def change
    create_table :idea_sessions do |t|
      t.references :user, null: false, foreign_key: true
      t.string :uuid, null: false
      t.boolean :is_theme_determined, null: false, default: false
      t.boolean :is_ai_theme_generated, null: false, default: false
      t.integer :category, null: false, default: 0
      t.integer :question, null: false, default: 0
      t.boolean :is_ai_answer_generated, null: false, default: false
      t.text :theme
      t.boolean :is_finished, null: false, default: false

      t.timestamps
    end
    add_index :idea_sessions, :uuid, unique: true
  end
end
