import React from 'react';
import Link from 'next/link';

function Footer() {
  return (
    <footer className='flex flex-col w-full md:flex-row md:justify-between items-center justify-center gap-4 pt-2 md:pb-6 pb-4 md:px-8 text-secondary font-medium select-none md:items-end'>
      <div className='flex justify-center md:justify-start gap-4 items-center'>
        <h1 className='font-bold text-4xl text-primary md:text-start'>desahógate</h1>
        <p className='hidden md:block mt-2 self-end'>2023. Todos los derechos reservados</p>
      </div>
      <ul className='flex flex-wrap justify-center md:justify-end gap-5 px-5'>
        <Link href={'/about'}>
          <li className='hover:text-action transition ease-in-out duration-300'>About</li>
        </Link>
        <Link href={'/contacto'}>
          <li className='hover:text-action transition ease-in-out duration-300'>Contacto</li>
        </Link>
        <Link href={'/legal'}>
          <li className='hover:text-action transition ease-in-out duration-300'>
            Términos y condiciones
          </li>
        </Link>
      </ul>
      <p className='text-center md:hidden'>
        Desahógate · 2023
        <br /> Todos los derechos reservados
      </p>
    </footer>
  );
}

export default Footer;
