import React, { useState, useCallback } from "react";
import debounce from "lodash.debounce";

function CitySearch() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const fetchCities = async (value) => {
    if (value.length < 2) return;

    const response = await fetch(
      `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=10&namePrefix=${value}`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "ba4702c41fmsh72d3a626285ae7cp194ba2jsn61c0119c8527",
          "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      setSuggestions(data.data.map((city) => `${city.city}, ${city.country}`));
    }
  };

  // Debounced version of fetch
  const debouncedFetchCities = useCallback(debounce(fetchCities, 500), []);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedFetchCities(value);
  };

  return (
    <div style={{ width: "300px", margin: "auto" }}>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Tìm thành phố..."
      />
      {suggestions.map((item, i) => (
        <div key={i}>{item}</div>
      ))}
    </div>
  );
}

export default CitySearch;
