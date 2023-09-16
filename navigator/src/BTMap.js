import { GoogleMap, MarkerF, useLoadScript, PolylineF } from "@react-google-maps/api";
import { useMemo, useState, useEffect, useRef } from "react";
import BackendService from "./BackendService.js";

import "./App.css";

const App = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });
  const center = useMemo(() => ({ lat: 37.228198, lng: -80.423329 }), []);

  const [buses, setBuses] = useState([]);
  const [busToStop, setbusToStop] = useState([]);
  const [stopCodeToBus, setStopCodeToBus] = useState({});
  const [busLines, setBusLines] = useState([]);

  const busLength = useRef(0);
  busLength.current = 0;

  useEffect(() => {
    BackendService.getActiveBusInfo().then((response) => {
      setBuses(response.data.data);
      busLength.current = response.data.data;
      //use buses[x].states[0] to get direction, speed, capacity, passengers, lat, long
      createBusRoutes(response.data.data);
    }
    );
    const interval = setInterval(() => {
      BackendService.getActiveBusInfo().then((response) => {
        setBuses(response.data.data);
      }
      );
    }, 5000)
    return () => clearInterval(interval);
  }, [])

  const createBusRoutes = (newBuses) => {
    const busLines = [];
    newBuses.forEach((bus) => {
      const waypointCoords = [];
      BackendService.getBusRoute(bus.patternName)
        .then((data) => {
          //process data into stopIdToBus
          data.data.data?.forEach((stop) => {
            if (stop.isBusStop === "Y") {
              stopCodeToBus[stop.stopCode] = stopCodeToBus[stop.stopCode] ? stopCodeToBus[stop.stopCode].add(bus.routeId) : new Set([bus.routeId]);
              busToStop[bus.routeId] = busToStop[bus.routeId] ? busToStop[bus.routeId].add(stop) : new Set([stop]);
            }
            waypointCoords.push({ lat: parseFloat(stop.latitude), lng: parseFloat(stop.longitude) });
          });
          setStopCodeToBus({ ...stopCodeToBus });
          setbusToStop({ ...busToStop });
          busLines.push(
            <PolylineF
              path={waypointCoords}
              options={{
                strokeColor: "#FF0000",
                strokeOpacity: 1.0,
                strokeWeight: 2,
              }}
            />
          );
          setBusLines([...busLines]);
        })
        .catch((e) => console.error(e));
    });
  }

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
          {busLines}
          {buses.length > 0 && (
            buses.map((b, i) => {
              return (<MarkerF key={i} position={{ lat: b.states[0].latitude, lng: b.states[0].longitude }}
                icon={
                  {
                    path: "M21 3L3 10.53v.98l6.84 2.65L12.48 21h.98L21 3z",
                    scale: 1.25,
                    strokeColor: "#000000",
                    fillColor: "#000000",
                    fillOpacity: 1,
                    anchor: { x: 10, y: 10 },
                    rotation: -45 + parseInt(b.states[0].direction),
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