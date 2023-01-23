import React from 'react';
import CreateModal from '../components/CreateModal';
import BoardDisplay from '../components/BoardDisplay';

async function getData() {
  const res = await fetch('http://localhost:3000/api/getPosts');
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Board() {
  const data = await getData();
  const categories = [
    {name: 'Relaciones de pareja', color: 'action-5', selected: false},
    {name: 'Trabajo', color: 'action-3', selected: false},
    {name: 'Familia', color: 'action-2', selected: false},
    {name: 'Amigos', color: 'action-4', selected: false},
    {name: 'Otros', color: 'secondary', selected: false},
  ];

  return (
    <div className='my-4 px-8 '>
      {data.lenght && <CreateModal categories={categories} />}
      <BoardDisplay data={data} categories={categories} />
    </div>
  );
}
