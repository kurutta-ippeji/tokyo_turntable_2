class RenameMusicGenreToStyleInSpaces < ActiveRecord::Migration[7.1]
  def up
    # Copy data from music_genre to style if style is empty
    execute <<-SQL
      UPDATE spaces
      SET style = music_genre
      WHERE (style IS NULL OR style = '') AND music_genre IS NOT NULL AND music_genre != '';
    SQL

    # Remove the music_genre column
    remove_column :spaces, :music_genre
  end

  def down
    # Add back music_genre column
    add_column :spaces, :music_genre, :string

    # Copy data back from style to music_genre
    execute <<-SQL
      UPDATE spaces
      SET music_genre = style
      WHERE style IS NOT NULL AND style != '';
    SQL
  end
end
