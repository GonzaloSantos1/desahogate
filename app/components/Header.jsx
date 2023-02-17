'use client';
import Link from 'next/link';
import React, {useState, useContext} from 'react';
import {useSession, signIn, signOut} from 'next-auth/react';
import UserContext from '../../lib/userContext';
import {IconChevronUp, IconChevronDown, IconMenu2, IconLayoutDashboard} from '@tabler/icons';
import {HiHome, HiUser} from 'react-icons/hi2';
import {BiLogIn, BiLogOut} from 'react-icons/bi';
import {IoFish} from 'react-icons/io5';
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
  const [hamburger, setHamburger] = useState(false);
  const user = useContext(UserContext);
  const username = user.user.username;
  const pathname = usePathname();

  const handleSignIn = (e) => {
    e.preventDefault();
    signIn('google', {callbackUrl: 'http://localhost:3000/board'});
  };

  const handleSignOut = (e) => {
    e.preventDefault();
    signOut();
  };

  return (
    <>
      <header
        className='flex justify-between px-6 md:px-8 border-b border-gray-800 items-center h-[60px] md:h-14 tracking-wide backdrop-blur-md z-50'
        onClick={() => setModal(false)}
      >
        <a href='/' className='font-bold text-4xl cursor-pointere select-none text-center'>
          desahógate
        </a>

        <ul className='hidden md:flex justify-center gap-5 items-center text-md font-semibold'>
          {links.map(({label, route}) => (
            <li key={route} className={pathname == route ? 'text-action-blue' : ''}>
              <Link href={route}>{label}</Link>
            </li>
          ))}
          {!session ? (
            <button
              onClick={handleSignIn}
              className='bg-action/90 text-white px-5 text-md font-semibold py-[5px] rounded-xl flex gap-2 items-center hover:bg-action ease-in-out duration-300'
            >
              <p>Entrar</p>
              <IoFish size={24} />
            </button>
          ) : (
            <div className='flex justify-center gap-3' onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setModal(!modal)}
                className='flex justify-center items-center text-primary border border-secondary/60 rounded-full pl-3 pr-2 py-1'
              >
                <p className='text-action font-semibold'>{username ?? user.user._id}</p>
                {!modal ? <IconChevronDown size={20} /> : <IconChevronUp size={20} />}
              </button>
            </div>
          )}
        </ul>
        <button className='flex md:hidden relative' onClick={() => setHamburger(!hamburger)}>
          <IconMenu2 stroke={3} size={28} color={`${hamburger ? '#FF4ECD' : '#FFFF'}`} />
          {hamburger && (
            <div className='font-medium absolute top-8 -right-1 flex flex-col justify-center items-start gap-3 py-5 bg-[#1A1A1A] z-50 rounded-xl px-1 border border-action'>
              {user.user.username && (
                <Link
                  href={'/account'}
                  className='flex gap-2 items-center w-full hover:text-action-blue ease-in-out duration-300 transition pl-3 pr-4'
                >
                  <HiUser size={20} stroke={2} color='#FF4ECD' />
                  <p className='text-action'>{user.user.username}</p>
                </Link>
              )}
              <Link
                href={'/'}
                className='flex gap-2 items-center w-full hover:text-action-blue ease-in-out duration-300 transition pl-3 pr-4'
              >
                <HiHome size={20} stroke={2} />
                <p>Home</p>
              </Link>
              <Link
                href={'/board'}
                className='flex gap-2 items-center w-full hover:text-action-blue ease-in-out duration-300 transition pl-3 pr-4'
              >
                <IconLayoutDashboard size={20} stroke={2} />
                <p>Board</p>
              </Link>
              {!user.user.username ? (
                <button
                  onClick={handleSignIn}
                  className='z-50 flex gap-2 items-center w-full hover:text-action-red ease-in-out duration-300 transition pl-3 pr-4'
                >
                  <BiLogIn size={20} stroke={2} />
                  <p>Entrar</p>
                </button>
              ) : (
                <button
                  onClick={handleSignOut}
                  className='z-50 flex gap-2 items-center w-full hover:text-action-red ease-in-out duration-300 transition pl-3 pr-4'
                >
                  <BiLogOut size={20} stroke={2} color='#F4256D' />
                  <p className='text-action-red'>Salir</p>
                </button>
              )}
            </div>
          )}
        </button>
      </header>
      {modal ? (
        <div className='font-medium absolute top-12 right-10 flex flex-col justify-center items-start gap-2 py-2 bg-[#1A1A1A] rounded-xl'>
          <Link
            href={'/account'}
            onClick={() => setModal(!modal)}
            className='flex gap-2 items-center w-full hover:text-action-blue ease-in-out duration-300 transition pl-3 pr-4'
          >
            <HiUser size={20} stroke={2} />
            <p>Mi cuenta</p>
          </Link>
          <button
            onClick={handleSignOut}
            className='z-50 flex gap-2 items-center w-full hover:text-action-red ease-in-out duration-300 transition pl-3 pr-4'
          >
            <BiLogOut size={20} stroke={2} />
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
