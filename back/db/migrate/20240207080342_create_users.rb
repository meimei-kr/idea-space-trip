class CreateUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :users do |t|
      t.string :name, null: false
      t.string :email, null: false
      t.string :provider, null: false
      t.datetime :last_logged_in

      t.timestamps
    end
    add_index :users, :email, unique: true
  end
end
