import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { filterOrigin, filterTemperament, getAllTemperaments, getDogByName, orderDog } from '../../redux/actions/actions';
import "./NavBar.css"

export default function NavBar({ setPage }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  // Datos globales del estado de Redux
  const allTemperaments = useSelector((state) => state.allTemperaments)
  const temperament = useSelector((state) => state.filterTemperament)

  // Almacenamos desde la API en el estado global todos los perros, y se requieren para renderizar en las Cards
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(getAllTemperaments())
      } catch (error) {
        console.error("Erros al cargar los temperamentos: ", error)
      }
    }
    fetchData()
  }, [])

  // Requerimos el temperamento seleccionado y lo despachamos
  useEffect(() => {
    const savedTemperament = JSON.parse(localStorage.getItem("selectedTemperament"));
    if (savedTemperament) {
      try {
        dispatch(filterTemperament(savedTemperament));
      } catch (error) {
        console.error("Error al aplicar el temperamento:", error);
      }
    }
  }, []);

  // Buscamos al perro por el nombre
  const onSearch = (name) =>{
    dispatch(getDogByName(name));
  }

  // Identificamos lo que escribe el usuario, lo guardamos localmente para mostrarlo y enviamos ese nombre al onSearch
  const handlerChange = (event) =>{
    const newName = event.target.value;
    setName(newName)
    onSearch(newName)
  }

  // Identificamos el valor de ordenamiendo elegido
  const handlerChangeOrder = (event) =>{
    dispatch(orderDog(event.target.value));
  }

  // Identificamos el valor de temperamento elegido
  const handlerChangeTemp = (event) =>{
    const selectedTemperament = temperament === "default" 
      ? event.target.value 
      : temperament;
    console.log(selectedTemperament);
    dispatch(filterTemperament(selectedTemperament))
    setPage(1)

    localStorage.setItem("selectedTemperament", selectedTemperament)
  };

  const handlerChangeOrigin = (event)=>{
      dispatch(filterOrigin(event.target.value))
  };

  return (
    <div className='navbarContenedor'>
      <div className='navBarIzquierda'>
        <h1>PI DOGS</h1>
        <img src="pata.png" alt="Huella de perro" className='huella'/>
      </div>
      <div className='navBarCentro'>
        
        <div className='ordenamiento'>
          
          <label htmlFor="ordenamiento">Ordenamiento: </label>
          <select name="ordenamiento" id="ordenamiento" defaultValue={"default"} onChange={handlerChangeOrder}>
            <option value="default">-</option>
            <option value="ascendente">A-Z</option>
            <option value="descendente">Z-A</option>
            <option value="menosPeso">Menos peso</option>
            <option value="masPeso">Mas peso</option>
          </select>
        </div>

        <div className='filtro'>

          <label htmlFor="temperamentos">Filtros: </label>
          <select name="temperamentos" id="temperamentos" defaultValue={"default"} onChange={handlerChangeTemp}>
            <option value="default">-</option>
            {allTemperaments.map(temp => (
              <option key={temp.id} value={temp.nombre}>{temp.nombre}</option>
            ))}
          </select>

          <select name="origen" id="origen" defaultValue={"default"} onChange={handlerChangeOrigin}>
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
        onChange={handlerChange}
        // onKeyUp={handleKeyUp}
        /> 
        <Link to={"/form"}>
          <button>Crear</button>
        </Link>
      </div>
    </div>
  )
}
