import React, { useState, useEffect } from 'react';
import './components.css'; // Assuming your CSS file is named components.css

function Centre({ data }) {
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    country: '',
    currency: '',
  });
  const [filtersApplied, setFiltersApplied] = useState(false);

  useEffect(() => {
    // Log the data received from the parent component
    console.log('Received data:', data);

    // Ensure we display at least 16 items, even if there are fewer in the data
    const initialFilteredData = data.slice(0, 16);
    console.log('Initial filtered data:', initialFilteredData); // Debug log
    setFilteredData(initialFilteredData);
  }, [data]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prevFilters => ({ ...prevFilters, [filterType]: value }));
  };

  const applyFilters = () => {
    let filtered = [...data];

    console.log('Initial filtered data length:', filtered.length); // Debug log

    if (filters.minPrice !== '') {
      filtered = filtered.filter(item => parseFloat(item.price) >= parseFloat(filters.minPrice));
      console.log('After min price filter:', filtered.length); // Debug log
    }
    if (filters.maxPrice !== '') {
      filtered = filtered.filter(item => parseFloat(item.price) <= parseFloat(filters.maxPrice));
    }
    if (filters.country !== '') {
      filtered = filtered.filter(item => item.country === filters.country);
    }
    if (filters.currency !== '') {
      filtered = filtered.filter(item => item.currency === filters.currency);
    }

    console.log('Filtered data after applying filters:', filtered.length); // Debug log

    // Ensure we display at least 16 items, even if there are fewer after filtering
    setFilteredData(filtered.slice(0, 16));
    setFiltersApplied(true);
  };

  const resetFilters = () => {
    setFilters({
      minPrice: '',
      maxPrice: '',
      country: '',
      currency: '',
    });
    setFilteredData(data.slice(0, 16)); // Reset filteredData to first 16 items
    setFiltersApplied(false);
  };

  const renderCards = () => {
    return (
      <div className="q-combine">
        {filteredData.map((exchange, index) => (
          <div className="card" key={index}>
            <div className="card-title">{exchange.name}</div>
            <div className="card-text">Country: {exchange.country}</div>
            <div className="card-text">Timezone: {exchange.timezone}</div>
            <div className="card-text">Currency: {exchange.currency}</div>
            <div className="card-text">Price: {exchange.price}</div>
            <div className="card-text">Change: {exchange.change}</div>
            <div className="card-text">Change Percent: {exchange.change_percent}%</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
    <br /><br />
      <div className="filter-options">
        <div className="filter-option">
          <label>Min Price:</label>
          <input type="text" value={filters.minPrice} onChange={(e) => handleFilterChange('minPrice', e.target.value)} />
        </div>
        <div className="filter-option">
          <label>Max Price:</label>
          <input type="text" value={filters.maxPrice} onChange={(e) => handleFilterChange('maxPrice', e.target.value)} />
        </div>
        <div className="filter-option">
          <label>Country:</label>
          <input type="text" value={filters.country} onChange={(e) => handleFilterChange('country', e.target.value)} />
        </div>
        <div className="filter-option">
          <label>Currency:</label>
          <input type="text" value={filters.currency} onChange={(e) => handleFilterChange('currency', e.target.value)} />
        </div>
        <button onClick={applyFilters}>Apply Filters</button>
        <button onClick={resetFilters}>Reset Filters</button>
      </div>
      {renderCards()}
    </>
  );
}

export default Centre;