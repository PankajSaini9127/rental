
import './App.css';


// Component
import Router from './Router';

import {ThemeProvider} from '@mui/material'
import {Theam} from './Components/Theam';
import { createContext, useReducer } from 'react';
import reducer from './Components/ContextAPI/Reducer';

const AuthContext = createContext()

const initialState ={
  login:{},
  adminReCall:false
}



function App() {

const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <AuthContext.Provider value={{state,dispatch}}>
   <ThemeProvider theme={Theam}>
   <Router/>
   </ThemeProvider>
   </AuthContext.Provider>
  );
}

export {AuthContext};

export default App;
