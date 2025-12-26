class CreateSpaces < ActiveRecord::Migration[7.1]
  def change
    create_table :spaces do |t|
      t.string :name
      t.string :category
      t.string :music_genre
      t.text :description
      t.string :neighborhood
      t.string :address
      t.string :website_url
      t.string :photo_url

      t.timestamps
    end
  end
end
