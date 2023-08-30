import { SET_SELECTED_VOL } from "./constants";
import { SET_REVERVED_VOL } from "./constants";

export const setSelectedVol = payload => ({
    type: SET_SELECTED_VOL,
    payload
})

export const setReservedVol = payload => ({
    type: SET_REVERVED_VOL,
    payload
})