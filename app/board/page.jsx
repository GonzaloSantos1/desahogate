import React from 'react';
import CreateModal from '../components/CreateModal';
import BoardDisplay from '../components/BoardDisplay';

async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/getPosts`);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Board() {
  const data = await getData();
  const categories = [
    {name: 'Relaciones de pareja', color: 'action-red', selected: false},
    {name: 'Trabajo', color: 'action-yellow', selected: false},
    {name: 'Familia', color: 'action-blue', selected: false},
    {name: 'Amigos', color: 'action-green', selected: false},
    {name: 'Otros', color: 'action-purple', selected: false},
  ];

  return (
    <div className='md:my-4 md:px-8 '>
      {data.lenght && <CreateModal categories={categories} />}
      <BoardDisplay data={data} categories={categories} />
    </div>
  );
}
