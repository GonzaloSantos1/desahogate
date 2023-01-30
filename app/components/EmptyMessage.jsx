import React from 'react';
import CreateModal from './CreateModal';
import Image from 'next/image';
import {IconArrowNarrowDown} from '@tabler/icons';

function EmptyBoardMessage({categories}) {
  const animate = 'animate-bounce';
  return (
    <div className='flex flex-col w-full justify-center items-center'>
      <Image
        src='/assets/images/purr-page-not-found.png'
        width={350}
        height={350}
        alt='picture of a cat hiding dirt under the carpet'
        className='block'
      />
      <h1 className='text-2xl font-semibold md:font-regular text-center md:text-5xl'>
        ¡Oops! <br />
        Aún no hay nada que mostrar,
      </h1>
      <h2 className='text-2xl font-semibold md:font-regular text-center md:text-5xl'>
        sé xl primerx en desahogarte
      </h2>

      <IconArrowNarrowDown
        size={100}
        stroke={1}
        className='animate-bounce text-primary mt-5 block md:hidden'
      />

      <div className='hidden md:block'>
        <CreateModal categories={categories} animate={animate} />
      </div>
    </div>
  );
}

export default EmptyBoardMessage;
