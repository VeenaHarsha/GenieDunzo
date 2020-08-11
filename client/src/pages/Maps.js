import React from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'

function Maps(props) {
  const mapStyles = {
    margin: '5%',
    width: '100%',
    height: '100%'
  }
    return (
      <Map
        google={props.google}
        zoom={12}
        style={mapStyles}
        initialCenter={{ lat: 12.9716, lng: 77.5946 }}
      > 
        <Marker position={{ lat: 12.9784, lng: 77.6408}} />
      </Map>
    )
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBfk6wDcOvU89iW_9vzqCU3Z2Pwy2cjAIQ'
})(Maps);
