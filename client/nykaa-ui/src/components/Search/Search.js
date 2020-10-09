import React from 'react';
import './Search.css';

const Search = ({ onChange, value, className }) => {
  return(
    <input
    className={className}
    name="searchKeyword"
    value={value}
    onChange={(e) => onChange(e.target.value)}
  />
  )
  };

export default Search;