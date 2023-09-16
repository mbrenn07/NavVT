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
        setBusToColor({ ...busToColor });
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
          console.log(stopCodeToBus);
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
            {stopCodeToBus && Object.values(stopCodeToBus).map((val, i) => {
              return (val.stop && <MarkerF key={i} position={{ lat: parseFloat(val.stop.latitude), lng: parseFloat(val.stop.longitude) }}
                icon={{
                  path: "M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 400Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Z",
                  scale: 0.02,
                  strokeColor: "#000000",
                  fillColor: "#000000",
                  fillOpacity: 1,
                }} />)

            })
            }
          </GoogleMap>

        )}
      </Grid>
      <TransitSelector options={Array.from(new Set(buses.map((bus) => bus.routeId)))} busToColor={busToColor} />
    </Grid>
  );
};

export default App;