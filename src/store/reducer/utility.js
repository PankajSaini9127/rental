
const initialAlert = {
    open: false,
    message: null,
    variant: null
}

export const alert = (state = initialAlert, action) => {
    switch (action.type) {
        case 'NOTIFY':
            return state = action.payload;
        default:
            return state;
    }
}

const initialAuth = {
    isAuth: false,
    role: null,
    name: null,
    id: null,
    state:null,
    city:null,

}

export const auth = (state = initialAuth, action) => {
    switch (action.type) {
        case 'AUTH':
            return state = {
                isAuth: true,
                role: action.payload.role,
                name:action.payload.name,
                id:action.payload.id,
                state:action.payload.state,
                city:action.payload.city
            };
        case 'LOGOUT':
            return state = initialAuth ;    
        default:
            return state;
    }
}
const initialMode = {
    type: false

}

export const mode = (state = initialMode, action) => {
    switch (action.type) {
        case 'MODE':
            return state = action.payload;
        default:
            return state;
    }
}
const initialTab = {
    open: false
}

export const tab = (state = initialTab, action) => {
    switch (action.type) {
        case 'TAB':
            return state = { open: action.payload.open };
        default:
            return state;
    }
}
const initialForm = {
    payload: null,

}

export const form = (state = initialForm, action) => {
    switch (action.type) {
        case 'FORM':
            // console.log(action)
            return state = action.payload;
        default:
            return state;
    }
}

const initialRefresh = {
    state: false,
}

export const refresh = (state = initialRefresh, action) => {
    switch (action.type) {
        case 'REFRESH':
            return state = !state
        default:
            return state;
    }
}

const initialLandloard=[]
export const landloard = (state= initialLandloard,action) =>{
    switch(action.type){
        case "ADD_LANDLOARD":
            return state = action.payload;
            default:return state
    }
}