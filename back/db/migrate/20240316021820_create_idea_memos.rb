class CreateIdeaMemos < ActiveRecord::Migration[7.1]
  def change
    create_table :idea_memos do |t|
      t.references :idea_session, null: false, foreign_key: true
      t.integer :perspective, null: false
      t.text :hint
      t.text :answer, null: false
      t.text :comment

      t.timestamps
    end
  end
end
