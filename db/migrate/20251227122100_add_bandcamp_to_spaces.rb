class AddBandcampToSpaces < ActiveRecord::Migration[7.1]
  def change
    add_column :spaces, :bandcamp, :text
  end
end
