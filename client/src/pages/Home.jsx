import React from 'react'
import Header from '../components/Header'
function Home() {
  return (
    <div>
      <Header />
      <div className='px-4 py-12 max-w-2xl mx-auto'>
      <h1  className='text-3xl font-bold mb-4 text-slate-700 '>Welcome to my CURD application</h1>
    </div>
    </div>
    
  )
}

export default Home