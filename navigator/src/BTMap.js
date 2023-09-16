import { GoogleMap, MarkerF, useLoadScript, PolylineF } from "@react-google-maps/api";
import { useMemo, useState, useEffect, useRef } from "react";
import BackendService from "./BackendService.js";
import { Grid } from '@mui/material';
import TransitSelector from "./components/TransitSelector.js"

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
  const [busToColor, setBusToColor] = useState({});

  const busLength = useRef(0);
  busLength.current = 0;

  useEffect(() => {
    BackendService.getInitialBusInfo()
    .then((data) => {
      const busInfoObj = data.data.data;
      Object.keys(busInfoObj).forEach((key) => {
        busToColor[key] = "#" + busInfoObj[key][0].routeColor;
      });
      setBusToColor({...busToColor});
    })
    .catch((e) => console.error(e));

    BackendService.getActiveBusInfo()
    .then((response) => {
      setBuses(response.data.data);
      createBusRoutes(response.data.data);
    });

    const interval = setInterval(() => {
      BackendService.getActiveBusInfo().then((response) => {
        setBuses(response.data.data);
      }
      );
    }, 5000)
    return () => clearInterval(interval);
  }, [])

  const createBusRoutes = (newBuses) => {
    stopCodeToBus.length = 0;
    busToStop.length = 0;
    newBuses.forEach((bus) => {
      const waypointCoords = [];
      BackendService.getBusRoute(bus.patternName)
        .then((data) => {
          //process data into stopIdToBus
          data.data.data?.forEach((stop) => {
            if (stop.isBusStop === "Y") {
              if (stop) {
                stopCodeToBus[stop.stopCode] = { stop: stop, buses: stopCodeToBus[stop.stopCode]?.buses ? stopCodeToBus[stop.stopCode].buses.add(bus.routeId) : new Set([bus.routeId]) };
              }
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
                strokeColor: busToColor[bus.routeId],
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
    <Grid container columns={12} direction={"row"} wrap='nowrap' sx={{ width: "100%", height: "100%" }}>
      <Grid item xs={true} sx={{ width: "100%", height: "100%" }}>
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
              buses.map((bus, i) => {
                return (<MarkerF onMouseOver={() => {
                  console.log(bus.routeId);
                }} key={i} position={{ lat: bus.states[0].latitude, lng: bus.states[0].longitude }}
                  icon={
                    {
                      path: "M21 3L3 10.53v.98l6.84 2.65L12.48 21h.98L21 3z",
                      scale: 1.25,
                      strokeColor: "#000000",
                      fillColor: busToColor[bus.routeId],
                      fillOpacity: 1,
                      anchor: { x: 10, y: 10 },
                      rotation: -45 + parseInt(bus.states[0].direction),
                    }} />)
              })
            )}
          </GoogleMap>

        )}
      </Grid>
      <TransitSelector options={Array.from(new Set(buses.map((bus) => bus.routeId)))} />
    </Grid>
  );
};

export default App;