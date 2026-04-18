function SearchBar({ label, value, onChange }) {
  return (
    <div className="field-group">
      <label htmlFor="product-search">{label}</label>
      <input
        id="product-search"
        className="search-input"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search by name or flavor"
      />
    </div>
  );
}

export default SearchBar;
