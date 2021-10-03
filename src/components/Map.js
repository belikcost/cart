import { YMaps, Map as YandexMap, Placemark, Clusterer } from 'react-yandex-maps';

import point from '../img/point.svg';


export const Map = ({ google, cityLat, cityLng, pickpoints, handleChange }) => {

    return (
        <YMaps>
            <div className="delivery__map">
                <YandexMap
                    width={'100%'}
                    height={'100%'}
                    state={{ center: [cityLat || 55.753764, cityLng || 37.622312], zoom: 10 }}
                >
                    <Clusterer
                        options={{
                            preset: 'islands#invertedOrangeClusterIcons',
                            groupByCoordinates: false,
                        }}
                    >
                        {pickpoints.map(pickpoint => (
                            <Placemark
                                geometry={[pickpoint.coord_y, pickpoint.coord_x]}
                                options={{iconLayout: 'default#image', iconImageHref: point}}
                                onClick={() => handleChange('pickpoint', pickpoint)}
                                key={pickpoint.id}
                            />
                        ))}
                    </Clusterer>
                </YandexMap>
            </div>
        </YMaps>
    );
}