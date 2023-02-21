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
    signIn('google', {callbackUrl: `${process.env.NEXT_PUBLIC_URL}/board`});
  };

  const handleSignOut = (e) => {
    e.preventDefault();
    signOut();
  };

  return (
    <>
      <header
        className='flex justify-between px-6 md:px-8 border-b border-palette-gray items-center h-[60px] md:h-14 tracking-wide  z-30'
        onClick={() => setModal(false)}
      >
        <a
          href='/'
          className='font-bold text-4xl cursor-pointere select-none text-center font-[Quicksand]'
        >
          desahógate
        </a>

        <nav className='hidden md:flex justify-center gap-5 items-center text-sm font-medium'>
          <a href='/' className={pathname == '' ? 'text-action-blue' : ''}>
            Home
          </a>
          <a href='/board' className={pathname == '/board' ? 'text-action-blue' : ''}>
            Board
          </a>

          {!session ? (
            <button
              onClick={handleSignIn}
              className='bg-palette-purple text-primary px-5 text-sm font-medium py-[5px] rounded-xl flex gap-2 items-center ease-in-out duration-300'
            >
              <p>Entrar</p>
              <IoFish size={24} />
            </button>
          ) : (
            <div className='flex justify-center gap-3' onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setModal(!modal)}
                className='flex justify-center items-center text-primary border border-palette-gray rounded-xl pl-3 pr-2 py-1'
              >
                <p className='text-palette-purple font-medium -mt-0.5'>
                  {username ?? user.user.email}
                </p>
                {!modal ? <IconChevronDown size={20} /> : <IconChevronUp size={20} />}
              </button>
            </div>
          )}
        </nav>
        <div
          className='flex md:hidden relative z-50 cursor-pointer'
          onClick={() => setHamburger(!hamburger)}
        >
          <IconMenu2 stroke={3} size={28} color={`${hamburger ? '#9e69ff' : '#FFFF'}`} />
          {hamburger && (
            <div className='font-medium absolute top-8 -right-1 flex flex-col justify-center items-start gap-3 py-5 bg-palette-gray z-50 rounded-xl px-1 w-40 shadow shadow-palette-black'>
              <a
                href={'/'}
                className='flex gap-2 items-center w-full hover:text-action-blue ease-in-out duration-300 transition pl-3 pr-4'
              >
                <HiHome size={20} stroke={2} />
                <p>Home</p>
              </a>
              <Link
                href={'/board'}
                className='flex gap-2 items-center w-full hover:text-action-blue ease-in-out duration-300 transition pl-3 pr-4'
              >
                <IconLayoutDashboard size={20} stroke={2} />
                <p>Board</p>
              </Link>
              <hr className='w-[90%] self-center border-primary border-[0.5px]' />
              {user.user.email && (
                <Link
                  href={'/account'}
                  className='flex gap-2 items-center w-full hover:text-action-blue ease-in-out duration-300 transition pl-3 pr-4'
                >
                  <HiUser size={20} stroke={2} />
                  <p>Mi cuenta</p>
                </Link>
              )}
              {!user.user.email ? (
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
        </div>
      </header>
      {modal ? (
        <div className='font-medium absolute top-12 right-10 flex flex-col justify-center items-start py-1 bg-palette-gray rounded-xl z-50'>
          <Link
            href={'/account'}
            onClick={() => setModal(!modal)}
            className='flex gap-2 items-center w-full hover:text-action-blue ease-in-out duration-300 transition pl-3 pr-4 hover:bg-white/10 py-2 text-sm'
          >
            <HiUser size={20} stroke={2} />
            <p>Mi cuenta</p>
          </Link>
          <button
            onClick={handleSignOut}
            className='z-50 flex gap-2 items-center w-full text-action-red ease-in-out duration-300 transition pl-3 pr-4 hover:bg-white/10 py-2 text-sm'
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
