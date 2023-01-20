'use client';
import React from 'react';
import {IconHome, IconLayoutDashboard, IconUser, IconStar} from '@tabler/icons';
import Link from 'next/link';

const footerLinks = [
  {
    icon: <IconHome size={28} stroke={2} />,
    route: '/',
  },
  {
    icon: <IconLayoutDashboard size={28} stroke={2} />,
    route: '/boards',
  },
  {
    icon: <IconStar size={28} stroke={2} />,
    route: '#',
  },
  {
    icon: <IconUser size={28} stroke={2} />,
    route: '#',
  },
];

const Footer = () => {
  return (
    <nav className='border-t border-gray-800'>
      <ul className='flex justify-around items-center md:hidden h-12'>
        {footerLinks.map(({icon, route}, index) => (
          <li key={index}>
            <Link href={route}>{icon}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Footer;
