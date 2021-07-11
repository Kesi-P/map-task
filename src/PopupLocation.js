import React,{useContext} from 'react'
import { Popup } from "react-map-gl";
import './Popup.css'
import { modalContext } from "./modalContext";
import Buidingicon from './buildings.png'

function PopupLocation({record}) {
    const [longitude, latitude] = record.geometry.coordinates;
    const {showPopup, setshowPopup} = useContext(modalContext)
     return (
        <>
        
        {showPopup && <Popup                
                latitude={latitude} longitude={longitude}
                closeButton={true}
                closeOnClick={false}
                onClose={() => setshowPopup(false) }
                anchor="bottom"
                className='popupmodal' >
                    <img src={Buidingicon} alt="Buidingicon" className='Buidingicon'/>
                <div className='locationinfo'>
                
                    <ul style={{listStyle:'none',padding:'unset'}}>
                        <li><b>ID</b></li>
                        <li><b>Longitude</b></li>
                        <li><b>Latitude</b></li>
                        <li><b>Name</b></li>
                        <li><b>Speed</b></li>
                    </ul>
                    <ul style={{listStyle:'none'}}>
                        <li>{record.message_Report.id}</li>
                        <li>{record.message_Report.location}</li>
                        <li>{record.message_Report.altitude}</li>
                        <li>{record.message_Report.name}</li>
                        <li>{record.message_Report.speed}</li>
                    </ul>
                </div> 
              </Popup>}
             
        </>
    )
}

export default PopupLocation
