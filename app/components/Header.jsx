'use client';
import Link from 'next/link';
import React, {useEffect, useState, useContext} from 'react';
import {useSession, signIn, signOut} from 'next-auth/react';
import UserContext from '../../lib/userContext';

const links = [
  {
    label: 'Home',
    route: '/',
  },
  {
    label: 'Board',
    route: '/board',
  },
];

function Header() {
  const {data: session} = useSession();
  const [modal, setModal] = useState(false);
  const user = useContext(UserContext);
  const username = user.user.username;

  return (
    <>
      <header
        className=' flex justify-center md:justify-between px-8 md:px-32 2xl:px-64 border-b border-gray-800 items-center h-[70px] md:h-14 tracking-wide backdrop-blur-md'
        onClick={() => setModal(false)}
      >
        <a href='/' className='font-bold text-4xl cursor-pointere select-none'>
          desahógate
        </a>
        <ul className='hidden md:flex justify-center gap-5 items-center text-lg'>
          {links.map(({label, route}) => (
            <li key={route}>
              <Link href={route}>{label}</Link>
            </li>
          ))}
          {!session ? (
            <button
              onClick={() => signIn()}
              className='bg-action/90 text-white px-5 text-md font-semibold tracking-wide py-1 rounded-md'
            >
              Entrar
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='icon icon-tabler icon-tabler-square-rounded-arrow-right inline-flex'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                strokeWidth='2'
                stroke='currentColor'
                fill='none'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
                <path d='M12 16l4 -4l-4 -4m-4 4h8m-4 -9c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z'></path>
              </svg>
            </button>
          ) : (
            <div className='flex justify-center gap-3' onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setModal(!modal)}
                className='flex justify-center gap-2 items-center text-action'
              >
                <p className=' font-semibold'>{username}</p>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='icon icon-tabler icon-tabler-square-rounded-chevron-down inline-flex'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  strokeWidth='2'
                  stroke='currentColor'
                  fill='none'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
                  <path d='M15 11l-3 3l-3 -3m3 -8c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z'></path>
                </svg>
              </button>
            </div>
          )}
        </ul>
      </header>
      {modal ? (
        <div className='font-medium absolute top-10 right-0 flex flex-col justify-center gap-2 px-4 py-2 bg-gray-800 z-50'>
          <Link href={'/account'} onClick={() => setModal(!modal)}>
            Mi cuenta
          </Link>
          <button onClick={() => signOut()} className='z-50'>
            Salir
          </button>
        </div>
      ) : (
        ''
      )}
    </>
  );
}

export default Header;
