/* import React, { Component } from 'react';
//import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icono from 'leaflet/dist/images/marker-icon.png';
import isombra from 'leaflet/dist/images/marker-shadow.png';
import retina from 'leaflet/dist/images/marker-icon-2x.png';

//importamos icono
import {IconLocation} from './IconLocation'

console.log({IconLocation});



class RenderPoints extends Component {

    state = {
        points: []
    }



    render() {
        const zoom = 12;
        const location = [4.08, -76.19];/* ['4.08', '-76.19']; *///* [{lat: "4.08466", lng:"-76.19536"}]; */
        /*delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: retina,
            iconUrl: icono,
            shadowUrl: isombra,
        });
        return (
            <div>
                <MapContainer center={location} zoom={zoom}>
                <TileLayer  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors" />
                    {this.state.points.map((row) => {
                        console.log(row);
                        return (
                            <div key={row.id}>
                            <Marker position={location} icon={IconLocation}>
                                <Popup minWidth={90}>
                                    {"Hola Mundo"}
                                </Popup>
                            </Marker>
                            </div>
                        );

                    })}
                </MapContainer>
            </div>
        )
    }
}

export default RenderPoints; */

import React from 'react';

import MapView from './components/MapView'


function RenderPoint() {
    return (
        <MapView/>
    );
}

export default RenderPoint;
