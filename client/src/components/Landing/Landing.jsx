import React from 'react'
import "./Landing.css"
import { Link } from 'react-router-dom'
import "../../../public/portada1.png"

export default function Landing() {
  return (
    <div className='landingContenedorGeneral'>
      <div className='landingBloque1'>
        <h1>Bienvenido(a) a mi proyecto PI DOGS</h1>
        <p>En esta página web podrás encontrar una gran variedad de perros, podrás observar, buscar y hasta crear tus propios perritos.</p>
        <p>
          Si deseas hacer eso y mucho más, continua aqui:
        </p>
        <Link to={"/home"}>
          <button className='landingButtonHome'>Home</button>
        </Link>
      </div>
      <div className='landingBloque2'>
        <img src="../../../public/portada1.png" alt="" className='img1'/>
        <img src="../../../public/portada2.png" alt="" className='img2'/>
        <img src="../../../public/portada3.png" alt="" className='img3'/>
      </div>
    </div>
  )
}
