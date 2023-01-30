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
      <ul className='w-full px-2 flex flex-wrap justify-center gap-4 pb-2'>
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
              className={`sr-only peer cat-${index}`}
              value={name}
              name='categories-list'
            />
            <label
              htmlFor={name}
              className={`px-3 py-1 border-2 font-semibold ease-in-out transition duration-300 rounded-full border-${color} select-none hover:shadow-${color} hover:shadow-lg hover:bg-${color} cursor-pointer cat-${index} ${
                category == name ? `bg-${color} text-[#101010]` : `text-${color}`
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
