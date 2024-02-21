import React from 'react'
import Cards from '../Cards/Cards'
import "./Home.css"

export default function Home({ dogsResult }) {
  return (
    <div className='homeContenedor'>
      <Cards dogsResult = { dogsResult }></Cards>
    </div>
  )
}
