import { combineReducers } from 'redux'

// reducers 
import { alert, auth, mode, tab, form, refresh,landloard } from './utility'

const globalReducer = combineReducers({
    alert,
    auth,
    mode,
    tab,
    form,
    refresh,
    landloard
})

export default globalReducer;