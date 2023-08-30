import { actions } from ".";
import { SET_REVERVED_VOL, SET_SELECTED_VOL } from "./constants";

const initState = {
    vol: '',
    setVol: ''
}

function reducer(state, action){
    switch (action.type){
        case SET_SELECTED_VOL:
            return {
                ...state,
                setVol: action.payload
            }
        case SET_REVERVED_VOL:
            return {
                ...state,
                vol : action.payload
            }
        default:
            throw new Error('Invalid action')
    }
}

export {initState}
export default reducer;