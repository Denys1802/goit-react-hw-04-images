import { useState } from 'react';
import {
  SeaechHeader,
  SearchForm,
  FormBtn,
  FormLabel,
  FormInput,
} from './SearchBar.styled';

const Searchbar = ({ createSearchText, resetPage }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = ({ target }) => {
    const value = target.value;
    setInputValue(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    createSearchText(inputValue);
    resetPage();
  };

  return (
    <SeaechHeader>
      <SearchForm onSubmit={handleSubmit}>
        <FormBtn type="submit">
          <FormLabel>Search</FormLabel>
        </FormBtn>

        <FormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
          value={inputValue}
        />
      </SearchForm>
    </SeaechHeader>
  );
};

export default Searchbar;
