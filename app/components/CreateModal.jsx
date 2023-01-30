'use client';
import React, {useState, useEffect, useContext} from 'react';
import {IconChevronDown, IconPlus} from '@tabler/icons';
import {useSession, signIn} from 'next-auth/react';
import UserContext from '../../lib/userContext';

function CreateModal({categories, animate}) {
  const [modal, setModal] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const [charactersCount, setCharactersCount] = useState(0);
  const [dropdown, setDropdown] = useState(false);
  const [category, setCategory] = useState('Selecciona una categoría');
  const [username, setUsername] = useState('Anónimo');
  const user = useContext(UserContext);
  const userId = user.user._id;
  const userProfileName = user.user.username;
  const [input, setInput] = useState('');
  const [loaderButton, setLoaderButton] = useState(false);

  const {data: session, status} = useSession();

  const countHandler = () => {
    const textarea = document.getElementById('textarea');
    setCharactersCount(textarea.value.length);
  };

  const loadingHandler = () => {
    setLoaderButton(true);
    setTimeout(() => window.location.reload(false), 2000);
  };

  const createPost = (e) => {
    e.preventDefault();
    if (!input || category == 'Selecciona una categoría') return;

    const messageToSend = input;

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
          userId,
        }),
      });

      const data = await res.json();
    };

    uploadPost();
    loadingHandler();
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
        className={`hidden md:block rounded-2xl px-5 py-2.5 text-center ease-in-out transition duration-300 text-primary bg-action/80 font-medium tracking-wide hover:bg-action hover:text-white text-sm md:m-4 md:animate-bounce fixed bottom-[1vh] right-0 z-50`}
        type='button'
      >
        Desahogarme
      </button>
      <button
        onClick={() => {
          setModal(!modal);
        }}
        className={` rounded-full p-1.5 md:hidden ${
          modal
            ? 'rotate-45 bg-[#101010] text-action border border-action'
            : 'bg-action border-action'
        }`}
        type='button'
      >
        <IconPlus size={28} stroke={2} />
      </button>
      {modal ? (
        !session ? (
          <div
            className='absolute top-16 md:-top-10 md:-left-7 z-50 w-screen overflow-x-hidden overflow-y-hidden h-[calc(100%-120px)] md:h-screen  bg-black/50 backdrop-blur-md flex justify-start items-center flex-col gap-6 md:gap-10'
            onClick={() => setModal(false)}
          >
            <div className='md:mt-5 font-medium text-lg text-start md:text-center md:text-md mx-auto px-5 md:px-44 flex flex-col gap-2'>
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
                      stroke='#FF4ECD'
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
            <div
              className='flex flex-col justify-center items-center gap-1 py-2 text-xl w-full h-full'
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => signIn()} className='text-action-blue font-semibold'>
                Inicia sesión
              </button>
              <p>para poder comentar</p>
            </div>
          </div>
        ) : (
          <div
            className='absolute top-16 md:-top-10 md:-left-7 z-50 w-screen overflow-x-hidden overflow-y-hidden h-[calc(100%-120px)] md:h-screen  bg-black/50 backdrop-blur-md flex justify-start items-center flex-col gap-6 md:gap-10'
            onClick={() => setModal(false)}
          >
            <div className='md:mt-5 font-medium text-lg text-start md:text-center md:text-md mx-auto px-5 md:px-44 flex flex-col gap-2'>
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
                      stroke='#FF4ECD'
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
              <form
                onSubmit={createPost}
                className='flex flex-col justify-center gap-5 items-center'
              >
                <div className='w-full max-w-sm px-5 pt-2 pb-4 bg-[#181818] rounded-lg shadow shadow-gray-500/50 text-lg md:text-md'>
                  <textarea
                    id='textarea'
                    value={input}
                    maxLength='250'
                    onChange={(e) => setInput(e.target.value)}
                    onKeyUp={countHandler}
                    type='text'
                    className='mt-2 font-medium tracking-wide bg-transparent w-full h-56 md:h-44 border-none focus:border-none focus:ring-0 placeholder:italic focus:outline-none resize-none text-primary'
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
                            : 'text-sm text-action font-semibold cursor-pointer flex items-center select-none border border-action pr-1 gap-0.5 rounded-md pl-2'
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
                                setUsername(userProfileName);
                                setUserDropdown(!userDropdown);
                              }}
                              className='text-sm text-action font-semibold px-4 py-0.5 relative cursor-pointer hover:bg-gray-700'
                            >
                              {userProfileName}
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
                              : `text-sm text-action-blue font-semibold cursor-pointer flex items-center select-none border border-sky-900 pr-1 gap-0.5 rounded-md pl-2`
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
                    className='text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-8 tracking-wide py-2 text-center mr-2 inline-flex items-center disabled:opacity-50'
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
                        <p>Publicando...</p>
                      </>
                    ) : (
                      <p>Publicar</p>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )
      ) : (
        ''
      )}
    </>
  );
}

export default CreateModal;
