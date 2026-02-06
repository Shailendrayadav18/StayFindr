const sampleListings = [
  {
    title: "Cozy Mountain Cabin",
    description: "A peaceful wooden cabin surrounded by mountains.",
    image: {
      URL: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
      fileName: "mountain-cabin",
    },
    price: 3200,
    place: "Manali",
    country: "India",
  },
  {
    title: "Beachside Villa",
    description: "Luxury villa with ocean views and private access.",
    image: {
      URL: "https://images.unsplash.com/photo-1501117716987-c8e1ecb2101c",
      fileName: "beach-villa",
    },
    price: 9500,
    place: "Goa",
    country: "India",
  },
  {
    title: "Modern City Apartment",
    description: "Stylish apartment in the city center.",
    image: {
      URL: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
      fileName: "city-apartment",
    },
    price: 2800,
    place: "Delhi",
    country: "India",
  },
  {
    title: "Royal Heritage Haveli",
    description: "Traditional haveli with royal architecture.",
    image: {
      URL: "https://images.unsplash.com/photo-1523217582562-09d0def993a6",
      fileName: "heritage-haveli",
    },
    price: 6200,
    place: "Jaipur",
    country: "India",
  },
  {
    title: "Kerala Houseboat",
    description: "Relaxing stay on a beautiful houseboat.",
    image: {
      URL: "https://images.unsplash.com/photo-1601918774946-25832a4be0d6",
      fileName: "houseboat",
    },
    price: 7000,
    place: "Alleppey",
    country: "India",
  },

  {
    title: "Hilltop Cottage",
    description: "Cottage with panoramic hill views.",
    image: {
      URL: "https://images.unsplash.com/photo-1502673530728-f79b4cab31b1",
      fileName: "hill-cottage",
    },
    price: 3600,
    place: "Ooty",
    country: "India",
  },
  {
    title: "Luxury Penthouse",
    description: "High-rise penthouse with skyline view.",
    image: {
      URL: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
      fileName: "penthouse",
    },
    price: 12000,
    place: "Mumbai",
    country: "India",
  },
  {
    title: "Desert Camp",
    description: "Experience desert life under the stars.",
    image: {
      URL: "https://images.unsplash.com/photo-1544986581-efac024faf62",
      fileName: "desert-camp",
    },
    price: 4500,
    place: "Jaisalmer",
    country: "India",
  },
  {
    title: "Forest Treehouse",
    description: "Treehouse stay in the middle of nature.",
    image: {
      URL: "https://images.unsplash.com/photo-1472220625704-91e1462799b2",
      fileName: "treehouse",
    },
    price: 5000,
    place: "Wayanad",
    country: "India",
  },
  {
    title: "Lake View Apartment",
    description: "Apartment overlooking a calm lake.",
    image: {
      URL: "https://images.unsplash.com/photo-1505691723518-36a5ac3b2b8f",
      fileName: "lake-view",
    },
    price: 4100,
    place: "Udaipur",
    country: "India",
  },

  ...Array.from({ length: 40 }, (_, i) => ({
    title: `Comfort Stay ${i + 11}`,
    description: "Clean, comfortable stay ideal for travelers.",
    image: {
      URL: `https://images.unsplash.com/photo-${[
        "1505691938895-1758d7feb511",
        "1523217582562-09d0def993a6",
        "1502673530728-f79b4cab31b1",
        "1522708323590-d24dbb6b0267",
        "1472220625704-91e1462799b2",
      ][i % 5]}`,
      fileName: `comfort-${i + 11}`,
    },
    price: 2000 + (i % 10) * 500,
    place: [
      "Bangalore",
      "Pune",
      "Hyderabad",
      "Chennai",
      "Kolkata",
      "Shimla",
      "Mussoorie",
      "Rishikesh",
      "Amritsar",
      "Agra",
    ][i % 10],
    country: "India",
  })),
];

module.exports = sampleListings;
