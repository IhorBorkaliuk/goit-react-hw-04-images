import Notiflix from "notiflix";
import { useState } from 'react';
import {
  StyledSearchBar,
  StyledForm,
  StyledButton,
  StyledButtonLabel,
  StyledInput,
} from './SearchBarStyled';
import { FaSearch } from 'react-icons/fa';


export function SearchBar({onSubmit}) {
  const [query, setQuery] = useState('');

  const handleChange = e => {
      const query = e.currentTarget.value;
        setQuery(query)
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (query.trim() === '') {
            return Notiflix.Notify.warning('Будь ласка, введіть запит у пошуку ');
        }
        onSubmit(query);
        reset();
    };

    const reset = () => {
      setQuery('')
    }


        return (
          <StyledSearchBar>
            <StyledForm onSubmit={handleSubmit}>
              <StyledButton type="submit">
                <FaSearch />
                <StyledButtonLabel>Search</StyledButtonLabel>
              </StyledButton>

              <StyledInput
                className="input"
                type="text"
                placeholder="Search images and photos"
                value={query}
                onChange={handleChange}
              />
            </StyledForm>
          </StyledSearchBar>
        );
}