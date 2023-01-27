import Image from 'next/image';

export default function Home() {
  return (
    <main className=''>
      <h2 className='my-5 md:my-10 text-4xl md:text-7xl px-10 mx-auto text-center max-w-5xl'>
        Una plataforma donde llorar y palante.
      </h2>
      <div className='flex justify-start py-6 px-2 font-medium items-center md:justify-center'>
        <div className='flex flex-col text-center gap-1 md:max-w-lg md:items-end'>
          <p className='text-2xl font-semibold md:text-4xl md:text-start'>
            Comparte lo que te preocupa
          </p>
          <p className='text-md md:text-lg text-secondnary px-5 text-center md:max-w-md md:px-0 md:text-end text-secondary'>
            A veces, solo necesitamos desahogarnos. Puedes hacerlo de forma anónima o crear una
            cuenta, así podrás seguir el hilo de lo que ocurre. Otras personas pueden darte consejos
            o apoyo
          </p>
        </div>
        <Image
          src='/assets/images/purr-6.gif'
          width={450}
          height={450}
          alt='picture of a cat hiding dirt under the carpet'
          className='hidden md:block'
        />
      </div>
      <div className='flex flex-row-reverse justify-start py-6 px-2 font-medium items-center md:justify-center bg-white text-gray-900'>
        <div className='flex flex-col text-center gap-1 md:max-w-lg md:items-start'>
          <p className='text-2xl font-semibold md:text-4xl md:text-start'>
            Comenta otras publicaciones
          </p>
          <p className='text-md px-5 text-center md:max-w-md md:text-start md:px-0 text-gray-700'>
            Entre todos podemos ayudarnos a salir del pozo, pero recuerda que probablemente ni tú ni
            quién te comente sea un profesional de la salud mental. Es una comunidad de apoyo, pero
            si necesitas ayuda profesional no la busques aquí
          </p>
        </div>
        <Image
          src='/assets/images/purr-5.png'
          width={450}
          height={450}
          alt='picture of a cat hiding dirt under the carpet'
          className='hidden md:block'
        />
      </div>
      <div className='flex justify-start py-6 md:py-0 px-2 font-medium items-center md:justify-center'>
        <div className='flex flex-col text-center gap-1 md:max-w-lg md:items-end'>
          <p className='text-2xl font-semibold md:text-4xl md:text-start'>Pórtate bien</p>
          <p className='text-md md:text-lg text-secondary px-5 text-center md:max-w-md md:px-0 md:text-end'>
            La idea es que podamos encontrar apoyo blablablablabla
          </p>
        </div>
        <Image
          src='/assets/images/purr-working-process.png'
          width={450}
          height={450}
          alt='picture of a cat hiding dirt under the carpet'
          className='hidden md:block'
        />
      </div>
    </main>
  );
}
