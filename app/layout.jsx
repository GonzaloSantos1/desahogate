'use client';
import Header from './components/Header';
import './globals.css';
import React, {Suspense} from 'react';
import Loading from './loading';
import Provider from './components/Provider';

export default function RootLayout({children}) {
  return (
    <html lang='en'>
      <head />
      <body className='bg-white dark:bg-palette-black text-palette-gray dark:text-primary relative overflow-x-hidden'>
        <Provider>
          <Suspense fallback={<Loading />}>
            <Header />
            <div id='body-div' className='flex-1 scrollbar-none relative md:pb-0'>
              {children}
            </div>
          </Suspense>
        </Provider>
      </body>
    </html>
  );
}
