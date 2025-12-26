class CreateStores < ActiveRecord::Migration[7.1]
  def change
    create_table :stores do |t|
      t.string :name
      t.text :description
      t.string :neighborhood
      t.string :address
      t.string :website_url
      t.string :photo_url

      t.timestamps
    end
  end
end
