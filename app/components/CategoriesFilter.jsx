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

  const handleSelected = (index) => {
    let newCategories = [...categories];
    newCategories[index].selected = !newCategories[index].selected;
    setCategories(newCategories);
  };

  return (
    <ul className='w-full px-2 flex flex-wrap justify-center gap-4'>
      {categories.map(({name, color, selected}, index) => (
        <li key={index}>
          <input
            type='radio'
            id={name}
            onClick={(e) => console.log(e.target.value)}
            className={`sr-only peer cat-${index}`}
            value={name}
            name='categories-list'
          />
          <label
            htmlFor={name}
            className={`text-${color} px-2 py-1 border font-medium ease-in-out transition duration-200 rounded-lg border-${color} select-none hover:text-white cursor-pointer cat-${index} peer-checked:text-white`}
          >
            {name}
          </label>
        </li>
      ))}
    </ul>
  );
}

export default CategoriesFilter;
