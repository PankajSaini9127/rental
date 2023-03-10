
import './App.css';


// Component
import Router from './Router';

import {ThemeProvider} from '@mui/material'
import {Theam} from './Components/Theam';


function App() {
  return (
   <ThemeProvider theme={Theam}>
   <Router/>
   </ThemeProvider>
  );
}

export default App;
