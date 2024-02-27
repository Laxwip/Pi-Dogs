import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "./Details.css"

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
    <div className='DetailsContenedorGeneral'>
      <div className='DetailsContenedorImg'>
        <div className='DetailsContenedorImagen'>
          <img className="DetailsImagen" src={perroFinal?.imagen} alt="" />
          <span className='DetailsId'>{perroFinal?.id}</span>
        </div>
      </div>
      <div className='DetailsContenedorTexto'>
        <h1>{perroFinal?.nombre}</h1>
        <div className='DetailsDetails'>
          <div className='DetailsDetailsAltura'>
            <img src="../../public/altura.png" alt="icono de altura" width={"30px"} title='Altura'/>
            <span>{perroFinal?.altura} cm</span>
          </div>
          <div className='DetailsDetailsPeso'>
            <img src="../../public/peso.png" alt="icono de peso" width={"30px"} title='Peso'/>
            <span>{perroFinal?.peso} kg</span>
          </div>
          <div className='DetailsDetailsAñosDeVida'>
            <img src="../../public/añosDeVida.png" alt="icono de años de vida" width={"30px"} title='Años de vida'/>
            <span>{perroFinal?.añosDeVida}</span>
          </div>
        </div>
        <div className='DetailsTemperaments'>
          {perroFinal?.temperamentos?.map((temperamento, index) => (
            <span className="temperamento" key={index}>{temperamento}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
