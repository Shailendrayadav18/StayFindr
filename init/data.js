const sampleListing = [
  {
    title: "Luxury Beach Villa",
    description: "Sea-facing luxury villa with private pool",
    price: 5500,
    place: "Malibu, California",
    country: "USA",
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511"
  },
  {
    title: "Modern City Apartment",
    description: "High-rise apartment in the heart of the city",
    price: 3200,
    place: "Manhattan, New York",
    country: "USA",
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb"
  },
  {
    title: "Lake View Cabin",
    description: "Cozy wooden cabin near the lake",
    price: 2100,
    place: "Banff, Alberta",
    country: "Canada",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470"
  },
  {
    title: "Mountain Chalet",
    description: "Beautiful chalet with snow mountain views",
    price: 4200,
    place: "Zermatt",
    country: "Switzerland",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
  },
  {
    title: "Parisian Studio",
    description: "Elegant studio apartment near Eiffel Tower",
    price: 2800,
    place: "Paris",
    country: "France",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"
  },
  {
    title: "Luxury Desert Resort",
    description: "Premium stay in the middle of the desert",
    price: 3900,
    place: "Dubai",
    country: "UAE",
    image: "https://images.unsplash.com/photo-1501117716987-c8e1ecb210d9"
  },
  {
    title: "Tokyo Smart Apartment",
    description: "Smart-tech enabled compact apartment",
    price: 3100,
    place: "Shibuya, Tokyo",
    country: "Japan",
    image: "https://images.unsplash.com/photo-1549187774-b4e9b0445b06"
  },
  {
    title: "Beachfront Bungalow",
    description: "Relaxing bungalow with direct beach access",
    price: 3600,
    place: "Phuket",
    country: "Thailand",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
  },
  {
    title: "City Loft Apartment",
    description: "Stylish loft with modern interiors",
    price: 2900,
    place: "Berlin",
    country: "Germany",
    image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5"
  },
  {
    title: "Historic Stone Villa",
    description: "Traditional stone villa with vineyard views",
    price: 4100,
    place: "Tuscany",
    country: "Italy",
    image: "https://images.unsplash.com/photo-1505691723518-36a5ac3b2c98"
  },
  {
    title: "Luxury Sky Condo",
    description: "High-rise condo with skyline views",
    price: 3400,
    place: "Singapore",
    country: "Singapore",
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858"
  },
  {
    title: "Seaside White Villa",
    description: "Greek-style villa with ocean views",
    price: 4800,
    place: "Santorini",
    country: "Greece",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688"
  },
  {
    title: "Countryside Cottage",
    description: "Peaceful countryside home surrounded by nature",
    price: 2000,
    place: "Cotswolds",
    country: "United Kingdom",
    image: "https://images.unsplash.com/photo-1472224371017-08207f84aaae"
  },
  {
    title: "Luxury Safari Lodge",
    description: "Wildlife lodge with luxury amenities",
    price: 3700,
    place: "Maasai Mara",
    country: "Kenya",
    image: "https://images.unsplash.com/photo-1505842465776-3f8b2c4c9f4a"
  },
  {
    title: "Beach House Retreat",
    description: "Calm beach house perfect for relaxation",
    price: 2600,
    place: "Gold Coast",
    country: "Australia",
    image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae"
  },
  {
  title: "Nordic Wooden Cabin",
  description: "Minimalist wooden cabin surrounded by snow forests",
  price: 2300,
  place: "Lapland",
  country: "Finland",
  image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750"
},
{
  title: "Luxury Canal House",
  description: "Classic canal-side house with modern interiors",
  price: 4100,
  place: "Amsterdam",
  country: "Netherlands",
  image: "https://images.unsplash.com/photo-1502673530728-f79b4cab31b1"
},
{
  title: "Ocean View Apartment",
  description: "Apartment with panoramic ocean views",
  price: 3500,
  place: "Barcelona",
  country: "Spain",
  image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511"
},
{
  title: "Traditional Ryokan Stay",
  description: "Authentic Japanese ryokan experience",
  price: 2700,
  place: "Kyoto",
  country: "Japan",
  image: "https://images.unsplash.com/photo-1549187774-b4e9b0445b06"
},
{
  title: "Luxury Marina Condo",
  description: "Condo overlooking the marina skyline",
  price: 3900,
  place: "Vancouver",
  country: "Canada",
  image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb"
},
{
  title: "Tropical Island Villa",
  description: "Private villa on a tropical island",
  price: 6200,
  place: "Bora Bora",
  country: "French Polynesia",
  image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
},
{
  title: "Historic Townhouse",
  description: "Renovated historic home in old town",
  price: 2400,
  place: "Prague",
  country: "Czech Republic",
  image: "https://images.unsplash.com/photo-1472224371017-08207f84aaae"
},
{
  title: "Cliffside Luxury Villa",
  description: "Villa located on cliffs with sea views",
  price: 5200,
  place: "Amalfi Coast",
  country: "Italy",
  image: "https://images.unsplash.com/photo-1505691723518-36a5ac3b2c98"
},
{
  title: "Modern Glass House",
  description: "Architect-designed glass house in nature",
  price: 4600,
  place: "Oslo",
  country: "Norway",
  image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
},
{
  title: "Downtown Business Hotel",
  description: "Comfortable hotel for business travelers",
  price: 2100,
  place: "Chicago",
  country: "USA",
  image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
},
{
  title: "Secluded Jungle Lodge",
  description: "Eco-lodge hidden deep in the jungle",
  price: 1800,
  place: "Ubud, Bali",
  country: "Indonesia",
  image: "https://images.unsplash.com/photo-1505842465776-3f8b2c4c9f4a"
},
{
  title: "Luxury City Skyscraper Flat",
  description: "High-rise flat with full city views",
  price: 4400,
  place: "Hong Kong",
  country: "China",
  image: "https://images.unsplash.com/photo-1484154218962-a197022b5858"
},
{
  title: "Beachside Surf House",
  description: "Perfect stay for surfers and beach lovers",
  price: 2600,
  place: "Santa Teresa",
  country: "Costa Rica",
  image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae"
},
{
  title: "Alpine Ski Chalet",
  description: "Luxury ski-in ski-out chalet",
  price: 5800,
  place: "Chamonix",
  country: "France",
  image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750"
},
{
  title: "Luxury City Residence",
  description: "Premium residence in city center",
  price: 3300,
  place: "Vienna",
  country: "Austria",
  image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5"
},
{
  title: "Desert Glass Villa",
  description: "Modern glass villa in desert landscape",
  price: 4900,
  place: "Palm Springs",
  country: "USA",
  image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
},
{
  title: "Luxury Harbor Apartment",
  description: "Apartment overlooking the harbor",
  price: 3700,
  place: "Cape Town",
  country: "South Africa",
  image: "https://images.unsplash.com/photo-1484154218962-a197022b5858"
},
{
  title: "Traditional Moroccan Riad",
  description: "Beautiful riad with inner courtyard",
  price: 2500,
  place: "Marrakech",
  country: "Morocco",
  image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688"
},
{
  title: "Luxury Island Resort",
  description: "Private island resort with villas",
  price: 7000,
  place: "Malé",
  country: "Maldives",
  image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
},
{
  title: "Urban Designer Loft",
  description: "Designer loft with artistic interiors",
  price: 3100,
  place: "Los Angeles",
  country: "USA",
  image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb"
}
];

module.exports = { data: sampleListing};