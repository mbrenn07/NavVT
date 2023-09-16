import Box from '@mui/material/Box';
import './App.css';
import BTMap from './BTMap';
import TransitSelector from './components/TransitSelector';
import { getActiveBusInfo } from './BackendService.js';
import { useEffect } from "react";

function App() {

  useEffect(() => {
    getActiveBusInfo().then((response) => {
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
          {/* <Box sx={{
            display: "flex",
            position: "absolute",
            zIndex: 99,
            top: "5%",
            left: "35%",
            transform: "translate(-50%,-50%)",
          }}>
            <svg fill="#000000" width="60px" height="60px" viewBox="-1 0 19 19" xmlns="http://www.w3.org/2000/svg" opacity="0.35" class="cf-icon-svg">
              <path d="M16.417 9.579A7.917 7.917 0 1 1 8.5 1.662a7.917 7.917 0 0 1 7.917 7.917zm-3.675-1.403a.395.395 0 0 0-.65-.303V5.724a.794.794 0 0 0-.792-.791H5.685a.794.794 0 0 0-.792.791v2.15a.396.396 0 0 0-.65.302v.327a.396.396 0 0 0 .65.303v.989a.79.79 0 0 0-.262.587v1.465a.318.318 0 0 0-.243.308v.726a.318.318 0 0 0 .317.316h.452v.728a.318.318 0 0 0 .317.317h.644a.318.318 0 0 0 .317-.317v-.728h3.98v.728a.317.317 0 0 0 .316.317h.78a.317.317 0 0 0 .317-.317v-.728h.452a.317.317 0 0 0 .317-.316v-.726a.318.318 0 0 0-.243-.308v-1.465a.79.79 0 0 0-.262-.587v-.989a.395.395 0 0 0 .65-.303zm-6.85 2.007a.554.554 0 1 0 .555.554.554.554 0 0 0-.555-.554zm-.365-3.078h2.65V9.59h-2.65zm5.728-1.115a.396.396 0 0 0-.396-.395H6.126a.396.396 0 0 0 0 .791h4.733a.396.396 0 0 0 .396-.396zM8.809 7.105h2.65V9.59h-2.65zm2.284 3.078a.554.554 0 1 0 .554.554.554.554 0 0 0-.554-.554z" />
            </svg>
            <Typography sx={{ fontSize: '20px', transform: "translate(25%, 25%)", opacity: "0.75", color: "red" }}>NavVT</Typography>
          </Box> */}
          <BTMap />
        </Box>
        <TransitSelector></TransitSelector>
      </Box>
    </Box >
  );
}

export default App;
