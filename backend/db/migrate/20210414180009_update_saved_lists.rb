class UpdateSavedLists < ActiveRecord::Migration[6.1]
  def change
    add_index :saved_lists, [:user_id, :gif_id], unique: true
  end
end
