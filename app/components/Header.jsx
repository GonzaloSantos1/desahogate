'use client';
import Link from 'next/link';
import React, {useState, useContext, useEffect} from 'react';
import {useSession, signIn, signOut} from 'next-auth/react';
import UserContext from '../../lib/userContext';
import {IconChevronUp, IconChevronDown, IconMenu2, IconLayoutDashboard} from '@tabler/icons';
import {IconSunFilled, IconMoonFilled} from '@tabler/icons-react';
import {HiHome, HiUser} from 'react-icons/hi2';
import {BiLogIn, BiLogOut} from 'react-icons/bi';
import {IoFish} from 'react-icons/io5';
import {usePathname} from 'next/navigation';
import {useTheme} from 'next-themes';

function Header() {
  const {theme, setTheme} = useTheme();
  const [mounted, setMounted] = useState(false);
  const {data: session, status} = useSession();
  const [modal, setModal] = useState(false);
  const [hamburger, setHamburger] = useState(false);
  const user = useContext(UserContext);
  const username = user.user.username;
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSignIn = (e) => {
    e.preventDefault();
    signIn('google', {callbackUrl: `${process.env.NEXT_PUBLIC_URL}/board`});
  };

  const handleSignOut = (e) => {
    e.preventDefault();
    signOut();
  };

  return (
    <header
      className='bg-white dark:bg-palette-black backdrop-filter backdrop-blur-lg bg-opacity-30 dark:bg-opacity-70 sticky top-0 flex justify-between px-6 md:px-8 dark:shadow-palette-gray items-center h-[60px] md:h-16 tracking-wide z-30 shadow shadow-secondary'
      onClick={() => setModal(false)}
    >
      <a
        href='/'
        className='font-extrabold text-[38px] cursor-pointer select-none text-center font-[Quicksand] text-palette-gray dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-palette-purple dark:to-action'
      >
        desahógate
      </a>

      <nav className='hidden md:flex justify-center gap-5 items-center text-md font-medium text-gray-700 dark:text-white'>
        {/** THEME SWITCHER */}
        {mounted && (
          <>
            <input
              type='checkbox'
              id='toggle'
              checked={theme === 'light' ? false : true}
              onChange={() => {
                setTheme(theme === 'light' ? 'dark' : 'light');
              }}
            />
            <label htmlFor='toggle' className='switcher'></label>
          </>
        )}

        {/** THEME SWITCHER */}
        <a
          href='/'
          className={
            pathname == '/'
              ? 'text-action-purple dark:text-action'
              : 'hover:text-action-purple dark:hover:text-action transition ease-in-out duration-300'
          }
        >
          Home
        </a>
        <a
          href='/board'
          className={
            pathname == '/board'
              ? 'text-action-purple dark:text-action'
              : 'hover:text-action-purple dark:hover:text-action transition ease-in-out duration-300'
          }
        >
          Board
        </a>

        {status === 'unauthenticated' ? (
          <button
            onClick={handleSignIn}
            className='text-transparent bg-clip-text bg-gradient-to-l to-palette-purple from-action font-medium outline-none focus:outline-none ease-linear transition-all duration-150 flex items-center justify-center gap-2 tracking-wide border border-palette-purple rounded-xl px-3 py-1'
          >
            <p>Entrar</p>
            <span className='text-action/80'>
              <IoFish size={24} />
            </span>
          </button>
        ) : status === 'loading' ? (
          <div className='text-palette-purple animate-spin'>
            <IoFish size={24} />
          </div>
        ) : (
          <div className='flex justify-center gap-3' onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setModal(!modal)}
              className='text-transparent bg-clip-text bg-gradient-to-r from-palette-purple to-action font-bold outline-none focus:outline-none ease-linear transition-all duration-150 flex items-center justify-center gap-1 tracking-wide'
            >
              <p className='font-medium'>{username ?? user.user.email}</p>
              {!modal ? (
                <span className='text-action'>
                  <IconChevronDown size={20} stroke={3} />
                </span>
              ) : (
                <span className='text-action'>
                  <IconChevronUp size={20} stroke={3} />
                </span>
              )}
            </button>
          </div>
        )}
      </nav>
      <div
        className='flex md:hidden relative z-50 cursor-pointer'
        onClick={() => setHamburger(!hamburger)}
      >
        <IconMenu2
          stroke={3}
          size={28}
          color={`${hamburger ? '#c084fc' : theme === 'light' ? '#25282c' : '#fff'}`}
        />
        {hamburger && (
          <div className='font-medium absolute top-10 -right-2 flex flex-col justify-center items-start gap-3 py-5 bg-white dark:bg-palette-gray z-50 rounded-xl px-1 w-40 shadow dark:shadow-palette-black text-gray-700 dark:text-primary'>
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
            <button
              onClick={(e) => {
                e.stopPropagation();
                setTheme(theme === 'light' ? 'dark' : 'light');
              }}
              className='flex gap-2 items-center w-full pl-3 pr-4 '
            >
              {theme === 'light' ? (
                <>
                  <span className='text-[#ffa41b]'>
                    <IconSunFilled size={20} stroke={2} />
                  </span>
                  <p>Claro</p>
                </>
              ) : (
                <>
                  <IconMoonFilled size={20} stroke={2} />
                  <p>Oscuro</p>
                </>
              )}
            </button>
            <hr className='w-[90%] self-center border-gray-200 dark:border-primary border-[0.5px]' />
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
      {modal ? (
        <div className='font-medium absolute top-14 right-8 flex flex-col justify-center items-start py-1 bg-white dark:bg-palette-gray rounded-xl z-50 shadow shadow-secondary dark:shadow-palette-black'>
          <Link
            href={'/account'}
            onClick={() => setModal(!modal)}
            className='flex gap-2 items-center w-full ease-in-out duration-300 transition pl-3 pr-4 hover:bg-gray-100 dark:hover:bg-white/10 py-2 text-sm'
          >
            <HiUser size={20} stroke={2} />
            <p>Mi cuenta</p>
          </Link>
          <button
            onClick={handleSignOut}
            className='z-50 flex gap-2 items-center w-full text-action-red ease-in-out duration-300 transition pl-3 pr-4 hover:bg-gray-100 dark:hover:bg-white/10 py-2 text-sm'
          >
            <BiLogOut size={20} stroke={2} />
            <p>Salir</p>
          </button>
        </div>
      ) : (
        ''
      )}
    </header>
  );
}

export default Header;
