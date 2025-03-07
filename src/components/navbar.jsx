import React from 'react'

const navbar = () => {
  return (
    <nav className='bg-blue-800 flex justify-between text-white py-2'>
        <div className="logo">
            <span className='font-bold text-2xl mx-8'>ITASKS</span>
        </div>
      <ul className='flex gap-8 mx-9' >
        <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
        <li className='list-none text-white'>Tasks</li>
      </ul>
    </nav>
  )
}

export default navbar
