import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Vol from "./vol-item";


function VolsList(){
    const [vols, setVols] = useState([]);
    const [volDetail, setVolDetail] = useState({});
    const authorization = localStorage.getItem("Authorization");
    
               
    useEffect(() => {
        fetch("https://localhost:7183/api/Vol", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorization,
          },
        })
          .then((res) => {
            if (res.status === 200) {
              return res.json();
            } else if (res.status === 401) {
              window.location.href = "http://localhost:3000/";
            }
            return [];
          })
          .then((data) => {
            setVols(data);
          });
      }, []);

      const formVolHandler = (selectedVol) =>{
        console.log("ok");
        setVolDetail = selectedVol;
      }
    
    return (<div>
        {vols.map((item) => (
            <Vol 
            key={item.Id}
            VilleDepart= {item.VilleDepart}
            VilleArrivee= {item.VilleArrivee}
            HeureArrivee={item.HeureArrivee}
            HeureDepart={item.HeureDepart}
            IdentifiantAvion={item.IdentifiantAvion}
            NombreDePlaces= {item.NombreDePlaces}
            selectedVol= {item}
            />
        ))}
    </div>)
}
export default VolsList;