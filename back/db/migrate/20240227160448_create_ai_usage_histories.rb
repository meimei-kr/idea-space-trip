class CreateAiUsageHistories < ActiveRecord::Migration[7.1]
  def change
    create_table :ai_usage_histories do |t|
      t.references :user, null: false, foreign_key: true
      t.date :date, null: false
      t.integer :count, null: false, default: 0

      t.timestamps
    end
  end
end
