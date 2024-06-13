import React from 'react'

const Footer = () => {
  return <footer className="w-full p-8 bg-blue-500 flex justify-center items-center text-sm text-white/40">
   <p>Copyright ©️ Rimon Alqoshi {new Date().getFullYear()}</p>
  </footer>;
}

export default Footer