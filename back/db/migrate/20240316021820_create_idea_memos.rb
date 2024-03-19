class CreateIdeaMemos < ActiveRecord::Migration[7.1]
  def change
    create_table :idea_memos do |t|
      t.string :uuid, null: false
      t.references :idea_session, null: false, foreign_key: true
      t.integer :perspective, null: false
      t.text :hint
      t.text :answer, null: false
      t.text :comment

      t.timestamps
    end
    add_index :idea_memos, :uuid, unique: true

    reversible do |dir|
      dir.up do
        execute <<-SQL
          ALTER TABLE idea_memos ALTER COLUMN uuid SET DEFAULT gen_random_uuid();
        SQL
      end
      dir.down do
        # ロールバック時のUUIDカラムのデフォルト値を削除する操作。
        # PostgreSQLではALTER COLUMNでDEFAULT値を直接削除できるため、
        # このブロックは空にしても問題なし
      end
    end
  end
end
