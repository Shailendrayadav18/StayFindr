const map = L.map("map").setView([listingLat, listingLng], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors",
}).addTo(map);

L.marker([listingLat, listingLng])
  .addTo(map)
  .bindPopup("Listing Location")
  .openPopup();
