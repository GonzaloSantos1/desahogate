'use client';
import React, {useContext} from 'react';
import CreateModal from '../components/CreateModal';
import UserContext from '../../lib/userContext';
import BoardDisplay from '../components/BoardDisplay';

export default function Board() {
  const user = useContext(UserContext);
  const data = user.data;

  const categories = [
    {name: 'Relaciones de pareja', color: 'action-red', selected: false},
    {name: 'Trabajo', color: 'action-yellow', selected: false},
    {name: 'Familia', color: 'action-blue', selected: false},
    {name: 'Amigos', color: 'action-green', selected: false},
    {name: 'Otros', color: 'action-purple', selected: false},
  ];

  return (
    <div className='md:my-4 md:px-8'>
      <BoardDisplay data={data} categories={categories} />
    </div>
  );
}
