import Header from './components/Header';
import Footer from './components/Footer';
import './globals.css';
import React, {Suspense} from 'react';
import Loading from './loading';

export default function RootLayout({children}) {
  return (
    <html lang='en'>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.jsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className='bg-neutral-900 md:bg-black text-gray-200 h-screen overflow-hidden flex flex-col'>
        <Header />

        <Suspense fallback={<Loading />}>
          <div className='flex-1 overflow-y-scroll'>{children}</div>
        </Suspense>
        <Footer />
      </body>
    </html>
  );
}
