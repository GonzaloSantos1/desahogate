import React from 'react';
import CreateModal from './CreateModal';

function EmptyBoardMessage({categories}) {
  const animate = 'animate-bounce';
  return (
    <div className='flex flex-col w-full mt-24 justify-center items-center'>
      <Image
        src='/assets/images/purr-page-not-found.png'
        width={450}
        height={450}
        alt='picture of a cat hiding dirt under the carpet'
        className='hidden md:block'
      />
      <h1 className='text-xl font-semibold md:font-regular text-center md:text-5xl'>
        ¡Vaya! <br />
        Aún no hay nada que mostrar,
      </h1>
      <h2 className='text-xl font-semibold md:font-regular text-center md:text-5xl'>
        sé xl primerx en desahogarte
      </h2>
      <CreateModal categories={categories} animate={animate} />
    </div>
  );
}

export default EmptyBoardMessage;
