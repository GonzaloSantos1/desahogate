import React from 'react';
import {IconFlame, IconClockHour3} from '@tabler/icons';
import ChatInput from '../components/ChatInput';
import Link from 'next/link';
import CreateModal from '../components/CreateModal';
import CategoriesFilter from '../components/CategoriesFilter';

async function getData() {
  const res = await fetch('http://localhost:3000/api/getPosts');
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

function msToTime(duration) {
  let milliseconds = Math.floor((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24),
    days = Math.floor((duration / (1000 * 60 * 60 * 24)) % 365);

  if (minutes < 1) return 'Justo ahora';

  if (days < 1) return hours < 1 ? minutes + ' min' : hours + ' h ';

  if (days >= 1) return days == 1 ? days + ' día' : days + ' días';
}

const dateHandler = (postDate) => {
  const currentDate = Date.now();
  const postedDate = currentDate - postDate;

  return msToTime(postedDate);
};

export default async function Board() {
  const data = await getData();

  return (
    <div className='my-4 px-8 '>
      <CategoriesFilter />
      <CreateModal />
      <ul className='flex flex-wrap justify-center gap-6 md:gap-8'>
        {data.reverse().map((post) => (
          <>
            <li className='relative'>
              <Link href={`/board/${post.id}`}>
                <button className='w-full max-w-sm min-w-[326px] md:min-w-[384px] px-8 py-4 bg-gray-900/70 border border-action rounded-lg shadow-sm shadow-action'>
                  <p className='mt-2 font-medium tracking-wide'>{post.message}</p>
                  <div className='flex justify-between items-end mt-4 text-secondary font-medium'>
                    <div className='flex flex-col justify-start text-start'>
                      <p className='text-sm'>{post.comments.length} comentarios</p>
                      <p className='text-sm relative pl-5'>
                        <span className='inline-flex absolute left-0 top-0.5'>
                          <IconClockHour3 size={15} stroke={2} />
                        </span>
                        {dateHandler(post.created_at)}
                      </p>
                    </div>
                    <div className='flex flex-col items-end'>
                      <p href='#' className='font-semibold text-sm text-action' role='link'>
                        {post.username}
                      </p>
                      <p className='text-sm text-action-2 font-semibold'>{post.category}</p>
                    </div>
                  </div>
                </button>
              </Link>
            </li>
            {/* <ChatInput username={user.username} /> */}
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
