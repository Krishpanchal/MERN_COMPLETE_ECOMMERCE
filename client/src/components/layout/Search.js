import React from "react";
import { useState } from "react";

const Search = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (!keyword.trim()) {
      history.push("/");
    }

    history.push(`/search/${keyword}`);
  };

  return (
    <form onSubmit={submitHandler}>
      <div className='input-group'>
        <input
          type='text'
          id='search_field'
          className='form-control'
          placeholder='Enter Product Name ...'
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          required
        />
        <div className='input-group-append'>
          <button id='search_btn' className='btn'>
            <i className='fa fa-search' aria-hidden='true'></i>
          </button>
        </div>
      </div>
    </form>
  );
};

export default Search;
