import React from 'react'
import { TbPointFilled } from "react-icons/tb";

const AdminDashboard = () => {
  
  return (
    <div className='bg-secondary-900 p-8 rounded-xl w-full'>
      <h1 className='text-4xl'> ¡Bienvenido al Panel de Control Administrativo! </h1>
      <hr className='my-8 border-gray-500'/>
    <ul className='text-[17px]'>
      <li className='flex gap-2'><TbPointFilled className='text-primary'/>Tu plataforma central para gestionar todas las actividades administrativas de nuestra página de tatuajes.</li>
      <li className='flex gap-2'><TbPointFilled className='text-primary' />Gracias por contribuir al éxito y la profesionalidad de nuestra comunidad.</li>
      <li className='flex gap-2'><TbPointFilled className='text-primary' />Explora las herramientas y funciones disponibles para optimizar la gestión de contenido.</li>
    </ul>
  </div>
  )
}

export default AdminDashboard