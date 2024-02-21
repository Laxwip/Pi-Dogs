import React, { useState } from 'react'

export default function NavBar({onSearch}) {
  const [name, setName] = useState("")

  const handleChange = (event) => {
    const newName = event.target.value
    setName(newName)
    console.log(newName);
    onSearch(newName)
  }

  // const handleKeyUp = () => {
  //   onSearch(name)
  // }

  return (
    <div className='navbarContenedor'>
      <input
      id='search_input'
      className='searchInput' 
      type="text" 
      placeholder='search'
      value={name}
      onChange={handleChange}
      // onKeyUp={handleKeyUp}
      /> 
    </div>
  )
}
