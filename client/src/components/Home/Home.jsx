import React from 'react'
import Cards from '../Cards/Cards'
import "./Home.css"

export default function Home({ dogsResult ,name}) {
  return (
    <div className='homeContenedor'>
      <Cards dogsResult = { dogsResult } name = {name}></Cards>
      <div className='espaciado'></div>
    </div>
  )
}
