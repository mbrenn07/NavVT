import { GoogleMap, MarkerF, useLoadScript, PolylineF } from "@react-google-maps/api";
import { useMemo, useState, useEffect } from "react";
import BackendService from "./BackendService.js";

import "./App.css";

const App = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });
  const center = useMemo(() => ({ lat: 37.228198, lng: -80.423329 }), []);

  const [buses, setBuses] = useState([]);

  useEffect(() => {
    BackendService.getBTInfo().then((response) => {
      setBuses(response.data.data);
      //use buses[x].states[0] to get direction, speed, capacity, passengers, lat, long
    }
    );
  }, [])

  setInterval(() => {
    BackendService.getBTInfo().then((response) => {
      setBuses(response.data.data);
      //use buses[x].states[0] to get direction, speed, capacity, passengers, lat, long
    }
    );
  }, 5000)


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

          {buses.length > 0 && (
            buses.map((b, i) => {  
              return (<MarkerF key={i} position={{ lat: b.states[0].latitude, lng: b.states[0].longitude }} 
                icon={
                  {
                      path: "M21 3L3 10.53v.98l6.84 2.65L12.48 21h.98L21 3z",
                      scale: 1,
                      strokeColor: "#000000",
                      fillColor: "#000000",
                      fillOpacity: 1,
                      rotation: -45+parseInt(b.states[0].direction),
                  }} />)
            })
          )}
          
          {/* <MarkerF position={{ lat: 37.2269965, lng: -80.4113475 }} 
          icon = {{url: require('./navigation.svg').default,}}/>
          <MarkerF position={{ lat: 37.230000, lng: -80.420000 }} 
          icon = {{url: require('./navigation.svg').default,}}/> */}

          {/* <PolylineF
            path={[marker1Position, marker2Position]}
            options={{
              strokeColor: "#FF0000",
              strokeOpacity: 1.0,
              strokeWeight: 2,
            }}
          /> */}
        </GoogleMap>

      )}
    </>
  );
};

export default App;