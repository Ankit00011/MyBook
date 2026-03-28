import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

const SearchBox = ({ toggle }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const query = searchQuery.trim();

    if (query) {
      navigate(`/entries?search=${encodeURIComponent(query)}`);
    } else {
      navigate("/entries");
    }

    setSearchQuery("");
    toggle?.();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex w-full items-center gap-2">
        <input
          name="search"
          className="input-premium min-w-[170px]"
          placeholder="Search entries"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          autoComplete="off"
        />
        <button type="submit" className="premium-btn" aria-label="Search entries">
          <FiSearch size={17} />
        </button>
      </div>
    </form>
  );
};

export default SearchBox;
