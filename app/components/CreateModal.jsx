'use client';
import React, {useState} from 'react';
import {IconChevronDown} from '@tabler/icons';

function CreateModal() {
  const [input, setInput] = useState('');
  const [modal, setModal] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const [charactersCount, setCharactersCount] = useState(0);
  const [dropdown, setDropdown] = useState(false);
  const [category, setCategory] = useState('Selecciona una categoría');
  const [username, setUsername] = useState('username');

  const categories = ['Relaciones de pareja', 'Trabajo', 'Familia', 'Amigos', 'Otros'];

  const countHandler = () => {
    const textarea = document.getElementById('textarea');
    setCharactersCount(textarea.value.length);
  };

  const createPost = (e) => {
    e.preventDefault();

    if (!input) return;

    const messageToSend = input;
    setInput('');

    const message = {
      message: messageToSend,
      created_at: Date.now(),
      username: username,
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

  return (
    <>
      <button
        onClick={() => setModal(!modal)}
        className='block rounded-full px-5 py-2.5 text-center hover:text-action ease-in-out transition bg-gray-900/70 hover:bg-transparent text-primary border-2 border-action font-semibold tracking-wide mx-auto my-10'
        type='button'
      >
        Desahogarme
      </button>
      {modal ? (
        <div
          className='absolute top-0 left-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto h-modal md:h-screen md:inset-0 bg-white/10 backdrop-blur-md flex justify-center items-center'
          onClick={() => setModal(false)}
        >
          <div className=' w-full h-full max-w-md md:h-auto' onClick={(e) => e.stopPropagation()}>
            <div className='flex flex-col justify-center gap-10 items-center'>
              <div className='w-full max-w-sm px-5 pt-2 pb-4 bg-gray-900 border border-action rounded-lg shadow-sm shadow-action'>
                <textarea
                  id='textarea'
                  dw
                  maxLength='250'
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
                      for='username'
                      onClick={() => {
                        setUserDropdown(!userDropdown);
                        setDropdown(false);
                      }}
                      className='text-sm text-action font-semibold cursor-pointer flex items-center select-none border border-pink-800 pr-1 gap-0.5 rounded-md pl-2'
                    >
                      <p>{username}</p>
                      <IconChevronDown size={16} stroke={3} className='mt-0.5' />
                    </label>
                    {!userDropdown ? (
                      ''
                    ) : (
                      <ul className='absolute flex flex-col text-end bg-gray-800 rounded-md bottom-12 select-none overflow-hidden'>
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
                    <label
                      for='category'
                      onClick={() => {
                        setDropdown(!dropdown);
                        setUserDropdown(false);
                      }}
                      className='text-sm text-action-2 font-semibold cursor-pointer flex items-center select-none border border-sky-800 pr-1 gap-0.5 rounded-md pl-2'
                    >
                      <p>{category}</p>
                      <IconChevronDown size={16} stroke={3} className='mt-0.5' />
                    </label>

                    {!dropdown ? (
                      ''
                    ) : (
                      <ul className='absolute flex flex-col text-end bg-gray-800 rounded-md bottom-6 w-44 select-none overflow-hidden'>
                        {categories.map((e) =>
                          e == category ? (
                            ''
                          ) : (
                            <li
                              onClick={() => {
                                setCategory(e);
                                setDropdown(!dropdown);
                              }}
                              key={e}
                              className='text-sm text-action-2 font-semibold px-4 py-1 relative cursor-pointer hover:bg-gray-700'
                            >
                              {e}
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
                  onClick={() => setModal(!modal)}
                  className=' text-primary border border-action-2 rounded-lg text-sm p-1.5 items-center '
                >
                  Cancelar
                </button>
                <button
                  onClick={() => setModal(!modal)}
                  className=' text-primary border border-action-2 rounded-lg text-sm p-1.5 items-center '
                >
                  Publicar
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
}

export default CreateModal;
