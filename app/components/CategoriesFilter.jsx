'use client';
import React, {useState} from 'react';

function CategoriesFilter() {
  const [category, setCategory] = useState(['All']);
  const [categories, setCategories] = useState([
    {name: 'Relaciones de pareja', color: 'action-5', selected: false},
    {name: 'Trabajo', color: 'action-3', selected: false},
    {name: 'Familia', color: 'action-2', selected: false},
    {name: 'Amigos', color: 'action-4', selected: false},
    {name: 'Otros', color: 'secondary', selected: false},
  ]);

  return (
    <ul className='w-full px-2 flex flex-wrap justify-center gap-4'>
      {categories.map(({name, color, selected}, index) => (
        <li
          key={index}
          className={`text-${color} px-2 py-1 border-2 font-semibold rounded-lg border-${color} select-none hover:text-white cursor-pointer cat-${index}`}
        >
          {name}
        </li>
      ))}
    </ul>
  );
}

export default CategoriesFilter;
