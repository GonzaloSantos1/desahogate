'use client';
import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import {IconFlame, IconClockHour3, IconMessageCircle2} from '@tabler/icons';
import CategoriesFilter from './CategoriesFilter';
import EmptyMessage from '../../components/EmptyMessage';
import CreateModal from './CreateModal';
import LoadingComponent from '../../components/LoadingComponent';
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
      <div className='mt-5 md:mt-10 relative flex justify-center items-center scrollbar-none'>
        {!dataFetched ? (
          <LoadingComponent textSize={'lg'} text={'Cargando otros posts...'} size={250} />
        ) : !dataFetched.length ? (
          <EmptyMessage categories={categories} />
        ) : (
          <>
            <ul className='flex flex-wrap justify-center gap-2 w-full h-full rounded-md py-2 text-xs -mt-10 scrollbar-none'>
              {[...dataFetched].reverse().map((post) => {
                if (post._id !== pathname.slice(7)) {
                  return (
                    <li
                      className='relative max-w-[95%] min-w-[95%] text-gray-700 dark:text-primary'
                      key={post._id}
                    >
                      <Link href={`/board/${post._id}`}>
                        <button className='w-full p-2 bg-gray-50 dark:bg-palette-gray rounded-lg shadow dark:shadow-none'>
                          {post.comments.length > 10 && (
                            <div className='absolute -top-2 -left-3 animate-pulse'>
                              <IconFlame color='#F4256D' size={35} />
                            </div>
                          )}
                          <p className='mt-2 tracking-wide text-sm text-gray-700 !leading-[18px] dark:text-primary'>
                            {post.message}
                          </p>
                          <div className='flex justify-between items-end mt-1 text-secondary'>
                            <div className='flex flex-col justify-start text-start'>
                              <p className='text-xs flex gap-1 font-medium'>
                                <span>
                                  <IconMessageCircle2 size={15} stroke={3} />
                                </span>
                                {post.comments.length}
                              </p>
                              <p className='text-xs font-medium flex gap-1'>
                                <span>
                                  <IconClockHour3 size={15} stroke={3} />
                                </span>
                                {dateHandler(post.created_at)}
                              </p>
                            </div>
                            <div className='flex flex-col items-end'>
                              <p href='#' className='font-medium text-xs text-action' role='link'>
                                {post.username}
                              </p>
                              {categories.map(({name, color}) => {
                                if (post.category == name) {
                                  return (
                                    <p
                                      key={name}
                                      className={`text-xs text-${color} font-medium lowercase`}
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
    <div className='relative scrollbar-none'>
      <CategoriesFilter categories={categories} handleCategory={handleCategory} />
      {!dataFetched ? (
        <LoadingComponent textSize={'4xl'} text={'Cargando posts...'} size={300} />
      ) : !dataFetched.length ? (
        <EmptyMessage categories={categories} />
      ) : (
        <>
          <div className='block scrollbar-none'>
            <CreateModal categories={categories} />
          </div>
          <ul className='flex flex-wrap justify-center gap-3 mt-3 md:mt-6 mb-3 py-2 scrollbar-none'>
            {category !== ''
              ? dataFetched
                  .filter((e) => e.category == category)
                  .reverse()
                  .map((post) => (
                    <li className='relative' key={post._id}>
                      <Link href={`/board/${post._id}`}>
                        <button className='w-full max-w-[340px] min-w-[340px] px-4 py-2 bg-gray-100 dark:bg-palette-gray rounded-lg md:hover:-translate-y-1 md:ease-in-out md:transition relative shadow dark:shadow-none'>
                          {post.comments.length > 10 && (
                            <div className='absolute -top-2.5 -left-4 animate-pulse'>
                              <IconFlame color='#F4256D' size={45} />
                            </div>
                          )}
                          <p className='mt-2 tracking-wide md:text-sm text-gray-700 dark:text-primary !leading-[18px]'>
                            {post.message}
                          </p>
                          <div className='flex justify-between items-end mt-1 text-secondary'>
                            <div className='flex flex-col justify-start text-start'>
                              <p className='text-sm flex gap-1'>
                                <span className='mt-0.5'>
                                  <IconMessageCircle2 size={15} stroke={3} />
                                </span>
                                {post.comments.length}
                              </p>
                              <p className='text-xs font-medium relative pl-5'>
                                <span className='inline-flex absolute left-0 top-0.5'>
                                  <IconClockHour3 size={15} stroke={3} />
                                </span>
                                {dateHandler(post.created_at)}
                              </p>
                            </div>
                            <div className='flex flex-col items-end'>
                              <p href='#' className='font-medium text-xs text-action' role='link'>
                                {post.username}
                              </p>
                              {categories.map(({name, color}) => {
                                if (post.category == name) {
                                  return (
                                    <p
                                      key={name}
                                      className={`text-xs text-${color} font-medium lowercase`}
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
                      <button className='w-full max-w-[340px] min-w-[340px] px-4 py-2 bg-gray-100 dark:bg-palette-gray rounded-lg md:hover:-translate-y-1 md:ease-in-out md:transition relative shadow dark:shadow-gray-800'>
                        {post.comments.length > 10 && (
                          <div className='absolute -top-2.5 -left-4 animate-pulse'>
                            <IconFlame color='#F4256D' size={45} />
                          </div>
                        )}
                        <p className='mt-2 tracking-wide md:text-sm text-gray-700 dark:text-primary !leading-[18px]'>
                          {post.message}
                        </p>
                        <div className='flex justify-between items-end mt-1 text-secondary font-light'>
                          <div className='flex flex-col justify-start text-start'>
                            <p className='text-xs font-medium flex gap-1'>
                              <span className=''>
                                <IconMessageCircle2 size={15} stroke={3} />
                              </span>
                              {post.comments.length}
                            </p>
                            <p className='text-xs font-medium relative pl-5'>
                              <span className='inline-flex absolute left-0'>
                                <IconClockHour3 size={15} stroke={3} />
                              </span>
                              {dateHandler(post.created_at)}
                            </p>
                          </div>
                          <div className='flex flex-col items-end'>
                            <p href='#' className='font-medium text-xs text-action' role='link'>
                              {post.username}
                            </p>
                            {categories.map(({name, color}) => {
                              if (post.category == name) {
                                return (
                                  <p
                                    key={name}
                                    className={`text-xs text-${color} font-medium lowercase`}
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
