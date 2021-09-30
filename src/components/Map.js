import { Map as GoogleMap, GoogleApiWrapper, Marker } from 'google-maps-react';
import { GOOGLE_API_KEY } from "../constants";

import MapStyle from "./MapStyle";

import point from '../img/point.svg';


const Map = ({google, cityLat, cityLng, pickpoints, handleChange}) => {
    console.log(cityLng);
    return (
        <div className="delivery__map">
            <GoogleMap
                google={google}
                zoom={10}
                styles={MapStyle}
                center={{lat: cityLat || 55.753764, lng: cityLng || 37.622312}}
            >
                {pickpoints.map(pickpoint => (
                    <Marker
                        position={{lat: pickpoint.coord_y, lng: pickpoint.coord_x}}
                        icon={{url: point}}
                        onClick={() => handleChange('pickpoint', pickpoint)}
                        key={pickpoint.id}
                    />
                ))}
            </GoogleMap>
        </div>
    );
}

export default GoogleApiWrapper({
    apiKey: GOOGLE_API_KEY,
})(Map);