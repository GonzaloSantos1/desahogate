'use client';
import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import {IconFlame, IconClockHour3, IconMessageCircle2} from '@tabler/icons';
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
  const pathname = usePathname();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/getPosts`)
      .then((res) => res.json())
      .then((data) => {
        setDataFetched(data);
      });
  }, [dataFetched]);

  useEffect(() => {
    let interval = setInterval(() => {
      fetch(`${process.env.NEXT_PUBLIC_URL}/api/getPosts`)
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

  if (pathname.length > 10) {
    return (
      <div className='mt-5 md:mt-10 relative flex justify-center items-center'>
        {!dataFetched ? (
          <LoadingComponent textSize={'lg'} text={'Cargando otros posts...'} size={250} />
        ) : !dataFetched.length ? (
          <EmptyMessage categories={categories} />
        ) : (
          <>
            <ul className='flex flex-wrap justify-center gap-2 w-full h-full rounded-md py-2 text-xs -mt-10'>
              {[...dataFetched].reverse().map((post) => {
                if (post._id !== pathname.slice(7)) {
                  return (
                    <li className='relative max-w-[95%] min-w-[95%] text-primary' key={post._id}>
                      <Link href={`/board/${post._id}`}>
                        <button className='w-full  px-4 py-2 bg-palette-gray rounded-lg'>
                          {post.comments.length > 10 && (
                            <div className='absolute -top-2 -left-3 animate-pulse'>
                              <IconFlame color='#F4256D' size={35} />
                            </div>
                          )}
                          <p className='mt-2 font-light tracking-wide'>{post.message}</p>
                          <div className='flex justify-between items-end mt-4 text-secondary font-light'>
                            <div className='flex flex-col justify-start text-start'>
                              <p className='flex gap-1'>
                                <span>
                                  <IconMessageCircle2 size={15} stroke={2} />
                                </span>
                                {post.comments.length}
                              </p>
                              <p className=' relative pl-5'>
                                <span className='inline-flex absolute left-0 top-0.5'>
                                  <IconClockHour3 size={15} stroke={2} />
                                </span>
                                {dateHandler(post.created_at)}
                              </p>
                            </div>
                            <div className='flex flex-col items-end'>
                              <p href='#' className='font-medium  text-action' role='link'>
                                {post.username}
                              </p>
                              {categories.map(({name, color}) => {
                                if (post.category == name) {
                                  return (
                                    <p
                                      key={name}
                                      className={` text-${color} font-medium lowercase`}
                                    >
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
                  );
                }
              })}
            </ul>
          </>
        )}
      </div>
    );
  }

  return (
    <div className='relative'>
      <CategoriesFilter categories={categories} handleCategory={handleCategory} />
      {!dataFetched ? (
        <LoadingComponent textSize={'3xl'} text={'Cargando posts...'} size={300} />
      ) : !dataFetched.length ? (
        <EmptyMessage categories={categories} />
      ) : (
        <>
          <div className='block'>
            <CreateModal categories={categories} />
          </div>
          <ul className='flex flex-wrap justify-center gap-3 md:gap-6 mt-3 md:mt-6 mb-3 py-2'>
            {category !== ''
              ? dataFetched
                  .filter((e) => e.category == category)
                  .reverse()
                  .map((post) => (
                    <li className='relative' key={post._id}>
                      <Link href={`/board/${post._id}`}>
                        <button className='w-full max-w-[340px] min-w-[340px] px-4 py-2 bg-palette-gray rounded-lg md:hover:-translate-y-1 md:ease-in-out md:transition relative'>
                          {post.comments.length > 10 && (
                            <div className='absolute -top-2.5 -left-4 animate-pulse'>
                              <IconFlame color='#F4256D' size={45} />
                            </div>
                          )}
                          <p className='mt-2 tracking-wide md:text-sm'>{post.message}</p>
                          <div className='flex justify-between items-end mt-4 text-secondary font-light'>
                            <div className='flex flex-col justify-start text-start'>
                              <p className='text-sm flex gap-1'>
                                <span className='mt-0.5'>
                                  <IconMessageCircle2 size={15} stroke={2} />
                                </span>
                                {post.comments.length}
                              </p>
                              <p className='text-sm relative pl-5'>
                                <span className='inline-flex absolute left-0 top-0.5'>
                                  <IconClockHour3 size={15} stroke={2} />
                                </span>
                                {dateHandler(post.created_at)}
                              </p>
                            </div>
                            <div className='flex flex-col items-end'>
                              <p href='#' className='font-medium text-sm text-action' role='link'>
                                {post.username}
                              </p>
                              {categories.map(({name, color}) => {
                                if (post.category == name) {
                                  return (
                                    <p
                                      key={name}
                                      className={`text-sm text-${color} font-medium lowercase`}
                                    >
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
                      <button className='w-full max-w-[340px] min-w-[340px] px-4 py-2 bg-palette-gray rounded-lg md:hover:-translate-y-1 md:ease-in-out md:transition relative'>
                        {post.comments.length > 10 && (
                          <div className='absolute -top-2.5 -left-4 animate-pulse'>
                            <IconFlame color='#F4256D' size={45} />
                          </div>
                        )}
                        <p className='mt-2 tracking-wide md:text-sm'>{post.message}</p>
                        <div className='flex justify-between items-end mt-4 text-secondary font-light'>
                          <div className='flex flex-col justify-start text-start'>
                            <p className='text-sm flex gap-1'>
                              <span className='mt-0.5'>
                                <IconMessageCircle2 size={15} stroke={2} />
                              </span>
                              {post.comments.length}
                            </p>
                            <p className='text-sm relative pl-5'>
                              <span className='inline-flex absolute left-0 top-0.5'>
                                <IconClockHour3 size={15} stroke={2} />
                              </span>
                              {dateHandler(post.created_at)}
                            </p>
                          </div>
                          <div className='flex flex-col items-end'>
                            <p href='#' className='font-medium text-sm text-action' role='link'>
                              {post.username}
                            </p>
                            {categories.map(({name, color}) => {
                              if (post.category == name) {
                                return (
                                  <p
                                    key={name}
                                    className={`text-sm text-${color} font-medium lowercase`}
                                  >
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
