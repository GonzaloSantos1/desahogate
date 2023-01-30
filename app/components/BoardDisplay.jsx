'use client';
import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import {IconFlame, IconClockHour3} from '@tabler/icons';
import CategoriesFilter from './CategoriesFilter';
import EmptyMessage from './EmptyMessage';
import CreateModal from './CreateModal';
import LoadingComponent from './LoadingComponent';
import {usePathname} from 'next/navigation';

function msToTime(duration) {
  let milliseconds = Math.floor((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24),
    days = Math.floor((duration / (1000 * 60 * 60 * 24)) % 365);

  if (days < 1 && hours < 1 && minutes < 1) return 'justo ahora';

  if (days < 1) return hours < 1 ? minutes + ' min' : hours + ' h ';

  if (days >= 1) return days == 1 ? days + ' día' : days + ' días';
}

const dateHandler = (postDate) => {
  const currentDate = Date.now();
  const postedDate = currentDate - postDate;

  return msToTime(postedDate);
};

export default function BoardDisplay({data, categories}) {
  const [category, setCategory] = useState(null);
  const [dataFetched, setDataFetched] = useState(data);

  useEffect(() => {
    let interval = setInterval(() => {
      fetch(`http://localhost:3000/api/getPosts`)
        .then((res) => res.json())
        .then((data) => {
          setDataFetched(data);
        });
    }, 10000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleCategory = (cat) => setCategory(cat);

  return (
    <div className='mt-5 md:mt-10 relative'>
      <CategoriesFilter categories={categories} handleCategory={handleCategory} />
      {!dataFetched ? (
        <LoadingComponent textSize={'3xl'} text={'Cargando posts...'} size={300} />
      ) : !dataFetched.length ? (
        <EmptyMessage categories={categories} />
      ) : (
        <>
          <div className='hidden md:block fixed bottom-[1vh] right-0'>
            <CreateModal categories={categories} />
          </div>
          <ul className='flex flex-wrap justify-center gap-3 md:gap-6 mt-3 md:mt-6 mb-3 overflow-y-scroll'>
            {category !== ''
              ? dataFetched
                  .filter((e) => e.category == category)
                  .reverse()
                  .map((post) => (
                    <li className='relative' key={post._id}>
                      <Link href={`/board/${post._id}`}>
                        <button className='w-full max-w-[340px] md:max-w-sm min-w-[340px] md:min-w-[384px] p-4 bg-[#181818] rounded-lg shadow shadow-gray-500/50 md:hover:-translate-y-1 md:ease-in-out md:transition'>
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
                              {categories.map(({name, color}) => {
                                if (post.category == name) {
                                  return (
                                    <p key={name} className={`text-sm text-${color} font-semibold`}>
                                      {post.category}
                                    </p>
                                  );
                                }
                              })}
                            </div>
                          </div>
                        </button>
                      </Link>
                    </li>
                  ))
              : [...dataFetched].reverse().map((post) => (
                  <li className='relative' key={post._id}>
                    <Link href={`/board/${post._id}`}>
                      <button className='w-full max-w-[340px] md:max-w-sm min-w-[340px] md:min-w-[384px] p-4 bg-[#181818] rounded-lg shadow shadow-gray-500/50 md:hover:-translate-y-1 md:ease-in-out md:transition'>
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
                            {categories.map(({name, color}) => {
                              if (post.category == name) {
                                return (
                                  <p key={name} className={`text-sm text-${color} font-semibold`}>
                                    {post.category}
                                  </p>
                                );
                              }
                            })}
                          </div>
                        </div>
                      </button>
                    </Link>
                  </li>
                ))}
          </ul>
        </>
      )}
    </div>
  );
}
