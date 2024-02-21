import React from 'react'
import "./Card.css"

export default function Card({imagen, nombre, temperamentos, peso}) {
  return (
    <div className='cardContenedor'>
      <h3>{nombre}</h3>
      <div className='cardImg'>
        <img src={imagen ? imagen : ""} alt="" width={"100px"}/>
      </div>
      <div>
        {temperamentos?.map((temperamento, index) => (
          <p key={index}>{temperamento}</p>
        ))}
      </div>
      <p>Peso: {peso}</p>
    </div>
  )
}
