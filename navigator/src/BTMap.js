import { GoogleMap, MarkerF, useLoadScript, Polyline } from "@react-google-maps/api";
import { useMemo } from "react";
import "./App.css";

const App = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });
  const center = useMemo(() => ({ lat: 37.228198, lng: -80.423329 }), []);


  const marker1Position = { lat: 37.2269965, lng: -80.4113475 };
  const marker2Position = { lat: 37.230000, lng: -80.420000 };
  return (
    <>
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName="map-container"
          center={center}
          zoom={14}
        >
          <MarkerF onMouseOver={() => {
            console.log("Gamer hours");
          }} position={{ lat: 37.2269965, lng: -80.4113475 }} />
          <MarkerF position={{ lat: 37.230000, lng: -80.420000 }} />

          <Polyline
            path={[marker1Position, marker2Position]}
            options={{
              strokeColor: "#FF0000", 
              strokeOpacity: 1.0, 
              strokeWeight: 2, 
            }}
          />
        </GoogleMap>
      )}
    </>
  );
};

export default App;