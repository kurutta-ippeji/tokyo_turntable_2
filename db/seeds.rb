puts "🌱 Seeding listening spaces..."

Space.destroy_all
Store.destroy_all

# --------------------
# Listening Spaces
# --------------------

Space.create!([
  {
    name: "Miles",
    category: "Jazz Kissa",
    style: "Jazz",
    description: "A classic jazz kissaten in Setagaya with a deep vinyl collection and a quiet, time-warp atmosphere. Built for serious listening and lingering.",
    neighborhood: "Setagaya",
    address: "1-37-14 Matsubara, Setagaya-ku, Tokyo 156-0043",
    website_url: nil,
    photo_url: "https://i.pinimg.com/736x/37/30/ba/3730badaec01be4a4904911693d351c1.jpg",
    bandcamp: "https://bandcamp.com/EmbeddedPlayer/album=3270325797/size=small/bgcol=333333/linkcol=e32c14/transparent=true/"
  },
  {
    name: "Ragtime",
    category: "Jazz Kissa",
    style: "Jazz",
    description: "A long-running jazz kissaten offering a cozy, intimate space to enjoy vinyl jazz selections with a drink.",
    neighborhood: "Setagaya",
    address: "5-17-13 Minami-Karasuyama, Setagaya-ku, Tokyo 157-0062",
    website_url: "https://ragtime1978.wixsite.com/jazz",
    photo_url: "https://int.fnl-guide.com/uploads_image/2025/09/22/p1j5p24rm3m98slt1deq13uh1mfi5.jpg",
    bandcamp: "https://bandcamp.com/EmbeddedPlayer/album=3072182337/size=small/bgcol=333333/linkcol=ffffff/transparent=true/"
  },
  {
    name: "Masako",
    category: "Jazz Kissa",
    style: "Jazz",
    description: "A legendary jazz kissa known for its intimate counter seating, carefully selected records, and deeply personal atmosphere. Masako feels less like a café and more like being invited into someone's private listening room.",
    neighborhood: "Shinjuku",
    address: "Shinjuku-ku, Tokyo (exact address undisclosed)",
    website_url: nil,
    photo_url: "https://insheepsclothinghifi.com/wordpress/wp-content/uploads/2025/01/masako_web_2-1024x677.jpg",
    bandcamp: "https://bandcamp.com/EmbeddedPlayer/album=2003948830/size=small/bgcol=333333/linkcol=ffffff/transparent=true/"
  },
  {
    name: "Bar Open",
    category: "Bar",
    style: "Other",
    description: "A Shinjuku reggae and dub bar known for its sound system and deep roots selections. A staple for Tokyo’s reggae community.",
    neighborhood: "Shinjuku",
    address: "2-5-15 Shinjuku, Shinjuku-ku, Tokyo 160-0022",
    website_url: "https://www.facebook.com/Reggae-DUB-club-OPEN-209137905858073/",
    photo_url: "https://example.com/bar_open.jpg",
    bandcamp: nil
  },
  {
    name: "SHeLTeR",
    category: "DJ Bar",
    style: "DJ",
    description: "A DJ-focused bar in Hachioji hosting late-night sessions and club-leaning sounds outside central Tokyo.",
    neighborhood: "Hachioji",
    address: "1-1 Yokamachi, Hachioji, Tokyo 192-0071",
    website_url: "http://www.at-shelter.com/",
    photo_url: "https://example.com/shelter.jpg",
    bandcamp: nil
  }
])

puts "🎧 Seeded #{Space.count} listening spaces"

# --------------------
# Record Stores
# --------------------

puts "💽 Seeding record stores..."

Store.create!([
  {
    name: "VDS (Vinyl Delivery Service)",
    description: "Independent vinyl shop in Kameari known for thoughtful curation and community-driven digging.",
    focus: "Curated",
    neighborhood: "Kameari",
    address: "3-26-4 Nishikameari, Katsushika-ku, Tokyo 125-0002",
    website_url: "https://vinyldeliveryservice.com/",
    photo_url: "https://example.com/vds.jpg"
  },
  {
    name: "Kankyo Records",
    description: "Design-forward record store in Sangenjaya blending architecture, environment, and carefully selected vinyl.",
    focus: "Genre-specific",
    neighborhood: "Sangenjaya",
    address: "1-35-13 Kamiuma, Setagaya-ku, Tokyo 154-0011",
    website_url: "https://kankyorecords.com/",
    photo_url: "https://example.com/kankyo.jpg"
  },
  {
    name: "Dotei Records",
    description: "Highly regarded record store in Hachioji specializing in used and rare vinyl for serious collectors.",
    focus: "Vintage",
    neighborhood: "Hachioji",
    address: "12-1 Uenomachi, Hachioji, Tokyo 192-0902",
    website_url: "http://doteirecords.com/",
    photo_url: "https://example.com/dotei.jpg"
  },
  {
    name: "Next Records",
    description: "Popular Shibuya record shop offering a broad selection of new and used vinyl across genres.",
    neighborhood: "Shibuya",
    address: "11-11 Udagawacho, Shibuya-ku, Tokyo 150-0042",
    website_url: "https://nextrecordsjapan.net/",
    photo_url: "https://example.com/next_records.jpg"
  },
  {
    name: "City Country City",
    description: "Record store and café in Shimokitazawa combining vinyl browsing with relaxed neighborhood vibes.",
    neighborhood: "Shimokitazawa",
    focus: "Record cafe",
    address: "2-12-13 Kitazawa, Setagaya-ku, Tokyo 155-0031",
    website_url: "https://www.instagram.com/citycountrycityshimokitazawa/",
    photo_url: "https://example.com/city_country_city.jpg"
  },
  {
    name: "Pianola Records",
    description: "Independent record shop in Shimokitazawa with a friendly atmosphere and carefully curated vinyl.",
    focus: "Curated",
    neighborhood: "Shimokitazawa",
    address: "2-36-13 Daita, Setagaya-ku, Tokyo 155-0033",
    website_url: "https://pianola-records.com/",
    photo_url: "https://example.com/pianola.jpg"
  }
])

puts "💿 Seeded #{Store.count} record stores"
puts "✅ Seeding complete"
