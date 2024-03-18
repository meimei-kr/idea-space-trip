class CreateIdeaMemos < ActiveRecord::Migration[7.1]
  def change
    create_table :idea_memos do |t|
      t.string :uuid, null: false, default: -> { '(uuid())' }
      t.references :idea_session, null: false, foreign_key: true
      t.integer :perspective, null: false
      t.text :hint
      t.text :answer, null: false
      t.text :comment

      t.timestamps
    end
    add_index :idea_memos, :uuid, unique: true
  end
end
