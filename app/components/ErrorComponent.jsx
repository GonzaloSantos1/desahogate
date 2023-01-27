import React from 'react';
import Image from 'next/image';

function ErrorComponent({textSize, size}) {
  return (
    <div
      className={`flex flex-col justify-center items-center mx-auto w-full h-full my-auto text-4xl font-bold gap-3`}
    >
      <h2 className='text-6xl'>¡Oops!</h2>
      <Image
        src='/assets/images/purr-page-not-found.png'
        width={size}
        height={size}
        alt='picture of a cat hiding dirt under the carpet'
        className='hidden md:block'
      />
      <h2>Parece que aquí no hay nada que ver</h2>
    </div>
  );
}

export default ErrorComponent;
