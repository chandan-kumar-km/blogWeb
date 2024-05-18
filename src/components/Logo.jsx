import React from 'react'

function Logo({ width = "100px" }) {
  return (
    <div className='w-8 h-8'>
      <img className='rounded-2xl' src="logo.png" alt="logo" />
    </div>
  )
}

export default Logo