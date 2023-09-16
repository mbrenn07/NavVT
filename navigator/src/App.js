import Box from '@mui/material/Box';
import './App.css';
import BTMap from './BTMap';
import TransitSelector from './components/TransitSelector';
import BackendService from './BackendService.js';
import { useEffect } from "react";

function App() {

  useEffect(() => {
    BackendService.getApiInfo().then((response) => {
      console.log(response.data);
    })
    BackendService.getBTInfo().then((response) => {
      console.log(response.data);
    })
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh"
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          width: "95%",
          height: "95%",
          position: "relative",
        }}
      >
        <Box
          sx={{
            bgcolor: "grey.300",
            width: "70%",
            height: "100%",
          }}
        >
          <BTMap />
        </Box>

        <TransitSelector></TransitSelector>
      </Box>
    </Box >
  );
}

export default App;
