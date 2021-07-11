import React, { useState, useEffect } from "react";
import axios from 'axios'
import ReactMapGL, { Marker } from "react-map-gl";
import "./App.css";
import PopupLocation from "./PopupLocation";
import { modalContext } from "./modalContext";

export default function App() {
  const [showPopup, setshowPopup] = useState(false)
  const [clickMarker, setclickMarker] = useState([])
  const [data, setData] = useState('');
  const [viewport, setViewport] = useState({
    latitude: 51.11306,
    longitude: 3.70976,
    width: "100vw",
    height: "100vh",
    zoom: 12
  });
  //Fetch the data
  useEffect(async () => {
    const result = await axios(
      'https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-1000&q=&rows=1000&refine.cou_name_en=Belgium',
    );

    setData(result.data.records);
  }, []);

  const records = data ? data.slice(0, 2000) : [];
  //create a new data to pop up
  const points = records.map((field, index) => ({
    message_Report: {
      id: index,
      location: field.geometry.coordinates[0],
      altitude: field.geometry.coordinates[1],
      name: field.fields.name,
      speed: field.fields.admin3_code,
    },
    geometry: {
      coordinates: [
        parseFloat(field.geometry.coordinates[0]),
        parseFloat(field.geometry.coordinates[1])
      ]
    }
  }));
  
  return (
    <div>

      <ReactMapGL
        {...viewport}
        maxZoom={20}
        mapboxApiAccessToken='pk.eyJ1Ijoia2VzaW5lZSIsImEiOiJja3F2M3l2ZzEwYXBnMzFvNjNjcGdyMjg1In0.pA1vzRimPw0FeGA5e0HU-w'
        onViewportChange={newViewport => {
          setViewport({ ...newViewport });
        }}
      >

        {points.map((record, index) => {
          const [longitude, latitude] = record.geometry.coordinates;

          return (
            //create 1000 markers
            <Marker
              key={index}
              latitude={latitude}
              longitude={longitude}
            >
              <div
                className="cluster-marker"
                type='button'
                onClick={() => {
                  setshowPopup(true)
                  setclickMarker(record)
                }}>
                {index}
              </div>
            </Marker>

          );
        }
        )}
        {/* pass the props to create a popup and state of showPopup */}
        <modalContext.Provider value={{ showPopup, setshowPopup }}>
          {showPopup && <PopupLocation record={clickMarker}  />}
        </modalContext.Provider>

      </ReactMapGL>
    </div>
  );
}