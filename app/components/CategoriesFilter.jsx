'use client';
import React, {useState, useEffect} from 'react';
import {IconCircleX} from '@tabler/icons';

function CategoriesFilter(props) {
  const {categories, handleCategory} = props;
  const [category, setCategory] = useState('');

  useEffect(() => {
    handleCategory(category);
  }, [category]);

  /* const uncheckCategories = () => {
    let uncheck = categories.map((e) => e.name);
    uncheck.forEach((element) => {
      let input = document.getElementById(element);
      input.checked = false;
    });
    handleCategory('');
    setCategory('');
  }; */

  return (
    <>
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
              className={`px-3 py-1 border-2 font-medium ease-in-out transition duration-300 rounded-full border-${color} select-none cursor-pointer ${
                category == name ? `bg-${color} text-palette-black` : `text-${color}`
              } lowercase`}
            >
              {name}
            </label>
          </li>
        ))}
      </ul>
      {/* <button
        onClick={() => uncheckCategories()}
        className='flex justify-center items-center mx-auto mt-4 md:mt-7 hover:underline hover:underline-offset-4'
      >
        <IconCircleX size={20} className='inline-flex mx-1' />

        <p className='text-sm'>Borrar filtros</p>
      </button> */}
    </>
  );
}

export default CategoriesFilter;
