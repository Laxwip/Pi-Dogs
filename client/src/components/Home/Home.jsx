import React from 'react'
import Cards from '../Cards/Cards'
import "./Home.css"

export default function Home({setPage, page}) {
  return (
    <div className='homeContenedor'>
      <Cards setPage={setPage} page={page}></Cards>
      <div className='espaciado'></div>
    </div>
  )
}
