class CreateSavedLists < ActiveRecord::Migration[6.1]
  def change
    create_table :saved_lists do |t|
      t.integer :user_id, null: false
      t.integer :gif_id, null: false

      t.timestamps
    end
    add_index :saved_lists, :user_id
    add_index :saved_lists, :gif_id
  end
end
