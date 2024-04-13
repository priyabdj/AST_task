import React, { useEffect, useState } from 'react';
import { GoogleMap, InfoWindow, Marker, useLoadScript } from '@react-google-maps/api';
const libraries = ['places'];
const HospitalMap = ({ lat, lng }) => {
    const [hospitals, setHospitals] = useState([]);
    const [selectedHospital, setSelectedHospital] = useState(null);
    const mapContainerStyle = {
        width: '100%',
        height: '100vh',
    };
    const center = {
        lat: lat || 7.2905715, // default latitude
        lng: lng || 80.6337262, // default longitude
    };

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.GOOGLE_MAP_API,
        libraries,
    });

    useEffect(() => {
        if (isLoaded) {
            const service = new window.google.maps.places.PlacesService(document.createElement('div'));

            service.nearbySearch(
                {
                    location: { lat: center.lat, lng: center.lng },
                    radius: 5000,
                    type: ['hospital']
                },
                (results, status) => {
                    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                        setHospitals(results);
                    }
                }
            );
        }
    }, [isLoaded, center.lat, center.lng]);

    if (loadError) {
        return <div>Error loading maps</div>;
    }

    if (!isLoaded) {
        return <div>Loading maps</div>;
    }
    return (
        <div>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={13}
                center={center}
            >
                {hospitals.map((hospital) => (
                    <Marker
                        title='dfkhbl'
                        key={hospital.place_id}
                        onClick={() => setSelectedHospital(hospital)}
                        position={{
                            lat: hospital.geometry.location.lat(),
                            lng: hospital.geometry.location.lng(),
                        }}
                    />
                ))}
                {selectedHospital && (
                    <InfoWindow
                        position={{
                            lat: selectedHospital.geometry.location.lat(),
                            lng: selectedHospital.geometry.location.lng(),
                        }}
                        onCloseClick={() => setSelectedHospital(null)}
                    >
                        <div>
                            <h2>{selectedHospital.name}</h2>
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        </div>
    );

};

export default HospitalMap;
