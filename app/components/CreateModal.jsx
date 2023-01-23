'use client';
import React, {useState, useEffect} from 'react';
import {IconChevronDown} from '@tabler/icons';

function CreateModal({categories, animate}) {
  const [modal, setModal] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const [charactersCount, setCharactersCount] = useState(0);
  const [dropdown, setDropdown] = useState(false);
  const [category, setCategory] = useState('Selecciona una categoría');
  const [username, setUsername] = useState('username');
  const [input, setInput] = useState('');

  const countHandler = () => {
    const textarea = document.getElementById('textarea');
    setCharactersCount(textarea.value.length);
  };

  const createPost = (e) => {
    if (!input || category == 'Selecciona una categoría') return;

    const messageToSend = input;
    setInput('');

    const message = {
      message: messageToSend,
      created_at: Date.now(),
      username: username,
      category: category,
      comments: [],
    };

    const uploadPost = async () => {
      const res = await fetch('/api/addPost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
        }),
      });

      const data = await res.json();
      console.log('MENSAJE AÑADIDO >>>', data);
    };

    uploadPost();
  };

  useEffect(() => {
    modal
      ? (document.getElementById('body-div').style.overflow = 'hidden')
      : (document.getElementById('body-div').style.overflow = 'auto');
  }, [modal]);

  return (
    <>
      <button
        onClick={() => {
          setModal(!modal);
        }}
        className={`block rounded-md px-5 py-2.5 text-center ease-in-out transition duration-300 text-action border-2 border-action font-semibold tracking-wide mx-auto my-10 hover:border-pink-600 hover:bg-pink-600 hover:text-white `}
        type='button'
      >
        Desahogarme
      </button>
      {modal ? (
        <div
          className='absolute top-0 left-0 z-50 w-full p-4 overflow-x-hidden overflow-y-hidden h-screen md:inset-0 bg-white/10 backdrop-blur-md flex justify-start items-center flex-col gap-6 md:gap-10'
          onClick={() => setModal(false)}
        >
          <div className=' md:mt-5 font-medium text-md mx-auto px-5 md:px-44 flex flex-col gap-2'>
            <h1>
              Esto es una plataforma para desahogarse, donde la gente podrá comentar tu post e
              intentar ayudarte. Los comentarios provenientes de un perfil verificado
              <span className='inline-flex text-center px-1 items-center relative w-7'>
                <svg
                  fill='none'
                  height='20'
                  viewBox='0 0 24 24'
                  width='20'
                  xmlns='http://www.w3.org/2000/svg'
                  className='absolute -bottom-1'
                >
                  <path
                    d='M9.00012 12L11.0001 14L15.0001 10M7.83486 4.69705C8.55239 4.63979 9.23358 4.35763 9.78144 3.89075C11.0599 2.80123 12.9403 2.80123 14.2188 3.89075C14.7667 4.35763 15.4478 4.63979 16.1654 4.69705C17.8398 4.83067 19.1695 6.16031 19.3031 7.83474C19.3603 8.55227 19.6425 9.23346 20.1094 9.78132C21.1989 11.0598 21.1989 12.9402 20.1094 14.2187C19.6425 14.7665 19.3603 15.4477 19.3031 16.1653C19.1695 17.8397 17.8398 19.1693 16.1654 19.303C15.4479 19.3602 14.7667 19.6424 14.2188 20.1093C12.9403 21.1988 11.0599 21.1988 9.78144 20.1093C9.23358 19.6424 8.55239 19.3602 7.83486 19.303C6.16043 19.1693 4.83079 17.8397 4.69717 16.1653C4.63991 15.4477 4.35775 14.7665 3.89087 14.2187C2.80135 12.9402 2.80135 11.0598 3.89087 9.78132C4.35775 9.23346 4.63991 8.55227 4.69717 7.83474C4.83079 6.16031 6.16043 4.83067 7.83486 4.69705Z'
                    stroke='#ec4899'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2.5'
                  />
                </svg>
              </span>
              son de un profesional de la salud mental.
            </h1>
            <h1>
              Igualmente, recordamos que esta plataforma no susituye en ningún caso ayuda
              profesional.
            </h1>
          </div>
          <div className=' w-full h-full max-w-md md:h-auto' onClick={(e) => e.stopPropagation()}>
            <form onSubmit={createPost} className='flex flex-col justify-center gap-5 items-center'>
              <div className='w-full max-w-sm px-5 pt-2 pb-4 bg-gray-900 border border-action rounded-lg shadow-sm shadow-action'>
                <textarea
                  id='textarea'
                  value={input}
                  maxLength='250'
                  onChange={(e) => setInput(e.target.value)}
                  onKeyUp={countHandler}
                  type='text'
                  className='mt-2 font-medium tracking-wide bg-transparent w-full h-44 border-none focus:border-none focus:ring-0 placeholder:italic focus:outline-none resize-none text-primary'
                  placeholder='Escribe aquí lo que te preocupa...'
                />
                <div className='flex justify-between mt-2 items-end text-secondary font-medium'>
                  <p className='text-sm select-none'>{`${charactersCount}/250`}</p>
                  <div className='flex flex-col gap-1 items-end relative'>
                    <input id='username' value={username} type='radio' className='sr-only' />
                    <label
                      id='username-label'
                      htmlFor='username'
                      onClick={() => {
                        setUserDropdown(!userDropdown);
                        setDropdown(false);
                      }}
                      className={
                        userDropdown
                          ? 'text-sm text-primary font-semibold cursor-pointer flex items-center select-none border pr-1 gap-0.5 rounded-md pl-2 bg-action border-action'
                          : 'text-sm text-action font-semibold cursor-pointer flex items-center select-none border border-pink-800 pr-1 gap-0.5 rounded-md pl-2'
                      }
                    >
                      <p>{username}</p>
                      <IconChevronDown size={16} stroke={3} className='mt-0.5' />
                    </label>
                    {!userDropdown ? (
                      ''
                    ) : (
                      <ul className='absolute flex flex-col text-end bg-gray-800 rounded-md bottom-[51px] select-none overflow-hidden'>
                        {username == 'Anónimo' ? (
                          <li
                            onClick={() => {
                              setUsername('username');
                              setUserDropdown(!userDropdown);
                            }}
                            className='text-sm text-action font-semibold px-4 py-0.5 relative cursor-pointer hover:bg-gray-700'
                          >
                            username
                          </li>
                        ) : (
                          <li
                            onClick={() => {
                              setUsername('Anónimo');
                              setUserDropdown(!userDropdown);
                            }}
                            className='text-sm text-action font-semibold px-4 py-0.5 relative cursor-pointer hover:bg-gray-700'
                          >
                            Anónimo
                          </li>
                        )}
                      </ul>
                    )}

                    <input id='category' value={category} type='radio' className='sr-only' />
                    {category == 'Selecciona una categoría' ? (
                      <label
                        htmlFor='category'
                        id='category-label'
                        onClick={() => {
                          setDropdown(!dropdown);
                          setUserDropdown(false);
                        }}
                        className={
                          dropdown
                            ? `text-sm text-primary font-semibold cursor-pointer flex items-center select-none border bg-sky-900 border-sky-900 pr-1 gap-0.5 rounded-md pl-2`
                            : `text-sm text-action-2 font-semibold cursor-pointer flex items-center select-none border border-sky-900 pr-1 gap-0.5 rounded-md pl-2`
                        }
                      >
                        <p>{category}</p>
                        <IconChevronDown size={16} stroke={3} className='mt-0.5' />
                      </label>
                    ) : (
                      categories.map(({name, color}) => {
                        if (name == category) {
                          return (
                            <label
                              key={category}
                              htmlFor='category'
                              id='category-label'
                              onClick={() => {
                                setDropdown(!dropdown);
                                setUserDropdown(false);
                              }}
                              className={
                                dropdown
                                  ? `text-sm text-primary font-semibold cursor-pointer flex items-center select-none border bg-${color} border-${color} pr-1 gap-0.5 rounded-md pl-2`
                                  : `text-sm text-${color} font-semibold cursor-pointer flex items-center select-none border border-${color} pr-1 gap-0.5 rounded-md pl-2`
                              }
                            >
                              <p>{category}</p>
                              <IconChevronDown size={16} stroke={3} className='mt-0.5' />
                            </label>
                          );
                        }
                      })
                    )}

                    {!dropdown ? (
                      ''
                    ) : (
                      <ul className='absolute flex flex-col text-end bg-gray-800 rounded-md bottom-6 w-44 select-none overflow-hidden'>
                        {categories.map(({name, color}) =>
                          name == category ? (
                            ''
                          ) : (
                            <li
                              onClick={() => {
                                setCategory(name);
                                setDropdown(!dropdown);
                              }}
                              key={name}
                              className={`text-sm text-${color} font-semibold px-4 py-1 relative cursor-pointer hover:bg-gray-700`}
                            >
                              {name}
                            </li>
                          )
                        )}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
              <div className='flex justify-around px-10 w-full'>
                <button
                  type='submit'
                  disabled={!input || category == 'Selecciona una categoría'}
                  className=' text-primary tracking-wide bg-sky-500 font-semibold rounded-md text-sm py-2 px-12 items-center cursor-pointer disabled:opacity-50'
                >
                  Crear
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
}

export default CreateModal;
