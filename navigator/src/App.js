import Box from '@mui/material/Box';
import './App.css';
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
    </Box >
  );
}

export default App;
