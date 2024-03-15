class CreateThemeAnswers < ActiveRecord::Migration[7.1]
  def change
    create_table :theme_answers do |t|
      t.text :answer, null: false
      t.references :idea_session, null: false, foreign_key: true

      t.timestamps
    end
  end
end
