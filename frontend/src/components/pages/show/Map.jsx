import { GoogleMap, InfoWindow, Marker, useJsApiLoader } from "@react-google-maps/api";

export default function Map({ coordinates, title }) {

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyA1zsvibMflElYIlzBj8nifBSk_nOp1w9c"
  });

  if (!isLoaded || !coordinates) return <p>Loading map...</p>;

  const center = {
    lat: coordinates[1], // latitude
    lng: coordinates[0], // longitude
  };

  const containerStyle = {
    width: "100%",
    height: "500px",
    borderRadius: "10px"
  };

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
      <Marker position={center} ><InfoWindow position={center} ><div className="text-dark fw-bold">{title}</div></InfoWindow></Marker>
    </GoogleMap>
  );
}