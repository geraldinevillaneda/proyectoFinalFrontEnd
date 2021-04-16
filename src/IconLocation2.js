import L from 'leaflet'
import icono from './assets/icons/icon.svg'

export const IconLocation = L.icon(
    {
        iconUrl: icono,
        iconRetinaUrl: icono,
        shadowUrl: null,
        shadowSize: null,
        shadowAnchor: null,
        iconSize: [35, 35],
        className: 'leaflet-venue-icon'
    }
) 

