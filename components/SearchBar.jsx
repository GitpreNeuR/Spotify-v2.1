import React from 'react'
import {SearchIcon} from '@heroicons/react/outline'

function SearchBar() {
  return (
    <div style={{backgroundColor:`white`,minWidth:`70px`,height:`50px`,color:`grey`,flex:`0.5`,padding:`10px`,display:`flex`,borderRadius:`50px`,alignItems:`center`,position:`relative`}}>
    <SearchIcon style={{cursor:`pointer`,fontWeight:`600`,color:`black`}} className="h-10 w-10" />
    <input type="text" placeholder="Search for albums,songs,artists.." 
    style={{border:`none`,width:`500px`,backgroundColor:`transparent`,outline:`none`}}/>

</div>  )
}

export default SearchBar