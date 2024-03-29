import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./vols-list.css"
import {useStore, actions} from "../store"

function VolItem(props){

    const heureDepart = props.HeureDepart;
    const heureArrivee = props.HeureArrivee;

    // Convert the date string to a Date object
    const dateObjectDepart = new Date(heureDepart);
    const dateObjectArrivee = new Date(heureArrivee);

    // Format the date and time
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: 'numeric', 
        minute: 'numeric', 
        second: 'numeric', 
        timeZoneName: 'short' 
    };
    const formattedHeureDepart = dateObjectDepart.toLocaleString('en-US', options);
    const formattedHeureArrivee = dateObjectDepart.toLocaleString('en-US', options);


    const [state, dispatch] = useStore()

    useEffect(()=>{
        console.log(state.setVol)
    },[state])
    const formVolHandler = () =>{
        dispatch(actions.setSelectedVol(props.selectedVol));
      }
    return  <div class="flight-list" onClick = {formVolHandler} >
    <div class="flight-info">
        <p><strong>Departure City:</strong> {props.VilleDepart}</p>
        <p><strong>Arrival City:</strong> {props.VilleArrivee}</p>
        
    </div>
    <div class="flight-info">
        <p><strong>Departure Time:</strong> {formattedHeureDepart}</p>
        <p><strong>Arrival Time:</strong> {formattedHeureArrivee}</p>
    </div>
    
</div>
}
export default VolItem;