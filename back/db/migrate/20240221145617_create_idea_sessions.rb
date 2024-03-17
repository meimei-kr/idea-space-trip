class CreateIdeaSessions < ActiveRecord::Migration[7.1]
  def change
    create_table :idea_sessions do |t|
      t.references :user, null: false, foreign_key: true
      t.string :uuid, null: false
      t.boolean :is_theme_determined, null: false, default: false
      t.boolean :is_ai_theme_generated, null: false, default: false
      t.integer :theme_category, null: false, default: 0
      t.integer :theme_question, null: false, default: 0
      t.text :theme_answer
      t.boolean :is_ai_answer_generated, null: false, default: false
      t.integer :ai_answer_retry_count, null: false, default: 0
      t.text :theme
      t.boolean :is_finished, null: false, default: false

      t.timestamps
    end
    add_index :idea_sessions, :uuid, unique: true
  end
end
