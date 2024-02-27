import React, { useEffect, useState } from 'react'
import Card from '../Card/Card'
import axios from "axios"
import "./Cards.css"


export default function Cards({ dogsResult , name}) {
  const [allDogs, setAllDogs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () =>{
      try {
        /*
          Traemos los datos de nuestro servidor
        */
        const { data } = await axios.get(`http://localhost:3001/dogs`)
        /*
          Extraemos los datos tanto de lo de la api como los de la base de datos
          Las concatenamos para que todos los datos esten en un solo array
        */
        const dataApi = data.apiResults
        const dataDb = data.dbResults
        const allData = dataApi.concat(dataDb)
        /*
          Actualizamos el estado de allDogs
        */
        setAllDogs(allData)
        setLoading(false)
      } catch (error) {
        console.error("Error en los datos:", error)
      }
    }
    fetchData()
  }, []);

  /*
    Haremos la logica del paginado
  */
  const [renderizado, setRenderizado] = useState([])

  useEffect(() => {
    let allMatchs = [];
  
    if (dogsResult.apiResults && dogsResult.dbResults) {
      allMatchs = dogsResult.apiResults.concat(dogsResult.dbResults);
    }
  
    if (allMatchs?.length > 0) {
      setRenderizado(allMatchs);
    } else if (name === "") {
      setRenderizado(allDogs);
    } else {
      setRenderizado([]);
    }
  }, [dogsResult, allDogs, name]);

  const [page, setPage] = useState(1);
  const dogsPerPage = 8;

  const startIndex = (page - 1) * dogsPerPage;
  const endIndex = startIndex + dogsPerPage

  const nextPage = () => {
    setPage(page + 1)
  }

  const prevPage = () => {
    setPage(page - 1)
  }

  return (
    <div className='cardsContenedor'>
      {
        loading ? (
          <img src="../../../public/cargando.gif" alt="cargando" width={"200px"} className='cargando'/>
          ) : (
          <>
          {renderizado.length > 0 ? (
            renderizado.slice(startIndex, endIndex).map((dog, index) => (
              <Card {...dog} key={index}></Card> 
            ))
          ) : (
            <h1>No hay coincidencias</h1>
          )}
          <div className='buttonPrevSig'>
            <button onClick={prevPage} disabled={page === 1}>⬅</button>
            <span className='textPage'>{page}</span>
            <button onClick={nextPage} disabled={endIndex >= renderizado.length}>⮕</button>
          </div>
        </>
        )
      }
    </div>
  )
}
