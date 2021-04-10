import L from 'leaflet'

export const IconLocation = L.icon ({
    iconUrl: require('../assets/icon.svg'),
    iconRetinaUrl: require('../assets/icon.svg'),
    iconAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    iconSize: [35,35],
    className: "leaflet-venue-icon",
})

