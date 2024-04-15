class CreateIdeaLikes < ActiveRecord::Migration[7.1]
  def change
    create_table :idea_likes do |t|
      t.references :user, null: false, foreign_key: true
      t.references :idea_memo, null: false, foreign_key: true

      t.timestamps
    end

    add_index :idea_likes, %i[user_id idea_memo_id], unique: true
  end
end
