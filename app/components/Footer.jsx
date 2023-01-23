'use client';
import React, {useEffect, useState} from 'react';
import {IconHome, IconLayoutDashboard, IconUser, IconStar} from '@tabler/icons';
import Link from 'next/link';
import {usePathname} from 'next/navigation';

const footerLinks = [
  {
    icon: <IconHome size={28} stroke={1} />,
    route: '/',
    legend: 'Home',
  },
  {
    icon: <IconLayoutDashboard size={28} stroke={1} />,
    route: '/board',
    legend: 'Board',
  },
  {
    icon: <IconStar size={28} stroke={1} />,
    route: '#',
    legend: 'Siguiendo',
  },
  {
    icon: <IconUser size={28} stroke={1} />,
    route: '#',
    legend: 'Perfil',
  },
];

const Footer = () => {
  const pathname = usePathname();
  const [selected, setSelected] = useState(pathname);

  return (
    <nav className='border-t border-gray-800'>
      <ul className='flex justify-around items-center md:hidden h-14'>
        {footerLinks.map(({icon, route, legend}, index) => {
          if (selected == route) {
            return (
              <li
                key={index}
                onClick={() => {
                  setSelected(route);
                  document.getElementById('body-div').scroll(0, 0);
                }}
              >
                <Link href={route}>
                  <div className='flex flex-col text-action items-center justify-center'>
                    {icon}
                    <p className='text-xs'>{legend}</p>
                  </div>
                </Link>
              </li>
            );
          } else {
            return (
              <li key={index} onClick={() => setSelected(route)}>
                <Link href={route}>
                  <div className='flex flex-col items-center justify-center'>
                    {icon}
                    <p className='text-xs'>{legend}</p>
                  </div>
                </Link>
              </li>
            );
          }
        })}
      </ul>
    </nav>
  );
};

export default Footer;
