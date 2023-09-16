import Box from '@mui/material/Box';
import './App.css';
import BTMap from './BTMap';
import TransitSelector from './components/TransitSelector';
import {getApiInfo} from './BackendService.js';
import {useEffect} from "react";

function App() {

  useEffect(() => {
    getApiInfo().then((response) => {
      console.log(response.data);
    })
  }, []);
  return (

    <Box sx={{
    }}>
      <TransitSelector></TransitSelector>
      <div className="App">
      <BTMap/>
    </div>
    </Box >
  );
}

export default App;
