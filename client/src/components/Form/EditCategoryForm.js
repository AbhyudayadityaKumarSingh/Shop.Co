import React from 'react';

export const CategoryForm = ({ name, setName, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="categoryName">Category Name</label>
        <input
          type="text"
          className="form-control"
          placeholder='Enter category name'
          id="categoryName"
          value={name}
          onChange={(e) => setName(e.target.value)} // Use the setName function correctly here
        />
      </div>
      <button type="submit" className="btn btn-primary mv-4">
        Submit
      </button>
    </form>
  );
};
