'use client';
import React from 'react';
import {IconHome, IconLayoutDashboard, IconUser, IconStar} from '@tabler/icons';
import Link from 'next/link';

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
  return (
    <nav className='border-t border-gray-800'>
      <ul className='flex justify-around items-center md:hidden h-14'>
        {footerLinks.map(({icon, route, legend}, index) => (
          <li key={index}>
            <Link href={route}>
              <div className='flex flex-col items-center justify-center'>
                {icon}
                <p className='text-xs'>{legend}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Footer;
