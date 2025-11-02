import { Search } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import useSearchMovies from '@/lib/useSearchMovies';
import useDebounce from '@/lib/useDebounce';

const SearchBar = () => {
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);

  const search = useSearchMovies();

  const handleSearchQueryChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const query = e.target.value;
      await search(query);
      navigate({
        to: '/search',
        search: query ? { movie: query } : {},
      });
    },
    [search, navigate]
  );

  const handleDebouncedSearchQueryChange = useDebounce(handleSearchQueryChange);

  return (
    <div className="flex items-center gap-2 text-white">
      {showSearch && (
        <input
          autoFocus
          onChange={handleDebouncedSearchQueryChange}
          onBlur={() => setShowSearch(false)}
          type="text"
          placeholder="Search"
          className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-white-500 text-grey-800"
        />
      )}
      <button
        aria-label="Search Movie"
        onClick={() => setShowSearch(true)}
        className="text-white"
      >
        <Search />
      </button>
    </div>
  );
};

export default SearchBar;
