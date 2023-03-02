'use client';
import React, {useState} from 'react';
import {HiBadgeCheck, HiOutlineDotsHorizontal} from 'react-icons/hi';
import {TbAlertTriangle} from 'react-icons/tb';

function Comments({time, text, user, username, verified}) {
  const [isOpen, setIsOpen] = useState(false);
  const [modal, setModal] = useState(false);

  if (user == 'userAuthor') {
    return (
      <li className='text-end self-end bg-action/80 pb-1 pt-1.5 px-3 rounded-t-xl rounded-bl-xl max-w-[350px] md:max-w-[450px] relative select-none shadow dark:shadow-gray-800'>
        <p className='text-white md:text-sm pl-4 font-medium'>{username ? username : 'Anónimo'}</p>
        <p className='md:text-sm text-palette-gray dark:text-primary !leading-[18px]'>{text}</p>
        <p className='text-gray-200 text-xs text-start pt-0.5 -ml-0.5'>{time}</p>
      </li>
    );
  }

  if (user == 'userNoAuthor') {
    return (
      <li className='self-end bg-gray-50 dark:bg-palette-gray pb-1 pt-1.5 px-3 rounded-t-xl rounded-bl-xl max-w-[350px] md:max-w-[450px] relative select-none shadow dark:shadow-gray-800'>
        <div className='flex items-center gap-1 justify-end'>
          {verified && (
            <span>
              <HiBadgeCheck color='#9e69ff' size={20} />
            </span>
          )}
          <p
            className={`${
              verified ? 'text-palette-purple' : 'text-action-red'
            } md:text-sm font-medium`}
          >
            {username ? username : 'Anónimo'}
          </p>
        </div>
        <p className='md:text-sm text-gray-700 dark:text-primary !leading-[18px]'>{text}</p>
        <p className='text-secondary text-xs text-start pt-0.5 -ml-0.5'>{time}</p>
      </li>
    );
  }

  if (user == 'authorNoUser') {
    return (
      <li
        className='text-start bg-action/80 pb-1 pt-1.5 px-3 rounded-t-xl rounded-br-xl max-w-[350px] md:max-w-[450px] relative select-none shadow dark:shadow-gray-800'
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => {
          setIsOpen(false);
          setModal(false);
        }}
      >
        <p className='text-white dark:text-palette-black md:text-sm pr-4 font-medium'>
          {username ? username : 'Anónimo'}
        </p>
        <p className='md:text-sm text-palette-gray dark:text-primary !leading-[18px]'>{text}</p>
        <p className='text-gray-200 text-xs text-end pt-0.5 -mr-0.5'>{time}</p>
        {isOpen && (
          <span
            className='absolute top-1 right-1.5 cursor-pointer text-white'
            onClick={() => setModal(!modal)}
          >
            <HiOutlineDotsHorizontal size={20} />
          </span>
        )}
        {modal && isOpen && (
          <div className='px-3 py-2 font-medium text-xs bg-gray-50 dark:bg-palette-gray shadow dark:shadow-palette-black absolute -top-5 -right-14 rounded-md'>
            <div className='flex w-full justify-start items-center gap-1 text-action-red cursor-pointer font-medium'>
              <TbAlertTriangle size={16} />
              <p className='text-xs'>Denunciar</p>
            </div>
          </div>
        )}
      </li>
    );
  }

  if (user == 'noUser') {
    return (
      <li
        className='text-start bg-gray-50 dark:bg-palette-gray pb-1 pt-1.5 px-3 rounded-t-xl rounded-br-xl max-w-[350px] md:max-w-[50%] relative select-none shadow dark:shadow-gray-800'
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => {
          setIsOpen(false);
          setModal(false);
        }}
      >
        <div className='flex items-center gap-1 pr-4'>
          <p
            className={`${
              verified ? 'text-palette-purple' : 'text-action-blue'
            } md:text-sm font-medium`}
          >
            {username ? username : 'Anónimo'}
          </p>
          {verified && (
            <span>
              <HiBadgeCheck color='#9e69ff' size={20} />
            </span>
          )}
        </div>
        <p className='md:text-sm text-gray-700 dark:text-primary !leading-[18px]'>{text}</p>
        <p className='text-secondary text-xs text-end pt-0.5 -mr-0.5'>{time}</p>
        {isOpen && (
          <span
            className='absolute top-1 right-1.5 cursor-pointer text-gray-700 dark:text-white'
            onClick={() => setModal(!modal)}
          >
            <HiOutlineDotsHorizontal size={20} />
          </span>
        )}
        {modal && isOpen && (
          <div className='px-3 py-2 font-medium text-xs bg-gray-50 dark:bg-palette-gray shadow dark:shadow-palette-black absolute -top-5 -right-14 rounded-md'>
            <div className='flex w-full justify-start items-center gap-1 text-action-red cursor-pointer font-medium'>
              <TbAlertTriangle size={16} />
              <p className='text-xs'>Denunciar</p>
            </div>
          </div>
        )}
      </li>
    );
  }
}

export default Comments;
