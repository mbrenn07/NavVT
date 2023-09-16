import Box from '@mui/material/Box';
import './App.css';
import BTMap from './BTMap';
import TransitSelector from './components/TransitSelector';
import BackendService from './BackendService.js';
import { useEffect } from "react";
import { Grid } from '@mui/material';

function App() {

  return (
    <Box sx={{ width: "100vw", height: "100vh", overflow: "clip" }}>
      <Grid container columns={12} direction={"row"} wrap='nowrap' sx={{ width: "100%", height: "100%" }}>
        <Grid item xs={true} sx={{ width: "100%", height: "100%" }}>
          <BTMap />
        </Grid>
        <TransitSelector options={["ABC", "DEF", "BCG", 'll', 'pp', 'asdw', 'asdhw']} />
      </Grid>
    </Box>
  );
}

export default App;
