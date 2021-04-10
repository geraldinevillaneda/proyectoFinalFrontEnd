import React from 'react'
import {Marker, Popup} from 'react-leaflet'
import {IconLocation} from './IconLocation'



const Markers = (props)=> {

    const {data} = props;

    const markers = data.map((gasolinera, i) => (
        /* console.log(gasolinera[i]) */
        <Marker key={i} position = {[gasolinera.latitud_estacion, gasolinera.longitud_estacion]} icon={IconLocation}>
            <Popup>
                <p>
                    Nombre: {gasolinera.nombre_estacion} <br/>
                    Direccion: {gasolinera.direccion_estacion} <br/>
                    Telefono: {gasolinera.telefono_estacion} <br/>
                    Lactitud: {gasolinera.latitud_estacion} <br/>
                    Longitud: {gasolinera.longitud_estacion} <br/>
                </p>
            </Popup>
        </Marker>
    )); 
    
    return markers;
};

export default Markers