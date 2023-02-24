import Image from 'next/image';
import Footer from './components/Footer';
import {CgMouse} from 'react-icons/cg';
import HeroSection from './components/HeroSection';

export default function Home() {
  return (
    <main className='select-none flex flex-col justify-center overflow-hidden'>
      <div className='h-[calc(100vh-60px)] flex flex-col w-full items-center justify-center relative'>
        <h2 className='font-semibold text-center text-6xl md:text-8xl px-4 max-w-4xl tracking-wide'>
          Una plataforma donde llorar y palante.
        </h2>
        <Image
          src='/assets/images/purr-2.gif'
          width={400}
          height={400}
          alt='picture of a cat being holded'
          className='hidden lg:block absolute -left-36 top-10'
          priority
        />
        <Image
          src='/assets/images/purr-2.gif'
          width={300}
          height={300}
          alt='picture of a cat being holded'
          className='block lg:hidden absolute -left-28 top-10'
          priority
        />
        <div className='flex justify-center flex-col items-center gap-2 absolute bottom-2 text-center text-secondary'>
          <p className='text-xs'>Desliza para saber más</p>
          <CgMouse size={24} className='animate-bounce ' />
        </div>
      </div>
      <HeroSection />
      <Footer />
    </main>
  );
}
