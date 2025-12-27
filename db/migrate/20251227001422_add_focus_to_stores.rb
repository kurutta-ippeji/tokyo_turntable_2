class AddFocusToStores < ActiveRecord::Migration[7.1]
  def change
    add_column :stores, :focus, :string
  end
end
