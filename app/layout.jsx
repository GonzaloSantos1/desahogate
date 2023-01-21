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
      <body className='bg-black text-primary h-screen overflow-hidden flex flex-col'>
        <Header />

        <Suspense fallback={<Loading />}>
          <div id='body-div' className='flex-1 overflow-y-scroll relative'>
            {children}
          </div>
        </Suspense>
        <Footer />
      </body>
    </html>
  );
}
