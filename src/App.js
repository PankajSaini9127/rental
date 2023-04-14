
import './App.css';

import { BrowserRouter} from 'react-router-dom'

// Component
import MyRouter from './Router';

// utility 
import Snackbar from './Components/utility/Snackbar'
import ErrorBound from "./Components/utility/ErrorBound";

import {ThemeProvider} from '@mui/material'
import {Theam} from './Components/Theam';
import { createContext, useReducer } from 'react';
import reducer from './Components/ContextAPI/Reducer';

const AuthContext = createContext()

const initialState ={
  login:{},
  adminReCall:false,
  alert : {
    open : false,
    variant : null,
    message : null
  }
}



function App() {

const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <AuthContext.Provider value={{state,dispatch}}>
   <ThemeProvider theme={Theam}>
   <ErrorBound fallback = {'Sorry for the inconvenience !!! '}>

   <BrowserRouter>
    <Snackbar/>
   <MyRouter/>
   </BrowserRouter>
   </ErrorBound>

   </ThemeProvider>
   </AuthContext.Provider>
  );
}

export {AuthContext};

export default App;
