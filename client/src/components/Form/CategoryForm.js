import React from 'react';

export const CategoryForm = ({ name, setName, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="categoryName">Add Category </label>
        <input
          type="text"
          className="form-control"
          placeholder='Enter category name'
          id="categoryName"
          value={name}
          onChange={(e) => setName(e.target.value)} // Use the setName function correctly here
        />
      </div>
      <button type="submit" className="btn btn-primary my-3">
        Submit
      </button>
    </form>
  );
};
