# Seed data for Listening Spaces
# This file uses Active Record to create Space records

puts "🌱 Seeding listening spaces..."

spaces_data = [
  {
    name: "Miles",
    category: "Jazz Kissa",
    style: "Jazz",
    description: "A classic jazz kissaten in Setagaya with a deep vinyl collection and a quiet, time-warp atmosphere. Built for serious listening and lingering.",
    neighborhood: "Setagaya",
    address: "1-37-14 Matsubara, Setagaya-ku, Tokyo 156-0043",
    website_url: nil,
    photo_url: "https://i.pinimg.com/736x/37/30/ba/3730badaec01be4a4904911693d351c1.jpg",
    bandcamp: "https://bandcamp.com/EmbeddedPlayer/album=3270325797/size=small/bgcol=333333/linkcol=ffffff/artwork=none/transparent=true/"
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
    bandcamp: "https://bandcamp.com/EmbeddedPlayer/album=3072182337/size=small/bgcol=333333/linkcol=ffffff/artwork=none/transparent=true/"
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
    bandcamp: "https://bandcamp.com/EmbeddedPlayer/album=2003948830/size=small/bgcol=333333/linkcol=ffffff/artwork=none/transparent=true/"
  },
  {
    name: "Bar Open",
    category: "Bar",
    style: "Other",
    description: "A Shinjuku reggae and dub bar known for its sound system and deep roots selections. A staple for Tokyo's reggae community.",
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
]

# Use Active Record to create records
spaces_data.each do |space_attrs|
  Space.find_or_create_by!(name: space_attrs[:name]) do |space|
    space.assign_attributes(space_attrs)
  end
end

puts "🎧 Seeded #{Space.count} listening spaces"
