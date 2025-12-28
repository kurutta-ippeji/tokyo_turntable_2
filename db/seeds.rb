# Main seeds file
# This file loads all seed files from db/seeds/ directory
# You can organize your seed data into separate files for better maintainability

puts "🌱 Starting seed process..."

# Clear existing data (optional - comment out if you want to preserve existing records)
# Space.destroy_all
# Store.destroy_all

# Load all seed files from db/seeds/ directory
Dir[File.join(Rails.root, 'db', 'seeds', '*.rb')].sort.each do |seed_file|
  puts "\n📄 Loading #{File.basename(seed_file)}..."
  load seed_file
end

puts "\n✅ Seeding complete!"
