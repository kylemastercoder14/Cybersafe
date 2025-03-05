"use client";

import { Search } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { DATA } from "@/data/data";

const SearchContainer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<
    {
      id: number;
      title: string;
      slug: string;
      thumbnail: string;
      dateAdded: string;
      videoUrl: string;
      description: string;
      articleSource: string;
    }[]
  >([]);
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Function to filter suggestions
  const fetchSuggestions = (query: string) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    const filteredResults = DATA.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
    setSuggestions(filteredResults);
  };

  // Debounce effect to optimize search performance
  useEffect(() => {
    setIsSearching(true);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      fetchSuggestions(searchTerm);
      setIsSearching(false);
    }, 300); // Adjust debounce time (300ms)

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [searchTerm]);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle redirection when clicking a suggestion
  const handleSelect = (slug: string) => {
    setSearchTerm(""); // Clear input
    setSuggestions([]); // Clear suggestions
    router.push(`/details/${slug}`); // Redirect to details page
  };

  return (
    <div className="relative">
      {/* Search Input */}
      <div className="bg-white border border-blue-500 w-[800px] h-[40px] rounded-full flex items-center justify-between pr-1 pl-5">
        <input
          type="text"
          className="bg-transparent border-none outline-none text-sm w-full"
          placeholder="Search anything here..."
          value={searchTerm}
          onChange={handleChange}
        />
        <button className="bg-blue-600 rounded-full py-2 px-4">
          <Search className="w-4 h-4 text-white" />
        </button>
      </div>

      {/* Suggestions Dropdown */}
      {searchTerm && suggestions.length > 0 && (
        <div className="absolute top-full left-0 w-full bg-white border border-gray-300 shadow-md rounded-lg mt-2 max-h-60 overflow-y-auto">
          {isSearching ? (
            <div className="p-2 text-gray-500">Searching...</div>
          ) : (
            suggestions.map((item) => (
              <div
                key={item.id}
                className="p-3 cursor-pointer hover:bg-blue-100 transition"
                onClick={() => handleSelect(item.slug)}
              >
                {item.title}
              </div>
            ))
          )}
        </div>
      )}

      {/* No results message */}
      {searchTerm && !isSearching && suggestions.length === 0 && (
        <p className="absolute top-full left-0 w-full bg-white border border-gray-300 shadow-md rounded-lg mt-2 p-3 text-gray-500">
          No results found.
        </p>
      )}
    </div>
  );
};

export default SearchContainer;
