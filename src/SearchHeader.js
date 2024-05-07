// SearchHeader.js
import React, { useState } from 'react';

const SearchHeader = ({ column, onSearch }) => {
    const [searchActive, setSearchActive] = useState(false);
    const [searchText, setSearchText] = useState('');
  
    const onSearchChange = (event) => {
      setSearchText(event.target.value);
      onSearch(column.field, event.target.value);
    };
  return (
    <div style={{ display: 'flex', flexDirection: 'row-reverse', justifyContent: 'space-between' }}>
      <span>
        {column.colDef.headerName}
      </span>
      <div>
        <button onClick={() => setSearchActive(!searchActive)}>
          <img src="./magnifier.png" alt="search" style={{width: 10}} />
        </button>
        {searchActive && (
          <input
            type="text"
            value={searchText}
            onChange={onSearchChange}
            placeholder="Search..."
          />
        )}
      </div>
    </div>
  );
};

export default SearchHeader;
