'use client';
import Link from 'next/link';
import React from 'react';

const links = [
  {
    label: 'Home',
    route: '/',
  },
  {
    label: 'Board',
    route: '/board',
  },
  {
    label: 'Sign in',
    route: '#',
  },
];

function Header() {
  return (
    <header className='sticky flex justify-center md:justify-between px-8 md:px-32 2xl:px-64 border-b border-gray-800 items-center h-[70px] md:h-20 tracking-wide backdrop-blur-md'>
      <a href='/' className='font-bold text-4xl cursor-pointere select-none'>
        desahógate
      </a>
      <ul className='hidden md:flex justify-center gap-5 items-center text-lg'>
        {links.map(({label, route}) => (
          <li key={route}>
            <Link href={route}>{label}</Link>
          </li>
        ))}
      </ul>
    </header>
  );
}

export default Header;
