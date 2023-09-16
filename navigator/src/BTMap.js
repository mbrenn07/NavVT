import { GoogleMap, MarkerF, useLoadScript, PolylineF } from "@react-google-maps/api";
import { useMemo, useState, useEffect } from "react";
import { getBTInfo } from "./BackendService";

import "./App.css";

const App = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });
  const center = useMemo(() => ({ lat: 37.228198, lng: -80.423329 }), []);

  const [buses, setBuses] = useState([]);

  useEffect(() => {
    getBTInfo().then((response) => {
      setBuses(response.data.data);
      //use buses[x].states[0] to get direction, speed, capacity, passengers, lat, long
    }
    )
  }, [])


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
          
          <MarkerF position={{ lat: 37.2269965, lng: -80.4113475 }} 
          icon = {{url: require('./navigation.svg').default,}}/>
          <MarkerF position={{ lat: 37.230000, lng: -80.420000 }} 
          icon = {{url: require('./navigation.svg').default,}}/>

          <PolylineF
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