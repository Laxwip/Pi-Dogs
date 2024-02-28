import React, { useState } from 'react'
import "./NavBar.css"
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { filterOrigin, filterTemperament, getDogByName, orderDog } from '../../redux/actions/actions';

export default function NavBar() {

  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const onSearch = (n) =>{
    dispatch(getDogByName(n));
  }

  const handleChange = (e) =>{
    const newName = e.target.value;
    setName(newName)
    onSearch(newName)
  }

  const handlerChange = (event) =>{
    dispatch(orderDog(event.target.value));
  }

  const handleChangeTemp = (event)=>{
    dispatch(filterTemperament(event.target.value))
  };

  const handleChangeOrigin = (event)=>{
      dispatch(filterOrigin(event.target.value))
  };

  return (
    <div className='navbarContenedor'>
      <div className='navBarIzquierda'>
        <h1>PI DOGS</h1>
        <img src="../../../public/pata.png" alt="Huella de perro" className='huella'/>
      </div>
      <div className='navBarCentro'>
        
        <div className='ordenamiento'>
          
          <label htmlFor="ordenamiento">Ordenamiento: </label>
          <select name="ordenamiento" id="ordenamiento" defaultValue={"default"} onChange={handlerChange}>
            <option value="default">-</option>
            <option value="ascendente">A-Z</option>
            <option value="descendente">Z-A</option>
            <option value="menosPeso">Menos peso</option>
            <option value="masPeso">Mas peso</option>
          </select>
        </div>

        <div className='filtro'>

          <label htmlFor="temperamentos">Filtros: </label>
          <select name="temperamentos" id="temperamentos" defaultValue={"default"} onChange={handleChangeTemp}>
            <option value="default">-</option>
            <option value="Happy">Happy</option>
          </select>

          <select name="origen" id="origen" defaultValue={"default"} onChange={handleChangeOrigin}>
            <option value="default">-</option>
            <option value="api">Api</option>
            <option value="db">Db</option>
          </select>

        </div>
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
