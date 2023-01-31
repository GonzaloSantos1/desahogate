import Image from 'next/image';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className='select-none'>
      <h2 className='mt-5 md:my-10 text-4xl font-extrabold text-action/80 md:text-7xl px-10 mx-auto text-center max-w-5xl'>
        Una plataforma donde llorar y palante.
      </h2>
      <div className='flex flex-col md:flex-row gap-2 md:gap-0 justify-start py-14 px-2 font-medium items-center md:justify-center'>
        <div className='flex flex-col text-center gap-1 md:max-w-lg md:items-end'>
          <p className='text-3xl font-bold md:text-4xl md:text-start'>
            Comparte lo que te preocupa
          </p>
          <p className='text-lg md:text-lg text-secondnary px-5 text-center md:max-w-md md:px-0 md:text-end text-secondary'>
            A veces, solo necesitamos desahogarnos. Puedes hacerlo de forma anónima o crear una
            cuenta, así podrás seguir el hilo de lo que ocurre. Otras personas pueden darte consejos
            o apoyo
          </p>
        </div>
        <Image
          src='/assets/images/purr-sad-dark.png'
          width={250}
          height={250}
          alt='picture of a sad cat looking thru a window'
          className='block md:hidden'
        />
        <Image
          src='/assets/images/purr-sad-dark.png'
          width={450}
          height={450}
          alt='picture of a sad cat looking thru a window'
          className='hidden md:block'
        />
      </div>
      <div className='flex flex-col md:flex-row-reverse justify-start py-14 gap-2 md:gap-0 px-2 font-medium items-center md:justify-center bg-white text-gray-900'>
        <div className='flex flex-col text-center gap-1 md:max-w-lg md:items-start'>
          <p className='text-3xl font-bold md:text-4xl md:text-start'>
            Comenta otras publicaciones
          </p>
          <p className='text-lg md:text-lg text-secondnary px-5 text-center md:max-w-md md:px-0 md:text-start text-secondary'>
            Entre todos podemos ayudarnos a salir del pozo, pero recuerda que probablemente ni tú ni
            quién te comente sea un profesional de la salud mental. Es una comunidad de apoyo, pero
            si necesitas ayuda profesional no la busques aquí
          </p>
        </div>
        <Image
          src='/assets/images/purr-5.png'
          width={250}
          height={250}
          alt='picture of a cat hiding dirt under the carpet'
          className='block md:hidden'
        />
        <Image
          src='/assets/images/purr-5.png'
          width={450}
          height={450}
          alt='picture of a cat hiding dirt under the carpet'
          className='hidden md:block'
        />
      </div>
      <div className='flex flex-col md:flex-row justify-start py-14 gap-2 md:gap-0 md:py-0 px-2 font-medium items-center md:justify-center'>
        <div className='flex flex-col text-center gap-1 md:max-w-lg md:items-end'>
          <p className='text-3xl font-bold md:text-4xl md:text-start'>Pórtate bien</p>
          <p className='text-lg md:text-lg text-secondnary px-5 text-center md:max-w-md md:px-0 md:text-end text-secondary'>
            La idea es que podamos encontrar apoyo blablablablabla
          </p>
        </div>
        <Image
          src='/assets/images/purr-monch.png'
          width={250}
          height={250}
          alt='picture of a cat hiding dirt under the carpet'
          className='block md:hidden'
        />
        <Image
          src='/assets/images/purr-monch.png'
          width={450}
          height={450}
          alt='picture of a cat hiding dirt under the carpet'
          className='hidden md:block'
        />
      </div>
      <Footer />
    </main>
  );
}
