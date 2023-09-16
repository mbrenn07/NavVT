import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './App.css';
import BTMap from './BTMap';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ width: "100vw", height: "100vh", overflow: "clip", backgroundColor: "#121212" }}>
        <BTMap />
      </Box>
    </ThemeProvider>
  );
}

export default App;
