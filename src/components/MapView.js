import React from 'react'

import  {MapContainer, TileLayer} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

import Markers from './Markers'

var data = []

fetch('http://localhost:5000/gasolineras', 
{
    method: 'GET'
}).then((respuesta) => {
    respuesta.json().then((result) => {
        data.push(result.data)
        data = data[0]
    })
});

const MapView = () => {
    return (
        <MapContainer center={{lat: '4.08', lng: '-76.19'}} zoom={14}> 
            <TileLayer 
                url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
                attribution= '&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors" />'/>
            <Markers data = {data}/>
        </MapContainer>
    )
}

export default MapView