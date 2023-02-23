'use client';
import React, {useState, useEffect} from 'react';

function CategoriesFilter(props) {
  const {categories, handleCategory} = props;
  const [category, setCategory] = useState('');

  useEffect(() => {
    handleCategory(category);
  }, [category]);

  return (
    <ul className='w-full px-2 flex flex-wrap justify-center gap-2 md:gap-4 pb-2 h-[90px] md:h-auto mt-5 md:mt-10'>
      {categories.map(({name, color}, index) => (
        <li key={index}>
          <input
            type='radio'
            id={name}
            onClick={() => {
              if (category == name) {
                setCategory('');
              } else {
                setCategory(name);
                handleCategory(name);
              }
            }}
            className={`sr-only peer`}
            value={name}
            name='categories-list'
          />
          <label
            htmlFor={name}
            className={`px-3 py-1 border-2 font-medium text-sm ease-in-out transition duration-300 rounded-full border-${color} select-none cursor-pointer ${
              category == name ? `bg-${color} text-palette-black` : `text-${color}`
            } lowercase`}
          >
            {name}
          </label>
        </li>
      ))}
    </ul>
  );
}

export default CategoriesFilter;
