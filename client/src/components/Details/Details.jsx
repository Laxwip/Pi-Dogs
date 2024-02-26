import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function Details() {
  const {origen, id} = useParams()
  const [perro, setPerro] = useState({})
  useEffect(() => {
    const fetchData = async () => {
      try {
        const {data} = await axios.get(`http://localhost:3001/dogs/${id}`)
        setPerro(data)
      } catch (error) {
        console.error("Error:", error)
      }
    }
    fetchData()
  },[id]);

  let perroFinal = {}

  if(origen === "api"){
    perroFinal = perro?.apiResults
  } else if (origen === "db") {
    perroFinal = perro?.dbResults
  }
  return (
    <div>
      <span>ID: {perroFinal?.id}</span>
      <img src={perroFinal?.imagen} alt="" />
      <span>Nombre: {perroFinal?.nombre}</span>
      <span>Altura: {perroFinal?.altura}</span>
    </div>
  )
}
