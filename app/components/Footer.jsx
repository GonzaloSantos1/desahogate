import React from 'react';
import Link from 'next/link';

function Footer() {
  return (
    <footer className='flex flex-col w-full md:flex-row md:justify-between items-center justify-center gap-4 pt-2 md:pb-6 pb-4 md:px-8 text-secondary font-medium select-none'>
      <div className='flex justify-center md:justify-start gap-4 items-center'>
        <h1 className='font-bold text-4xl text-primary md:text-start'>desahógate</h1>
        <p className='hidden md:block mt-2'>2023. Todos los derechos reservados</p>
      </div>
      <ul className='flex justify-around md:justify-end md:gap-5 items-center px-5 text-center'>
        <Link href={'/about'}>
          <li className='hover:text-action transition ease-in-out duration-300'>About</li>
        </Link>
        <Link href={'/legal'}>
          <li className='hover:text-action transition ease-in-out duration-300'>
            Términos y condiciones
          </li>
        </Link>
        <Link href={'/contacto'}>
          <li className='hover:text-action transition ease-in-out duration-300'>Contacto</li>
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
