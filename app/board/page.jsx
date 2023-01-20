import React from 'react';
import {IconFlame} from '@tabler/icons';
import ChatInput from '../components/ChatInput';
import Link from 'next/link';

async function getData() {
  const res = await fetch('http://localhost:3000/api/getUsers');
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Board() {
  const data = await getData();
  return (
    <div className='my-4 px-8'>
      <ul className='flex justify-center flex-wrap gap-6 md:gap-8'>
        {data.map((user) => (
          <>
            <li className='relative'>
              <Link href={`/board/${user.posts[0].id}`}>
                <button className='w-full max-w-sm px-8 py-4 bg-gray-800 border border-pink-400/20 rounded-lg shadow-sm shadow-pink-900'>
                  <p className='mt-2 font-medium tracking-wide'>{user.posts[0].text}</p>

                  <div className='flex justify-between mt-2 items-end text-gray-400 font-medium'>
                    <p className='text-sm'>{user.posts[0].comments.length} comentarios</p>
                    <div className='flex flex-col items-end'>
                      <a href='#' className='font-semibold text-sm text-pink-400' role='link'>
                        {user.username}
                      </a>
                      <p className='text-sm text-cyan-600 font-semibold'>
                        {user.posts[0].category}
                      </p>
                    </div>
                  </div>
                </button>
              </Link>
            </li>
            <ChatInput username={user.username} />
          </>
        ))}
        {/* <li className='relative'>
          <button className='w-full max-w-sm px-8 py-4 bg-gray-800 border border-pink-400/20 rounded-lg shadow-sm shadow-pink-900'>
            <p className='mt-2 font-medium tracking-wide'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae dolores deserunt ea
              doloremque natus error, rerum quas odio quaerat nam ex commodi hic, suscipit in a
              veritatis pariatur minus consequuntur!
            </p>

            <div className='flex justify-between mt-2 items-end text-gray-400 font-medium'>
              <p className='text-sm'>24 comentarios</p>
              <div className='flex flex-col items-end'>
                <a href='#' className='font-semibold text-sm text-pink-400' role='link'>
                  Anónimo
                </a>
                <p className='text-sm text-cyan-600 font-semibold'>Relaciones de pareja</p>
              </div>
            </div>
          </button>
        </li>
        <li className='relative'>
          <button className='w-full max-w-sm px-8 py-4 bg-gray-800 border-2 border-pink-400/20 rounded-lg shadow-sm shadow-pink-900'>
            <p className='mt-2  font-medium tracking-wide'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae dolores deserunt ea
              doloremque natus error, rerum quas odio quaerat nam ex commodi hic, suscipit in a
              veritatis pariatur minus consequuntur!
            </p>

            <div className='flex justify-between mt-2 items-end text-gray-400 font-medium'>
              <p className='text-sm'>24 comentarios</p>
              <div className='flex flex-col items-end'>
                <a href='#' className='font-semibold text-sm text-pink-400' role='link'>
                  Anónimo
                </a>
                <p className='text-sm text-cyan-600 font-semibold'>Relaciones de pareja</p>
              </div>
            </div>
          </button>
        </li>
        <li className='relative'>
          <button className='w-full max-w-sm px-8 py-4 bg-gray-800 border border-pink-400/20 rounded-lg shadow-sm shadow-pink-900'>
            <p className='mt-2  font-medium tracking-wide'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae dolores deserunt ea
              doloremque natus error, rerum quas odio quaerat nam ex commodi hic, suscipit in a
              veritatis pariatur minus consequuntur!Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Quae dolores deserunt ea doloremque natus error, rerum quas odio
              quaerat nam ex commodi hic, suscipit in a veritatis pariatur minus consequuntur!
            </p>

            <div className='flex justify-between mt-2 items-end text-gray-400 font-medium'>
              <p className='text-sm'>24 comentarios</p>
              <div className='flex flex-col items-end'>
                <a href='#' className='font-semibold text-sm text-pink-400' role='link'>
                  Anónimo
                </a>
                <p className='text-sm text-cyan-600 font-semibold'>Relaciones de pareja</p>
              </div>
            </div>
          </button>
        </li>
        <li className='relative'>
          <span className='absolute text-5xl -left-4 -top-5'>
            <IconFlame size={60} className='animate-pulse text-red-500' />
          </span>
          <button className='w-full max-w-sm px-8 py-4 bg-gray-800 border border-pink-400/20 rounded-lg shadow-sm shadow-pink-900'>
            <p className='mt-2  font-medium tracking-wide'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae dolores deserunt ea
              doloremque natus error, rerum quas odio quaerat nam ex commodi hic, suscipit in a
              veritatis pariatur minus consequuntur! Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Quae dolores deserunt ea doloremque natus error, rerum quas odio
              quaerat nam ex commodi hic, suscipit in a veritatis
            </p>

            <div className='flex justify-between mt-2 items-end text-gray-400 font-medium'>
              <p className='text-sm'>24 comentarios</p>
              <div className='flex flex-col items-end'>
                <a href='#' className='font-semibold text-sm text-pink-400' role='link'>
                  Anónimo
                </a>
                <p className='text-sm text-cyan-600 font-semibold'>Relaciones de pareja</p>
              </div>
            </div>
          </button>
        </li>
        <li className='relative'>
          <span className='absolute text-5xl -left-4 -top-5'>
            <IconFlame size={60} className='animate-pulse text-red-500' />
          </span>
          <button className='w-full max-w-sm px-8 py-4 bg-gray-800 border border-pink-400/20 rounded-lg shadow-sm shadow-pink-900'>
            <p className='mt-2  font-medium tracking-wide'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae dolores deserunt ea
              doloremque natus error,Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
              dolores deserunt ea doloremque natus error, rerum quas odio quaerat nam ex commodi
              hic, suscipit in a veritatis pariatur minus consequuntur!
            </p>

            <div className='flex justify-between mt-2 items-end text-gray-400 font-medium'>
              <p className='text-sm'>24 comentarios</p>
              <div className='flex flex-col items-end'>
                <a href='#' className='font-semibold text-sm text-pink-400' role='link'>
                  Anónimo
                </a>
                <p className='text-sm text-cyan-600 font-semibold'>Relaciones de pareja</p>
              </div>
            </div>
          </button>
        </li>
        <li className='relative'>
          <button className='w-full max-w-sm px-8 py-4 bg-gray-800 border border-pink-400/20 rounded-lg shadow-sm shadow-pink-900'>
            <p className='mt-2  font-medium tracking-wide'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae dolores deserunt ea
              doloremque natus error, rerum quas odio quaerat nam ex commodi hic, suscipit in a
              veritatis pariatur minus consequuntur! Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Quae dolores deserunt ea doloremque natus error, rerum quas odio
              quaerat nam ex commodi hic, suscipit in a veritatis pariatur minus consequuntur! Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Quae dolores deserunt ea doloremque
              natus error, rerum quas odio quaerat nam ex commodi hic, suscipit in a veritatis
              pariatur minus consequuntur!
            </p>

            <div className='flex justify-between mt-2 items-end text-gray-400 font-medium'>
              <p className='text-sm'>24 comentarios</p>
              <div className='flex flex-col items-end'>
                <a href='#' className='font-semibold text-sm text-pink-400' role='link'>
                  Anónimo
                </a>
                <p className='text-sm text-cyan-600 font-semibold'>Relaciones de pareja</p>
              </div>
            </div>
          </button>
        </li>
        <li className='relative'>
          <span className='absolute text-5xl -left-4 -top-5'>
            <IconFlame size={60} className='animate-pulse text-red-500' />
          </span>
          <button className='w-full max-w-sm px-8 py-4 bg-gray-800 border border-pink-400/20 rounded-lg shadow-sm shadow-pink-900'>
            <p className='mt-2  font-medium tracking-wide'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae dolores deserunt ea
              doloremque natus error, rerum quas odio quaerat nam ex commodi hic, suscipit in a
              veritatis pariatur minus consequuntur!
            </p>

            <div className='flex justify-between mt-2 items-end text-gray-400 font-medium'>
              <p className='text-sm'>24 comentarios</p>
              <div className='flex flex-col items-end'>
                <a href='#' className='font-semibold text-sm text-pink-400' role='link'>
                  Anónimo
                </a>
                <p className='text-sm text-cyan-600 font-semibold'>Relaciones de pareja</p>
              </div>
            </div>
          </button>
        </li>
        <li className='relative'>
          <button className='w-full max-w-sm px-8 py-4 bg-gray-800 border border-pink-400/20 rounded-lg shadow-sm shadow-pink-900'>
            <p className='mt-2  font-medium tracking-wide'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae dolores deserunt ea
              doloremque natus error, rerum quas odio quaerat nam ex commodi hic, suscipit in a
              veritatis pariatur minus consequuntur!
            </p>

            <div className='flex justify-between mt-2 items-end text-gray-400 font-medium'>
              <p className='text-sm'>24 comentarios</p>
              <div className='flex flex-col items-end'>
                <a href='#' className='font-semibold text-sm text-pink-400' role='link'>
                  Anónimo
                </a>
                <p className='text-sm text-cyan-600 font-semibold'>Relaciones de pareja</p>
              </div>
            </div>
          </button>
        </li>
        <li className='relative'>
          <button className='w-full max-w-sm px-8 py-4 bg-gray-800 border border-pink-400/20 rounded-lg shadow-sm shadow-pink-900'>
            <p className='mt-2  font-medium tracking-wide'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae dolores deserunt ea
              doloremque natus error, rerum quas odio quaerat nam ex commodi hic, suscipit in a
              veritatis pariatur minus consequuntur!
            </p>

            <div className='flex justify-between mt-2 items-end text-gray-400 font-medium'>
              <p className='text-sm'>24 comentarios</p>
              <div className='flex flex-col items-end'>
                <a href='#' className='font-semibold text-sm text-pink-400' role='link'>
                  Anónimo
                </a>
                <p className='text-sm text-cyan-600 font-semibold'>Relaciones de pareja</p>
              </div>
            </div>
          </button>
        </li>
        <li className='relative'>
          <button className='w-full max-w-sm px-8 py-4 bg-gray-800 border border-pink-400/20 rounded-lg shadow-sm shadow-pink-900'>
            <p className='mt-2  font-medium tracking-wide'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae dolores deserunt ea
              doloremque natus error, rerum quas odio quaerat nam ex commodi hic, suscipit in a
              veritatis pariatur minus consequuntur!
            </p>

            <div className='flex justify-between mt-2 items-end text-gray-400 font-medium'>
              <p className='text-sm'>24 comentarios</p>
              <div className='flex flex-col items-end'>
                <a href='#' className='font-semibold text-sm text-pink-400' role='link'>
                  Anónimo
                </a>
                <p className='text-sm text-cyan-600 font-semibold'>Relaciones de pareja</p>
              </div>
            </div>
          </button>
        </li> */}
      </ul>
    </div>
  );
}
