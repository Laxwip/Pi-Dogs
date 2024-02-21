import React, { useEffect, useState } from 'react'
import Card from '../Card/Card'
import axios from 'axios';
import "./Cards.css"


export default function Cards({ dogsResult }) {
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () =>{
    try {
      const response = await axios.get(`http://localhost:3001/dogs`)
      setDogs(response.data)
      setLoading(false)
    } catch (error) {
      console.error("Error en los datos:", error)
    }
  }

  useEffect(() => {
    fetchData()
  }, []);

  return (
    <div className='cardsContenedor'>
      {
        loading ? (
          <img src="../../../public/cargando.gif" alt="cargando" width={"200px"}/>
        ) : (
          <>
          {dogsResult && dogsResult?.apiResults && dogsResult?.apiResults.length > 0 && (
            dogsResult.apiResults.map((dog, index) => (
              <Card {...dog} key={`api-${index}`} />
            ))
          )}
          {dogsResult && dogsResult?.dbResults && dogsResult?.dbResults.length > 0 && (
            dogsResult.dbResults.map((dog, index) => (
              <Card {...dog}key={`db-${index}`} />
            ))
          )}
          {dogsResult && dogsResult?.apiResults?.length === 0 && dogsResult?.dbResults?.length === 0 && dogs && dogs.map((dog, index) => (
            <Card {...dog} key={index} />
          ))}
        </>
        )
      }
    </div>
  )
}
