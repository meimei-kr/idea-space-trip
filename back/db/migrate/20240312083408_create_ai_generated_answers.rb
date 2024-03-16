class CreateAiGeneratedAnswers < ActiveRecord::Migration[7.1]
  def change
    create_table :ai_generated_answers do |t|
      t.integer :perspective, null: false
      t.text :hint, null: false
      t.text :answer, null: false
      t.references :idea_session, null: false, foreign_key: true

      t.timestamps
    end
  end
end
