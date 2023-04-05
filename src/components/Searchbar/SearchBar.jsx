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
    resetPage();
  };

  const handleSubmit = e => {
    e.preventDefault();
    createSearchText(inputValue);
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
// class Searchbar extends Component {
//   state = {
//     inputValue: '',
//   };

//   handleChange = ({ target }) => {
//     const value = target.value;
//     this.setState({ inputValue: value });
//     this.props.resetPage();
//   };

//   handleSubmit = e => {
//     e.preventDefault();
//     this.props.createSearchText(this.state.inputValue);
//   };
//   render() {
//     return (
//       <SeaechHeader>
//         <SearchForm onSubmit={this.handleSubmit}>
//           <FormBtn type="submit">
//             <FormLabel>Search</FormLabel>
//           </FormBtn>

//           <FormInput
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             onChange={this.handleChange}
//             value={this.state.inputValue}
//           />
//         </SearchForm>
//       </SeaechHeader>
//     );
//   }
// }

// export default Searchbar;
