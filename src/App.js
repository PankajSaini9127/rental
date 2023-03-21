
import './App.css';

import { BrowserRouter} from 'react-router-dom'

// Component
import MyRouter from './Router';

// untility 
import Snackbar from './Components/utility/Snackbar'

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
   <BrowserRouter>
    <Snackbar/>
   <MyRouter/>
   </BrowserRouter>
   </ThemeProvider>
   </AuthContext.Provider>
  );
}

export {AuthContext};

export default App;
