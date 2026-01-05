# Seed data for Record Stores
# This file uses Active Record to create Store records

puts "💽 Seeding record stores..."

stores_data = [
  {
    name: "VDS (Vinyl Delivery Service)",
    description: "Independent vinyl shop in Kameari known for thoughtful curation and community-driven digging.",
    focus: "Curated",
    area: "Kameari",
    address: "3-26-4 Nishikameari, Katsushika-ku, Tokyo 125-0002",
    website_url: "https://vinyldeliveryservice.com/",
    photo_url: "https://example.com/vds.jpg"
  },
  {
    name: "Kankyo Records",
    description: "Design-forward record store in Sangenjaya blending architecture, environment, and carefully selected vinyl.",
    focus: "Genre-specific",
    area: "Sangenjaya",
    address: "1-35-13 Kamiuma, Setagaya-ku, Tokyo 154-0011",
    website_url: "https://kankyorecords.com/",
    photo_url: "https://example.com/kankyo.jpg"
  },
  {
    name: "Dotei Records",
    description: "Highly regarded record store in Hachioji specializing in used and rare vinyl for serious collectors.",
    focus: "Vintage",
    area: "Hachioji",
    address: "12-1 Uenomachi, Hachioji, Tokyo 192-0902",
    website_url: "http://doteirecords.com/",
    photo_url: "https://example.com/dotei.jpg"
  },
  {
    name: "Next Records",
    description: "Popular Shibuya record shop offering a broad selection of new and used vinyl across genres.",
    area: "Shibuya",
    address: "11-11 Udagawacho, Shibuya-ku, Tokyo 150-0042",
    website_url: "https://nextrecordsjapan.net/",
    photo_url: "https://example.com/next_records.jpg"
  },
  {
    name: "City Country City",
    description: "Record store and café in Shimokitazawa combining vinyl browsing with relaxed neighborhood vibes.",
    area: "Shimokitazawa",
    focus: "Record cafe",
    address: "2-12-13 Kitazawa, Setagaya-ku, Tokyo 155-0031",
    website_url: "https://www.instagram.com/citycountrycityshimokitazawa/",
    photo_url: "https://example.com/city_country_city.jpg"
  },
  {
    name: "Pianola Records",
    description: "Independent record shop in Shimokitazawa with a friendly atmosphere and carefully curated vinyl.",
    focus: "Curated",
    area: "Shimokitazawa",
    address: "2-36-13 Daita, Setagaya-ku, Tokyo 155-0033",
    website_url: "https://pianola-records.com/",
    photo_url: "https://example.com/pianola.jpg"
  },
  {
    name: "Creole Coffee Stand",
    focus: ["Record Cafe", "Genre-specific", "Curated"],
    description: "A vinyl-focused coffee stand specializing in music rooted in Louisiana and Mississippi Creole and blues traditions. Records from the American South are carefully selected, played, and sold, making the space feel closer to a listening room than a typical café — built for coffee, analog sound, and deep regional music culture.",
    area: "Higashi-Nagasaki (Toshima)",
    address: "4-7-18 Nagasaki, Toshima City, Tokyo 171-0051, Japan",
    website_url: "https://creolecoffeestand.stores.jp/",
    photo_url: nil
  }
]

# Use Active Record to create records
stores_data.each do |store_attrs|
  Store.find_or_create_by!(name: store_attrs[:name]) do |store|
    store.assign_attributes(store_attrs)
  end
end

puts "💿 Seeded #{Store.count} record stores"
