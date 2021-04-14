import React from 'react'
import {Marker, Popup} from 'react-leaflet'
import {IconLocation} from './IconLocation'



const Markers = (props)=> {

    const {data} = props;

    const markers = data.map((sede, i) => (
        /* console.log(gasolinera[i]) */
        <Marker key={i} position = {[sede.latitud, sede.longitud]} icon={IconLocation}>
            <Popup>
                <p>
                    Nombre: {sede.nombre_sede} <br/>
                    Lactitud: {sede.latitud} <br/>
                    Longitud: {sede.longitud} <br/>
                </p>
            </Popup>
        </Marker>
    )); 
    
    return markers;
};

export default Markers