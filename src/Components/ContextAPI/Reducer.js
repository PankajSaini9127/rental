const reducer =(state,action)=>{
    switch (action.type) {
        case "ADD_AUTH": return {
            ...state,
            login:action.payload
        }
        case "ADMIN_RECALL": return {
            ...state,
            adminReCall: !state.adminReCall
        }
        case "ALERT" : return {
            ...state,
            alert : action.payload
        } 
        default: return state
            break;
    }
    
  }



  export default reducer