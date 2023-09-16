import Box from '@mui/material/Box';
import './App.css';
import BTMap from './BTMap';
import TransitSelector from './components/TransitSelector';

function App() {
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
