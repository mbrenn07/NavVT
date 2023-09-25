import { GoogleMap, MarkerF, useLoadScript, PolylineF, InfoWindowF } from "@react-google-maps/api";
import { useMemo, useState, useEffect, useRef } from "react";
import BackendService from "./BackendService.js";
import { Grid, Box, Stack } from '@mui/material';
import TransitSelector from "./components/TransitSelector.js";
import xmlToJSON from "./components/xmlToJSON.js";
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
  const [busToTimes, setBusToTimes] = useState({});
  const [displayBuses, setDisplayBuses] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [infoWindowData, setInfoWindowData] = useState();

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
        response.data.data.forEach((bus) => {
          BackendService.getRouteTimes(bus.gtfsTripId).then((data) => {
            busToTimes[bus.routeId] = Object.values(xmlToJSON.parseString(data.data).DocumentElement[0])[0];
            setBusToTimes({ ...busToTimes });
          }).catch((e) => console.error(e));
        });
        setDisplayBuses(response.data.data.map((b) => {
          return b.routeId;
        }))
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
    busLines.length = 0;
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

  const handleMarkerClick = (index, bus) => {
    setInfoWindowData({ id: "Bus " + index, data: bus.routeId + ": " + bus.percentOfCapacity + "% Full" });
    setIsOpen(true);
  };

  const handleStopMarkerClick = (index, val) => {
    setInfoWindowData({ id: "Stop " + index, row1: (val.stop.isTimePoint == "Y" ? "Timecheck\n" : null), row2: val.stop.patternPointName + " (" + val.stop.stopCode + ")" });
    setIsOpen(true);
  };

  const hex2 = (c) => {
    c = Math.round(c);
    if (c < 0) c = 0;
    if (c > 255) c = 255;

    let s = c.toString(16);
    if (s.length < 2) s = "0" + s;

    return s;
  }

  const darkenColor = (col, light) => {

    let r = parseInt(col.substr(0, 2), 16);
    let g = parseInt(col.substr(2, 2), 16);
    let b = parseInt(col.substr(4, 2), 16);

    r = (1 - light) * r + light * 255;
    g = (1 - light) * g + light * 255;
    b = (1 - light) * b + light * 255;

    return hex2(r) + hex2(g) + hex2(b);
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
            options={{ fullscreenControl: false }}
          >
            {stopCodeToBus && Object.values(stopCodeToBus).map((val, i) => {
              let routeIds = [];
              if (val.buses) {
                let buses = Array.from(val.buses);
                let busFound = false;
                buses.forEach(b => {
                  if ((displayBuses.includes(b) || displayBuses.length === 0)) {
                    routeIds.push(b);
                    busFound = true;
                  }
                });
                if (!busFound) {
                  return <></>;
                }
              }
              else {
                return <></>
              }
              let xyz = 'data:image/svg+xml;utf-8, \
              <svg ' + (val.stop.isTimePoint === "Y" ? 'width="30" height="30"' : 'width="20" height="20"') + ' viewBox="0 -960 960 960" xmlns="http://www.w3.org/2000/svg"> \
                  <defs><linearGradient id="mygx"> \
                      <stop offset="20%" stop-color="%23'+ (val.stop.isTimePoint === "N" ? darkenColor(busToColor[routeIds[2 % routeIds.length]].substring(1), .2) : busToColor[routeIds[2 % routeIds.length]].substring(1)) + '" /> \
                      <stop offset="25%" stop-color="%23'+ (val.stop.isTimePoint === "N" ? darkenColor(busToColor[routeIds[2 % routeIds.length]].substring(1), .2) : busToColor[routeIds[2 % routeIds.length]].substring(1)) + '"/> \
                      <stop offset="25%" stop-color="%23'+ (val.stop.isTimePoint === "N" ? darkenColor(busToColor[routeIds[0 % routeIds.length]].substring(1), .2) : busToColor[routeIds[0 % routeIds.length]].substring(1)) + '"/> \
                      <stop offset="50%" stop-color="%23'+ (val.stop.isTimePoint === "N" ? darkenColor(busToColor[routeIds[0 % routeIds.length]].substring(1), .2) : busToColor[routeIds[0 % routeIds.length]].substring(1)) + '"/> \
                      <stop offset="50%" stop-color="%23'+ (val.stop.isTimePoint === "N" ? darkenColor(busToColor[routeIds[3 % routeIds.length]].substring(1), .2) : busToColor[routeIds[3 % routeIds.length]].substring(1)) + '"/> \
                      <stop offset="70%" stop-color="%23'+ (val.stop.isTimePoint === "N" ? darkenColor(busToColor[routeIds[3 % routeIds.length]].substring(1), .2) : busToColor[routeIds[3 % routeIds.length]].substring(1)) + '"/> \
                      <stop offset="70%" stop-color="%23'+ (val.stop.isTimePoint === "N" ? darkenColor(busToColor[routeIds[1 % routeIds.length]].substring(1), .2) : busToColor[routeIds[1 % routeIds.length]].substring(1)) + '"/> \
                  </linearGradient></defs> \
                  <path fill="url(%23mygx)" stroke-width="1.5" d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 400Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Z"></path> \
                  </svg>';
              return (val.stop && (
                <MarkerF
                  key={val.stop.stopCode + routeIds[0] + routeIds[1] + routeIds[2] + routeIds[3]}
                  onClick={() => {
                    handleStopMarkerClick(i, val);
                  }}
                  position={{ lat: parseFloat(val.stop.latitude), lng: parseFloat(val.stop.longitude) }}
                  icon={{
                    url: xyz,
                  }}>
                  {isOpen && infoWindowData?.id === "Stop " + i && (
                    <InfoWindowF
                      onCloseClick={() => {
                        setIsOpen(false);
                      }}
                      position={{ lat: parseFloat(val.stop.latitude), lng: parseFloat(val.stop.longitude) }}
                    >
                      <Stack sx={{maxWidth: 120}}>
                        {infoWindowData.row1 && (
                        <Box sx={{textAlign: "center", mb: .5}}>
                          <b>{infoWindowData.row1}</b>
                        </Box>
                        )}
                        <Box>
                          {infoWindowData.row2}
                        </Box>
                      </Stack>
                    </InfoWindowF>)}
                </MarkerF>)
              )

            })
            }
            {busLines}
            {buses.length > 0 && (
              buses.map((bus, i) => {
                if (!displayBuses.includes(bus.routeId) && displayBuses.length !== 0) {
                  return <></>
                }
                return (
                  <MarkerF onClick={() => {
                    handleMarkerClick(i, bus);
                  }}
                    key={bus.states[0].direction + bus.states[0].latitude + bus.states[0].longitude} position={{ lat: bus.states[0].latitude, lng: bus.states[0].longitude }} //NOSONAR
                    icon={
                      {
                        path: "M21 3L3 10.53v.98l6.84 2.65L12.48 21h.98L21 3z",
                        scale: 1.4,
                        strokeColor: "#000000",
                        fillColor: busToColor[bus.routeId],
                        fillOpacity: 1,
                        anchor: { x: 10, y: 10 },
                        rotation: -45 + parseInt(bus.states[0].direction),
                      }} >
                    {isOpen && infoWindowData?.id === "Bus " + i && (
                      <InfoWindowF
                        position={{ lat: bus.states[0].latitude, lng: bus.states[0].longitude }}
                        onCloseClick={() => {
                          setIsOpen(false);
                        }}
                      >
                        <>
                          {infoWindowData.data}
                        </>
                      </InfoWindowF>)}
                  </MarkerF>
                )
              })
            )}

          </GoogleMap>

        )}
      </Grid>
      <TransitSelector
        options={Array.from(new Set(buses.map((bus) => bus.routeId)))}
        buses={buses}
        busToColor={busToColor}
        busToStop={busToStop}
        busToTimes={busToTimes}
        displayBuses={displayBuses}
        setDisplayBuses={setDisplayBuses}
        createBusRoutes={createBusRoutes}
      />
    </Grid>
  );
};

export default App;