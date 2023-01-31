'use client';
import Link from 'next/link';
import Image from 'next/image';
import React, {useEffect, useState, useContext} from 'react';
import {useSession, signIn, signOut} from 'next-auth/react';
import UserContext from '../../lib/userContext';
import {IconUser, IconLogout, IconChevronUp, IconChevronDown, IconFishBone} from '@tabler/icons';
import {usePathname, useRouter} from 'next/navigation';

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
  const pathname = usePathname();

  return (
    <>
      <header
        className=' flex justify-center md:justify-between px-8 border-b border-gray-800 items-center h-[60px] md:h-14 tracking-wide backdrop-blur-md'
        onClick={() => setModal(false)}
      >
        <a href='/' className='font-bold text-4xl cursor-pointere select-none text-center'>
          desahógate
        </a>

        <ul className='hidden md:flex justify-center gap-5 items-center text-md font-medium'>
          {links.map(({label, route}) => (
            <li key={route} className={pathname == route ? 'text-action-blue' : ''}>
              <Link href={route}>{label}</Link>
            </li>
          ))}
          {!session ? (
            <button
              onClick={() => signIn({callbackUrl: `${window.location.origin}/board`})}
              className='bg-action/80 text-white px-5 text-md font-medium py-[6px] rounded-xl flex gap-2 items-center hover:bg-action ease-in-out duration-300'
            >
              <p className='-mt-[3px]'>Entrar</p>
              <IconFishBone size={24} stroke={1.5} className='-mt-[2px]' />
            </button>
          ) : (
            <div className='flex justify-center gap-3' onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setModal(!modal)}
                className='flex justify-center items-center text-primary border border-secondary/60 rounded-full pl-3 pr-2 py-1'
              >
                <p className='text-action font-semibold'>{username}</p>
                {!modal ? <IconChevronDown size={24} /> : <IconChevronUp size={24} />}
              </button>
            </div>
          )}
        </ul>
      </header>
      {modal ? (
        <div className='font-medium absolute top-12 right-10 flex flex-col justify-center items-start gap-2 pl-4 pr-8 py-2 bg-[#1A1A1A] z-50 rounded-xl'>
          <Link
            href={'/account'}
            onClick={() => setModal(!modal)}
            className='flex gap-2 items-center  hover:text-action-blue ease-in-out duration-300 transition'
          >
            <IconUser size={20} stroke={2} />
            <p>Mi cuenta</p>
          </Link>
          <button
            onClick={() => signOut({callbackUrl: `${window.location.origin}/board`})}
            className='z-50 flex gap-2 items-center hover:text-action-red ease-in-out duration-300 transition'
          >
            <IconLogout size={20} stroke={2} />
            <p>Salir</p>
          </button>
        </div>
      ) : (
        ''
      )}
    </>
  );
}

export default Header;
