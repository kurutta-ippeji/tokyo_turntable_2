class RenameNeighborhoodToAreaInStores < ActiveRecord::Migration[7.1]
  def up
    # Rename the column from neighborhood to area
    rename_column :stores, :neighborhood, :area
  end

  def down
    # Revert the change
    rename_column :stores, :area, :neighborhood
  end
end
