import React, { useEffect, useState } from 'react'
import L from 'leaflet'
import 'leaflet-routing-machine'
import * as ESRI from 'esri-leaflet-geocoder'
import io from 'socket.io-client'

export default function Maps ({ store, home = 'Jakkur, bangalore' }) {
  const socket = io('http://localhost:2809')
  const [wPoints, setWPoints] = useState([])
  const dpCoords = []
  let marker = null

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
    iconUrl: '/images/byke.png'
  })
  const storeIcon = L.icon({
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: '/images/curr-loc.png'
  })

  const plotOnTheMap = (address, newMap, icon, message) => {
    let result
    ESRI.geocode()
      .text(address)
      .run(function (err, results, response) {
        if (err) {
          console.log(err)
          return
        }
        result = results.results[0].latlng
        socket.emit('send-address', result)
        L.marker([result.lat, result.lng], { icon: icon })
          .addTo(newMap)
          .bindPopup(message)
        setWPoints(wPoints.push([result.lat, result.lng]))
        getRoute(newMap)
      })
  }

  const getRoute = (newMap) => {
    const control = L.Routing.control({
      waypoints: wPoints,
      routeWhileDragging: true,
      show: false
    }).addTo(newMap)

    control.on('routeselected', function (e) {
      const route = e.route
      for (let i = 0; i < route.coordinates.length; i++) {
        dpCoords.push(route.coordinates[i])
      }
      const lastPos = dpCoords[dpCoords.length - 1]

      const interval = setInterval(() => {
        dpCoords.forEach(pos => {
          if (pos === lastPos) {
            clearInterval(interval)
            return
          }
          locatePosition(newMap, pos)
          socket.emit('new-dp-position', pos)
        })
      }, 1000)
    })
  }

  const locatePosition = (newMap, pos) => {
    if (marker !== null) newMap.removeLayer(marker)
    marker = L.marker(pos, { icon: bykeIcon }).addTo(newMap)
  }

  const myMap = async () => {
    const newMap = L.map('map').setView([13.03, 77.59], 12)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(newMap)

    await plotOnTheMap(store, newMap, storeIcon, 'Store Location:')
    await plotOnTheMap(home, newMap, homeIcon, 'Delivery Location:')
  }

  useEffect(() => {
    myMap()
  }, [])
  
  return (
    <div id='map' />
  )
}
