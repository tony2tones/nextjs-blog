'use client'
import {  NavItems } from './ui/navItem';

export default function NavBar() {
  const logout = async () => {
    await fetch("/api/logout",{method:'POST'})
    window.location.href = "/login"; 
  }
  
  return (
    <header>
      <div className='w-full flex justify-between bg-slate-800 items-center'>
        <NavItems />
          <div className='p-4 text-white'>
          <button onClick={logout}>logout</button>
          </div>
      </div>
    </header>
  )
}