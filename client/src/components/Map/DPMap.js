import React, { useEffect, useState } from 'react'
import L from 'leaflet'
import 'leaflet-routing-machine'
import * as ESRI from 'esri-leaflet-geocoder'
import io from 'socket.io-client'

export default function Maps ({ store, home = 'Jakkur, bangalore' }) {

  const socket = io('http://192.168.0.104:2809')
  const [wPoints, setWPoints] = useState([])
  const dpCoords = []
  let theMarker = {}

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
        console.log('VINAA:', result, [result.lat, result.lng])
        socket.emit('send-address', result)

        L.marker([result.lat, result.lng], { icon: icon })
          .addTo(newMap)
          .bindPopup(message)
        setWPoints(wPoints.push([result.lat, result.lng]))
        getRoute(newMap)
      })
  }

  const getRoute = (newMap) => {
    console.log('Route WPoints:', wPoints)
    const control = L.Routing.control({
      waypoints: wPoints,
      routeWhileDragging: true
    }).addTo(newMap)

    control.on('routeselected', function (e) {
      const route = e.route
      for (let i = 0; i < dpCoords.length; i++) {
        dpCoords.push(route.coordinates[i])
      }
    })
    setInterval(() => {
      dpCoords.forEach(pos => {
        locatePosition(newMap, pos)
        socket.emit('new-dp-position', pos)
      }, 5000)
      theMarker = (theMarker !== undefined) && undefined
    })
  }

  const locatePosition = (newMap, pos) => {
    theMarker = L.marker([pos.lat, pos.lng], { icon: bykeIcon })
      .addTo(newMap)
  }

  useEffect(() => {
    myMap()
  }, [])

  const myMap = () => {
    const newMap = L.map('map').setView([13.03, 77.59], 20)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(newMap)

    console.log('VEENA:', home, store)

    plotOnTheMap(store, newMap, storeIcon, 'Store Location:')

    plotOnTheMap(home, newMap, homeIcon, 'Delivery Location:')

    // plotOnTheMap(store, newMap, bykeIcon, 'DP Location:')
  }
  return (
    <div id='map' />
  )
}
