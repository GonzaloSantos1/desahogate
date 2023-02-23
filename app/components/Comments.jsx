'use client';
import React, {useState} from 'react';
import {HiBadgeCheck, HiOutlineDotsHorizontal} from 'react-icons/hi';

function Comments({time, text, user, username, verified}) {
  const [isOpen, setIsOpen] = useState(false);
  const [modal, setModal] = useState(false);

  if (user == 'userAuthor') {
    return (
      <li className='font-medium text-end self-end bg-palette-gray pb-1 pt-1.5 px-3 rounded-xl max-w-[350px] md:max-w-[450px] relative select-none'>
        <p className='text-action md:text-sm pl-4'>{username ? username : 'Anónimo'}</p>
        <p className='font-light md:text-sm leading-[1.1] px-3'>{text}</p>
        <p className='text-secondary text-xs font-light text-start pt-0.5 -ml-0.5'>{time}</p>
      </li>
    );
  }

  if (user == 'userNoAuthor') {
    return (
      <li className='font-medium self-end bg-palette-gray pb-1 pt-1.5 px-3 rounded-xl max-w-[350px] md:max-w-[450px] relative select-none'>
        <div className='flex items-center gap-1 justify-end'>
          {verified && (
            <span>
              <HiBadgeCheck color='#FF4ECD' size={20} />
            </span>
          )}
          <p className='text-action-red text-end md:text-sm pl-4'>
            {username ? username : 'Anónimo'}
          </p>
        </div>
        <p className='font-light md:text-sm leading-[1.1] px-3'>{text}</p>
        <p className='text-secondary text-xs font-light text-start pt-0.5 -ml-0.5'>{time}</p>
      </li>
    );
  }

  if (user == 'authorNoUser') {
    return (
      <li
        className=' font-medium text-start bg-palette-gray pb-1 pt-1.5 px-3 rounded-xl max-w-[350px] md:max-w-[450px] relative select-none'
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <p className='text-action md:text-sm pr-4'>{username ? username : 'Anónimo'}</p>
        <p className='font-light md:text-sm leading-[1.1] px-3'>{text}</p>
        <p className='text-secondary text-xs font-light text-end pt-0.5 -mr-0.5'>{time}</p>
        {isOpen && (
          <span
            className='absolute top-1 right-1.5 cursor-pointer text-white'
            onClick={() => setModal(!modal)}
          >
            <HiOutlineDotsHorizontal size={20} />
          </span>
        )}
        {modal && (
          <p className='px-3 py-1 font-medium text-action-red text-xs bg-palette-gray shadow shadow-palette-black absolute -top-5 -right-14 rounded-md'>
            Denunciar
          </p>
        )}
      </li>
    );
  }

  if (user == 'noUser') {
    return (
      <li
        className='font-medium text-start bg-palette-gray pb-1 pt-1.5 px-3 rounded-xl max-w-[350px] md:max-w-[50%] relative select-none'
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <div className='flex items-center gap-1'>
          <p className='text-action-blue md:text-sm pr-4'>{username ? username : 'Anónimo'}</p>
          {verified && (
            <span className='-ml-4'>
              <HiBadgeCheck color='#FF4ECD' size={20} />
            </span>
          )}
        </div>
        <p className='font-light md:text-sm leading-[1.1] px-3'>{text}</p>
        <p className='text-secondary text-xs font-light text-end pt-0.5 -mr-0.5'>{time}</p>
        {isOpen && (
          <span
            className='absolute top-1 right-1.5 cursor-pointer text-white'
            onClick={() => setModal(!modal)}
          >
            <HiOutlineDotsHorizontal size={20} />
          </span>
        )}
        {modal && (
          <p className='px-3 py-1 font-medium text-action-red text-xs bg-palette-gray shadow shadow-palette-black absolute -top-5 -right-14 rounded-md'>
            Denunciar
          </p>
        )}
      </li>
    );
  }
}

export default Comments;
