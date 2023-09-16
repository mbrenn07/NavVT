import Box from '@mui/material/Box';
import './App.css';
import BTMap from './BTMap';
import TransitSelector from './components/TransitSelector';
import BackendService from './BackendService.js';
import { useEffect } from "react";
import { Grid } from '@mui/material';

function App() {

  useEffect(() => {
    BackendService.getActiveBusInfo().then((response) => {
      console.log(response.data);
    })
  }, []);

  return (
    <Box sx={{ width: "100vw", height: "100vh", overflow: "clip" }}>
      <Grid container columns={12} direction={"row"} wrap='nowrap' sx={{ width: "100%", height: "100%" }}>
        <Grid item xs={true} sx={{ width: "100%", height: "100%" }}>
          <BTMap />
        </Grid>
        <Grid container item xs={"auto"} columns={10} direction={"column"} wrap='nowrap' sx={{ mx: 1 }}>
          <Grid item xs={1}>
            <TransitSelector options={['ABC', 'DEF', 'FGH']} />
          </Grid>
          <Grid item sx={{ width: "100%", height: "100%" }}>
            <Box sx={{ backgroundColor: "darkgrey", width: "100%", height: "calc(100%)", mt: -.5, zIndex: -2, position: "relative" }}>
              <Box
                component="img"
                src="/NavVTLogo.png"
                alt="NavVT Logo"
                sx={{
                  position: 'absolute',
                  zIndex: 99,
                  bottom: 0,
                  right: 0,
                  width: "100%",
                  maxHeight: '100%'
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
