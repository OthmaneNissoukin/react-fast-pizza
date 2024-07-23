import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (!searchQuery) return;

    setSearchQuery("");
    navigate(`/order/${searchQuery}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="search order #"
        className="focus:ring-offset rounded-full bg-yellow-300 px-2 py-1 transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-400 sm:w-72 sm:px-4 sm:hover:w-96 sm:focus:w-96"
      />
    </form>
  );
}

export default SearchOrder;
