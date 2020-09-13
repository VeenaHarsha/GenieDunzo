import React, { useState, useEffect } from 'react'
import L from 'leaflet'
import 'leaflet-routing-machine'
// import '../../../../node_modules/leaflet/dist/leaflet.css'
import * as ESRI from 'esri-leaflet-geocoder'

export default function Maps ({ store, home = 'Jakkur, bangalore' }) {
  const [wPoints, setWPoints] = useState([])
  // const [pickup, setPickup] = useState({}) //store
  // const [drop, setDrop] = useState({}) // Home
  // const [liveLocation, setLiveLocation] = useState([])

  let watchId

  const homeIcon = L.icon({
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: '/images/vMarker.png'
  })
  const bykeIcon = L.icon({
    iconSize: [35, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: '/images/byke-3.png'
  })
  const storeIcon = L.icon({
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: '/images/curr-loc.png'
  })

  useEffect(() => {
    myMap()
  }, [])

  const getLatLngFromAddr = (address, newMap, icon, message) => {
    let result
    ESRI.geocode()
      .text(address)
      .run(function (err, results, response) {
        if (err) {
          console.log(err)
          return
        }
        result = results.results[0].latlng
        L.marker([result.lat, result.lng], { icon: icon })
          .addTo(newMap)
          .bindPopup(message)
        console.log('RES_LAT_LNG:', result)
        setWPoints(wPoints.push([result.lat, result.lng]))
      })
  }

  const watchPosition = (newMap) => {
    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 30000
    }

    const target = {
      latitude: 0,
      longitude: 0
    }

    const successHandler = (position) => {
      console.log('POSition from successHandler:', position.coords)
      L.marker([position.coords.latitude, position.coords.longitude], { icon: bykeIcon })
        .addTo(newMap)
        .bindPopup('Device / DP location')

      if (target.latitude === position.coords.latitude && target.longitude === position.coords.longitude) {
        console.log('Reached the Location!! Item Delivered..')
        navigator.geolocation.clearWatch(watchId)
        watchId = null
      }
    }
    const errorHandler = (error) => {
      console.log('ERROR(' + error.code + '): ' + error.message)
    }

    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(
        successHandler,
        errorHandler,
        options
      )
      console.log('WATCH ID:', watchId)
    } else {
      console.log('Sorry, browser does not support geolocation!')
    }
  }

  const myMap = () => {
    const newMap = L.map('map').setView([13.03, 77.59], 12)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(newMap)

    console.log('VEENA:', home, store)
    // Convert Store Address to coordinates and mark it on map
    getLatLngFromAddr(store, newMap, storeIcon, 'Store Location:')

    // Convert Delivery Address to coordinates and mark it on map
    getLatLngFromAddr(home, newMap, homeIcon, 'Delivery Location:')

    getLatLngFromAddr(store, newMap, bykeIcon, 'Store Location:')

    watchPosition(newMap)
  }

  return (
    <div id='map' />
  )
}
