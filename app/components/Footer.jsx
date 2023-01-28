'use client';
import React, {useEffect, useState} from 'react';
import {IconHome, IconLayoutDashboard, IconUser, IconStar, IconPlus} from '@tabler/icons';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import CreateModal from './CreateModal';

const categories = [
  {name: 'Relaciones de pareja', color: 'action-red', selected: false},
  {name: 'Trabajo', color: 'action-yellow', selected: false},
  {name: 'Familia', color: 'action-blue', selected: false},
  {name: 'Amigos', color: 'action-green', selected: false},
  {name: 'Otros', color: 'action-purple', selected: false},
];

const Footer = () => {
  const pathname = usePathname();
  const [selected, setSelected] = useState(pathname);

  return (
    <nav className='border-t border-gray-800'>
      <ul className='flex justify-around items-center md:hidden h-14 text-xs px-2'>
        <li
          className={`flex flex-col ${selected == '/' && 'text-action'}`}
          onClick={() => setSelected('/')}
        >
          <Link href='/'>
            <div className='flex flex-col items-center justify-center'>
              <IconHome size={28} stroke={1} />
              <p>Home</p>
            </div>
          </Link>
        </li>
        <li
          className={`flex flex-col ${selected == '/board' && 'text-action'}`}
          onClick={() => setSelected('/board')}
        >
          <Link href='/board'>
            <div className='flex flex-col items-center justify-center'>
              <IconLayoutDashboard size={28} stroke={1} />
              <p>Board</p>
            </div>
          </Link>
        </li>
        <li className='flex flex-col'>
          <CreateModal categories={categories} />
        </li>
        <li
          className={`flex flex-col ${selected == '#' && 'text-action'}`}
          onClick={() => setSelected('#')}
        >
          <Link href='#'>
            <div className='flex flex-col items-center justify-center'>
              <IconStar size={28} stroke={1} />
              <p>Favoritos</p>
            </div>
          </Link>
        </li>
        <li
          className={`flex flex-col ${selected == '#' && 'text-action'}`}
          onClick={() => setSelected('#')}
        >
          <Link href='#'>
            <div className='flex flex-col items-center justify-center'>
              <IconUser size={28} stroke={1} />
              <p>Perfil</p>
            </div>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Footer;
