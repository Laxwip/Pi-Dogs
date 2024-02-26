import React, { useState } from 'react'
import "./NavBar.css"
import { Link } from 'react-router-dom'

export default function NavBar({name, handleChange}) {
  // const [name, setName] = useState("")

  // const handleChange = (event) => {
  //   const newName = event.target.value
  //   setName(newName)
  //   onSearch(newName)
  // }

  return (
    <div className='navbarContenedor'>
      <div className='navBarIzquierda'>
        <h1>PI DOGS</h1>
        <img src="../../../public/pata.png" alt="Huella de perro" className='huella'/>
      </div>
      <div className='navBarDerecha'>
        <input
        id='search_input'
        className='searchInput' 
        type="text" 
        placeholder='Search...'
        value={name}
        onChange={handleChange}
        // onKeyUp={handleKeyUp}
        /> 
        <Link to={"/form"}>
          <button>Crear</button>
        </Link>
      </div>
    </div>
  )
}
