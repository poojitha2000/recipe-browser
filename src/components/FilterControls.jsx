import React, { useState, useMemo } from 'react';

function FilterControls({ categories, tags, selectedCategories, selectedTags, onCategoryChange, onTagChange }) {
  const [categorySearch, setCategorySearch] = useState('');
  const [tagSearch, setTagSearch] = useState('');

  const handleCategoryChange = (category) => {
    const newSelected = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    onCategoryChange(newSelected);
  };

  const handleTagChange = (tag) => {
    const newSelected = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    onTagChange(newSelected);
  };

  // Filter categories and tags based on search input
  const filteredCategories = useMemo(() => {
    if (!categories || !Array.isArray(categories)) return [];
    if (!categorySearch) return categories;
    return categories.filter(category =>
      category.toLowerCase().includes(categorySearch.toLowerCase())
    );
  }, [categories, categorySearch]);

  const filteredTags = useMemo(() => {
    if (!tags || !Array.isArray(tags)) return [];
    if (!tagSearch) return tags;
    return tags.filter(tag =>
      tag.toLowerCase().includes(tagSearch.toLowerCase())
    );
  }, [tags, tagSearch]);

  return (
    <div className="filter-controls">
      <div className="filter-grid">
        <div>
          <h4>Filter by Category:</h4>
          <div className="search-container">
            <label htmlFor="category-search" className="sr-only">Search categories</label>
            <input
              id="category-search"
              type="text"
              placeholder="Search categories..."
              value={categorySearch}
              onChange={(e) => setCategorySearch(e.target.value)}
              className="search-input"
              aria-label="Search categories"
            />
          </div>
          <div className="filter-section">
            {filteredCategories.length > 0 ? (
              filteredCategories.map(category => (
                <label key={category} className="filter-label">
                  <input
                    type="checkbox"
                    id={`category-${category}`}
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                  />
                  <span>{category}</span>
                </label>
              ))
            ) : (
              <p className="no-results">No categories match your search.</p>
            )}
          </div>
        </div>
        <div>
          <h4>Filter by Tag:</h4>
          <div className="search-container">
            <label htmlFor="tag-search" className="sr-only">Search tags</label>
            <input
              id="tag-search"
              type="text"
              placeholder="Search tags..."
              value={tagSearch}
              onChange={(e) => setTagSearch(e.target.value)}
              className="search-input"
              aria-label="Search tags"
            />
          </div>
          <div className="filter-section">
            {filteredTags.length > 0 ? (
              filteredTags.map(tag => (
                <label key={tag} className="filter-label">
                  <input
                    type="checkbox"
                    id={`tag-${tag}`}
                    checked={selectedTags.includes(tag)}
                    onChange={() => handleTagChange(tag)}
                  />
                  <span>{tag}</span>
                </label>
              ))
            ) : (
              <p className="no-results">No tags match your search.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterControls;