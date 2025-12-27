class AddStyleToSpaces < ActiveRecord::Migration[7.1]
  def change
    add_column :spaces, :style, :string
  end
end
