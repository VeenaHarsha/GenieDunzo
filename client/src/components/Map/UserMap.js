import React, { useEffect, useState } from 'react'
import L from 'leaflet'
import 'leaflet-routing-machine'
import io from 'socket.io-client'

export default function Maps ({ store, home = 'Jakkur, bangalore' }) {
  const socket = io('http://192.168.0.104:2809')

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
  const [wPoints, setWPoints] = useState([])
  let latlngObj

  const plotOnUserMap = async (newMap) => {
    await socket.on('send-geocode-addr', data => {
      console.log('1.Veena Data is:', data, L.latLng(data))
      latlngObj = L.latLng(data)
      L.marker([latlngObj.lat, latlngObj.lng], { icon: storeIcon })
        .addTo(newMap)
      setWPoints(wPoints.push([latlngObj.lat, latlngObj.lng]))
    })
    getRoute(newMap)
    socket.on('locate-new-dp-pos', data => {
      L.marker([data.lat, data.lng], { icon: bykeIcon })
        .addTo(newMap)
    })
  }

  const getRoute = (newMap) => {
    console.log('FROM ROUTE:', wPoints)
    L.Routing.control({
      waypoints: wPoints,
      routeWhileDragging: true
    }).addTo(newMap)
  }
  useEffect(() => {
    myMap()
  }, [])

  const myMap = () => {
    const newMap = L.map('map').setView([13.03, 77.59], 12)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(newMap)

    plotOnUserMap(newMap)
  }

  return (
    <div id='map' />
  )
}

