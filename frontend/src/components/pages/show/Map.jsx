import {
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useState, useMemo } from "react";

export default function Map({ coordinates, title }) {
  const [activeMarker, setActiveMarker] = useState(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  // ✅ Strict coordinate validation
  const center = useMemo(() => {
    if (
      !coordinates ||
      coordinates.length !== 2 ||
      isNaN(coordinates[0]) ||
      isNaN(coordinates[1])
    ) {
      return null;
    }
    return {
      lat: Number(coordinates[1]),
      lng: Number(coordinates[0]),
    };
  }, [coordinates]);

  // ❌ API error
  if (loadError) {
    return <p style={{ color: "red" }}>⚠️ Map failed to load</p>;
  }

  // ⏳ Loading or invalid data
  if (!isLoaded || !center) {
    return <p>📍 Location not available</p>;
  }

  return (
    <div style={{ width: "100%", height: "500px" }}>
      <GoogleMap
        key="stable-map"
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={center}
        zoom={12}
        onClick={() => setActiveMarker(null)}
      >
        {/* ✅ Marker */}
        <Marker
          position={center}
          onClick={() => setActiveMarker(center)}
        >
          {/* ✅ InfoWindow INSIDE Marker (SAFE METHOD) */}
          {activeMarker && (
            <InfoWindow onCloseClick={() => setActiveMarker(null)}>
              <div style={{ fontWeight: "bold" }}>
                {title || "Property Location"}
              </div>
            </InfoWindow>
          )}
        </Marker>
      </GoogleMap>
    </div>
  );
}