const mongoose = require("mongoose");
const axios = require("axios");
const Listing = require("../models/listing");

mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");

async function updateListings() {

  const listings = await Listing.find({
    geometry: { $exists: false }
  });

  console.log("Listings found:", listings.length);

  for (let listing of listings) {

    try {

      const location = `${listing.place}, ${listing.country}`;
      console.log("Searching:", location);

      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json&limit=1`;

      const response = await axios.get(url, {
        headers: {
          "User-Agent": "wanderlust-app"
        }
      });

      if (response.data.length > 0) {

        const lat = parseFloat(response.data[0].lat);
        const lon = parseFloat(response.data[0].lon);

        listing.geometry = {
          type: "Point",
          coordinates: [lon, lat] // MongoDB uses [lng, lat]
        };

        await listing.save();

        console.log("Updated:", listing.title);

      } else {
        console.log("No coordinates found for:", location);
      }

      // small delay (important for free API)
      await new Promise(resolve => setTimeout(resolve, 1000));

    } catch (err) {
      console.log("Error:", err.message);
    }

  }

  console.log("All listings updated!");
  mongoose.connection.close();
}

updateListings();