class CreateAiGeneratedThemes < ActiveRecord::Migration[7.1]
  def change
    create_table :ai_generated_themes do |t|
      t.text :theme, null: false
      t.references :idea_session, null: false, foreign_key: true

      t.timestamps
    end
  end
end
