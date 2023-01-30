'use client';
import React, {useState, useEffect, useRef, useContext} from 'react';
import {useSession} from 'next-auth/react';
import UserContext from '../../lib/userContext';

function Account() {
  const {data: session, status} = useSession();
  const user = useContext(UserContext);
  const [username, setUsername] = useState(user.user.username);
  const email = user.user.email;
  const [success, setSuccess] = useState(false);
  const [loaderButton, setLoaderButton] = useState(false);

  const editAccount = (e) => {
    e.preventDefault();
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

    const successHandler = () => {
      setLoaderButton(true);
      setTimeout(() => {
        setSuccess(true);
        setLoaderButton(false);
        setTimeout(() => {
          setSuccess(false);
        }, 5000);
      }, 2000);
    };

    saveAccount();
    successHandler();
  };

  if (!session)
    return (
      <p className='text-3xl font-medium h-full text-center flex items-center justify-center'>
        Entra en tu cuenta para ver esta página
      </p>
    );

  return (
    <div className=''>
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
          className='text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-8 tracking-wide py-2 text-center mr-2 inline-flex items-center'
        >
          {loaderButton ? (
            <>
              <svg
                ariaHidden='true'
                role='status'
                className='inline-flex w-4 h-4 mr-3 text-white animate-spin'
                viewBox='0 0 100 101'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                  fill='#E5E7EB'
                />
                <path
                  d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                  fill='currentColor'
                />
              </svg>
              <p>Guardando...</p>
            </>
          ) : (
            <p>Guardar</p>
          )}
        </button>
      </form>
      {success && (
        <div
          class='flex py-3 px-4 mb-4 text-sm text-primary bg-emerald-700 rounded-lg absolute bottom-0 right-5 gap-2 items-center'
          role='alert'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            class='icon icon-tabler icon-tabler-circle-check'
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
            <path d='M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0'></path>
            <path d='M9 12l2 2l4 -4'></path>
          </svg>
          <p className='font-semibold tracking-wide'>Cambios guardados correctamente</p>
        </div>
      )}
    </div>
  );
}

export default Account;
