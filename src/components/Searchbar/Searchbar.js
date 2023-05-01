import PropTypes from 'prop-types';
import { useState } from "react";
import { toast } from 'react-hot-toast';
import { Header, SearchForm, Input, Button } from "./Searchbar.styled";
import { HiOutlineSearch } from "react-icons/hi";

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState("");

  const handleQueryChange = event => {
    setQuery(event.currentTarget.value.toLowerCase());
  }

  const handleSubmit = event => {
    event.preventDefault();
    if (query.trim() === "") {
      return toast('Please enter search word!', { icon: '🦄', });
    }
    onSubmit(query);
    setQuery("");
  }

  return (
    <Header>
      <SearchForm className="form" onSubmit={handleSubmit} autoComplete='off'>
        <Input
          onChange={handleQueryChange}
          type="text"
          name="query"
          value={query}
          placeholder="Search images and photos"
        />
        <Button type="submit" className="button">
          <HiOutlineSearch />
        </Button>
      </SearchForm>
    </Header>
  )
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func,
}