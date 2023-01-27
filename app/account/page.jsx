'use client';
import React, {useState, useEffect, useRef, useContext} from 'react';
import {useSession} from 'next-auth/react';
import UserContext from '../../lib/userContext';

function Account() {
  const {data: session, status} = useSession();
  const user = useContext(UserContext);
  const [username, setUsername] = useState(user.user.username);
  const email = user.user.email;

  const editAccount = (e) => {
    if (!username) return;

    const saveAccount = async () => {
      const res = await fetch(`/api/patchUser/${email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
        }),
      });
    };

    saveAccount();
  };

  if (!session)
    return (
      <p className='text-3xl font-medium h-full text-center flex items-center justify-center'>
        Entra en tu cuenta para ver esta página
      </p>
    );

  return (
    <div>
      <form onSubmit={editAccount} className='flex justify-center flex-col gap-2 my-4 items-center'>
        <div className='relative max-w-lg w-80'>
          <input
            type='text'
            id='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='block px-2.5 pb-2.5 pt-4 w-full text-sm text-action bg-transparent rounded-lg border-1 border-secondary appearance-none  focus:outline-none focus:ring-0 border focus:border-action peer font-semibold'
            placeholder=' '
          />
          <label
            htmlFor='username'
            className='absolute text-sm text-secondary duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-black px-2 peer-focus:px-2 peer-focus:text-action peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1'
          >
            Nombre de usuario
          </label>
        </div>

        <button
          type='submit'
          disabled={!username}
          className=' text-primary tracking-wide bg-sky-500 font-semibold rounded-md text-sm py-2 px-12 items-center cursor-pointer disabled:opacity-50'
        >
          Guardar
        </button>
      </form>
    </div>
  );
}

export default Account;
