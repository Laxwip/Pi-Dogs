import React, { useEffect, useState } from 'react';
import Card from '../Card/Card';
import { useSelector, useDispatch } from "react-redux";
import "./Cards.css"
import { getAllDogs } from '../../redux/actions/actions';


export default function Cards({setPage, page}) {

  const allDogs = useSelector((state) => state.allDogs);

  const dispatch = useDispatch()

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(getAllDogs()).then(() => {
          setLoading(false); // Cambiar a false cuando se hayan cargado los datos
        });
      } catch (error) {
        console.error("Error en los datos:", error)
      }
    }
    fetchData();
  }, [dispatch]);

  //+ PAGINADO
  
  const dogsPerPage = 8;

  const startIndex = (page - 1) * dogsPerPage;
  const endIndex = startIndex + dogsPerPage

  const nextPage = () => {
    setPage(page + 1)
  }

  const prevPage = () => {
    setPage(page - 1)
  }

  const goToFirstPage = () => {
    setPage(1);
  }

  const goToLastPage = () => {
    const totalPages = Math.ceil(allDogs.length / dogsPerPage);
    setPage(totalPages);
  }

  return (
    <div className='cardsContenedor'>
      {
        loading ? (
          <div className='contenedorCargando'>
            <img src="cargando.gif" alt="cargando" width={"200px"} className='cargando'/>
          </div>
          ) : (
          <>
          {allDogs.length > 0 ? (
            allDogs.slice(startIndex, endIndex).map((dog, index) => (
              <Card {...dog} key={index}></Card> 
            ))
          ) : (
            <h1>No hay coincidencias</h1>
          )}
          <div className='buttonPrevSig'>
          <button onClick={goToFirstPage} disabled={page === 1}>◄◄</button>
            <button onClick={prevPage} disabled={page === 1}>◄</button>
            <span className='textPage'>{page}</span>
            <button onClick={nextPage} disabled={endIndex >= allDogs.length}
            >►</button>
            <button onClick={goToLastPage} disabled={endIndex >= allDogs.length}>►►</button>
          </div>
        </>
        )
      }
    </div>
  )
}
