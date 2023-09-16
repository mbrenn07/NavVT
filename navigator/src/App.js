import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './App.css';
import BTMap from './BTMap';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#E5751F'
    },
  },
});

function App() {

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ width: "100vw", height: "100vh", overflow: "clip", backgroundColor: "#75787b" }}>
        <BTMap />
      </Box>
    </ThemeProvider>
  );
}

export default App;
