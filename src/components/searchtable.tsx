"use client"

import { useState, useRef } from 'react';
import { FiSearch } from "react-icons/fi";
import { IoAdd, IoCheckmark } from "react-icons/io5";
import { addToCart } from "@/redux/shoppingSlice";
import { useDispatch, useSelector } from "react-redux";
import Container from "@/components/container";
import { Flora, StateProps } from "../../type";


const SearchTable = () => {
  const { floraData } = useSelector((state: StateProps) => state?.shopping);
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Flora[]>([]);
  const [error, setError] = useState('');

  // Helper function to check if item is in cart
  const isInCart = (plantId: number) => {
    return floraData?.some((item: Flora) => item.id === plantId) || false;
  };

  // Filter states
  const [selectedMonths, setSelectedMonths] = useState<number[]>([]);
  const [selectedEdibleParts, setSelectedEdibleParts] = useState<string[]>([]);
  const [selectedThreatLevels, setSelectedThreatLevels] = useState<string[]>([]);
  const [filterEvergreen, setFilterEvergreen] = useState(false);
  const [filterNative, setFilterNative] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  // Sort plants function: Dutch first, then English, then Latin only; short names before subspecies
  const sortPlants = (plants: Flora[]): Flora[] => {
    return [...plants].sort((a, b) => {
      // 1. Plants with Dutch name come first
      const aHasDutch = !!a.dutch_name;
      const bHasDutch = !!b.dutch_name;

      if (aHasDutch && !bHasDutch) return -1;
      if (!aHasDutch && bHasDutch) return 1;

      // 2. If neither has Dutch, prefer English name
      if (!aHasDutch && !bHasDutch) {
        const aHasEnglish = !!a.english_name;
        const bHasEnglish = !!b.english_name;

        if (aHasEnglish && !bHasEnglish) return -1;
        if (!aHasEnglish && bHasEnglish) return 1;
      }

      // 3. Within same category, prefer shorter Latin names (no subspecies)
      // Subspecies typically have 3+ words in latin_name (e.g., "Genus species subspecies")
      const aWords = a.latin_name.split(' ').length;
      const bWords = b.latin_name.split(' ').length;
      const aHasSubspecies = aWords > 2;
      const bHasSubspecies = bWords > 2;

      if (!aHasSubspecies && bHasSubspecies) return -1;
      if (aHasSubspecies && !bHasSubspecies) return 1;

      // 4. Finally, alphabetically by Latin name
      return a.latin_name.localeCompare(b.latin_name, 'nl');
    });
  };

  const handleTextSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    // Check if any filters are active
    const hasActiveFilters = selectedMonths.length > 0 || selectedEdibleParts.length > 0 || selectedThreatLevels.length > 0 || filterEvergreen || filterNative;

    // Validation: require 3 letters without filters, but allow empty search with filters
    if (!hasActiveFilters && query.length < 3) {
      setError('Voer minimaal 3 letters in of selecteer een filter');
      return;
    }

    try {
      // Map selectedOption to searchType format
      let searchType = 'all';
      if (selectedOption === 'dutchnam') searchType = 'dutch';
      if (selectedOption === 'latinnam') searchType = 'latin';

      // Build URL parameters including filters
      const params = new URLSearchParams({
        search: query,
        searchType: searchType,
        limit: '2000'
      });

      // Add filter parameters if active
      if (selectedMonths.length > 0) {
        params.append('months', selectedMonths.join(','));
      }
      if (selectedEdibleParts.length > 0) {
        params.append('edibleParts', selectedEdibleParts.join(','));
      }
      if (selectedThreatLevels.length > 0) {
        params.append('threatLevels', selectedThreatLevels.join(','));
      }
      if (filterEvergreen) {
        params.append('evergreen', 'true');
      }
      if (filterNative) {
        params.append('native', 'true');
      }

      // Make single API call with all filters
      const response = await fetch(`https://alomnify-api-production.alomnify.workers.dev/api/plants?${params}`);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      // Sort results before setting state
      const sortedPlants = sortPlants(data.plants);
      setResults(sortedPlants);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const [selectedOption, setSelectedOption] = useState("dutchnam");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedOption(event.target.value);
  };

  // Filter handlers
  const handleMonthToggle = (month: number) => {
    setSelectedMonths(prev =>
      prev.includes(month) ? prev.filter(m => m !== month) : [...prev, month]
    );
  };

  const handleEdiblePartToggle = (part: string) => {
    setSelectedEdibleParts(prev =>
      prev.includes(part) ? prev.filter(p => p !== part) : [...prev, part]
    );
  };

  const handleThreatLevelToggle = (threat: string) => {
    setSelectedThreatLevels(prev =>
      prev.includes(threat) ? prev.filter(t => t !== threat) : [...prev, threat]
    );
  };

  const months = [
    { num: 1, name: 'Januari' },
    { num: 2, name: 'Februari' },
    { num: 3, name: 'Maart' },
    { num: 4, name: 'April' },
    { num: 5, name: 'Mei' },
    { num: 6, name: 'Juni' },
    { num: 7, name: 'Juli' },
    { num: 8, name: 'Augustus' },
    { num: 9, name: 'September' },
    { num: 10, name: 'Oktober' },
    { num: 11, name: 'November' },
    { num: 12, name: 'December' }
  ];

  const edibleParts = [
    'vruchten', 'zaden', 'boon', 'bloemen', 'bladeren',
    'wortels', 'sap', 'olie', 'jonge scheuten', 'stengel', 'stam'
  ];

  const threatLevels = [
    { value: 'ernstig bedreigd', label: 'Ernstig bedreigd' },
    { value: 'bedreigd', label: 'Bedreigd' },
    { value: 'kwetsbaar', label: 'Kwetsbaar' },
    { value: 'gevoelig', label: 'Gevoelig' }
  ];


  return (
    <Container>
    <div className="bg-white/30 p-3 sm:p-6 md:p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg mx-auto w-full">
      {/* Photo Identification Notice */}
      <div className="mb-4 bg-green-50 border-l-4 border-green-500 p-4 rounded">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-green-700">
              <strong>📸 Planten identificeren met foto's?</strong> Download de <strong>Alomnify app</strong> voor iOS en Android.
              Alleen de app beschikt over camera- en foto-identificatie functionaliteit.
            </p>
          </div>
        </div>
      </div>

      {/* Filters Toggle Button */}
      <div className="mb-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition-colors duration-200"
        >
          {showFilters ? 'Verberg filters' : 'Toon filters'}
        </button>
      </div>

      {/* Filters Section */}
      {showFilters && (
        <div className="bg-white/50 p-3 sm:p-4 md:p-6 rounded-lg mb-6 space-y-4">
          {/* Bloeimaanden Filter */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">Bloeimaanden:</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {months.map(month => (
                <label key={month.num} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedMonths.includes(month.num)}
                    onChange={() => handleMonthToggle(month.num)}
                    className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                  />
                  <span className="text-sm text-gray-700">{month.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Eetbaarheid Filter */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">Eetbare delen:</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {edibleParts.map(part => (
                <label key={part} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedEdibleParts.includes(part)}
                    onChange={() => handleEdiblePartToggle(part)}
                    className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                  />
                  <span className="text-sm text-gray-700 capitalize">{part}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Bedreigd Filter */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">Bedreigingsstatus:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
              {threatLevels.map(threat => (
                <label key={threat.value} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedThreatLevels.includes(threat.value)}
                    onChange={() => handleThreatLevelToggle(threat.value)}
                    className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                  />
                  <span className="text-sm text-gray-700">{threat.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Groenblijvend Filter */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">Overige filters:</h3>
            <div className="space-y-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filterEvergreen}
                  onChange={(e) => setFilterEvergreen(e.target.checked)}
                  className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                />
                <span className="text-sm text-gray-700">Alleen groenblijvende planten</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filterNative}
                  onChange={(e) => setFilterNative(e.target.checked)}
                  className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                />
                <span className="text-sm text-gray-700">Alleen inheemse planten</span>
              </label>
            </div>
          </div>

          {/* Active filters count */}
          {(selectedMonths.length > 0 || selectedEdibleParts.length > 0 || selectedThreatLevels.length > 0 || filterEvergreen || filterNative) && (
            <div className="pt-2 border-t border-gray-300">
              <p className="text-sm text-gray-600">
                Actieve filters: {selectedMonths.length + selectedEdibleParts.length + selectedThreatLevels.length + (filterEvergreen ? 1 : 0) + (filterNative ? 1 : 0)}
                <button
                  onClick={() => {
                    setSelectedMonths([]);
                    setSelectedEdibleParts([]);
                    setSelectedThreatLevels([]);
                    setFilterEvergreen(false);
                    setFilterNative(false);
                    setResults([]); // Clear search results when clearing filters
                  }}
                  className="ml-4 text-orange-600 hover:text-orange-700 underline"
                >
                  Wis alle filters
                </button>
              </p>
            </div>
          )}
        </div>
      )}

      {/* Text Search */}
      <div>
        {/* Desktop search - hidden on mobile */}
        <form onSubmit={handleTextSearch} className="w-full bg-white hidden md:flex items-center gap-x-1 border-[1px] border-lightText/50 rounded-full px-5 py-0 focus-within:border-orange-600 group">
          <div className="flex grow">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Zoek een plant..."
              className="border-white grow"
            />
          </div>
          <div className="">
            <FiSearch className="text-gray-500 group-focus-within:text-darkText duration-200" />
          </div>
          <div className="">
            <button type="submit" className="bg-black hover:bg-slate-950 rounded-full text-xs text-slate-100 hover:text-white flex items-center justify-center gap-x-1 px-3 py-1.5 border-[2px] border-gray-400 hover:border-orange-600 duration-200 relative">Zoeken</button>
          </div>
        </form>

        {/* Mobile search - hidden on desktop */}
        <form onSubmit={handleTextSearch} className="md:hidden bg-white rounded-lg border-[2px] border-gray-300 focus-within:border-orange-600 overflow-hidden">
          {/* Search type selector */}
          <div className="px-4 pt-3 pb-2 border-b border-gray-200">
            <p className="text-xs text-gray-600 mb-2">Zoek op:</p>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="dutchnam"
                  checked={selectedOption === "dutchnam"}
                  onChange={handleChange}
                  className="text-orange-600 focus:ring-orange-500"
                />
                <span className="text-sm">Nederlandse naam</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="latinnam"
                  checked={selectedOption === "latinnam"}
                  onChange={handleChange}
                  className="text-orange-600 focus:ring-orange-500"
                />
                <span className="text-sm">Latijnse naam</span>
              </label>
            </div>
          </div>

          {/* Search input */}
          <div className="flex items-center gap-2 px-4 py-3">
            <FiSearch className="text-gray-500 flex-shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Zoek een plant..."
              className="flex-1 border-0 outline-none text-sm"
            />
          </div>

          {/* Search button */}
          <div className="px-4 pb-3">
            <button type="submit" className="w-full bg-black hover:bg-slate-950 text-slate-100 hover:text-white py-2.5 rounded-lg border-[2px] border-gray-400 hover:border-orange-600 duration-200 text-sm font-medium">
              Zoeken
            </button>
          </div>
        </form>
      </div>


      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {/* Results summary */}
      {results.length > 0 && (
        <div className="mt-4 mb-2 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800 text-sm font-medium">
            {results.length} {results.length === 1 ? 'plant gevonden' : 'planten gevonden'}
            {(selectedMonths.length > 0 || selectedEdibleParts.length > 0 || selectedThreatLevels.length > 0 || filterEvergreen || filterNative) && (
              <span className="ml-2 text-green-700">
                (gefilterd op {[
                  selectedMonths.length > 0 && `${selectedMonths.length} maand${selectedMonths.length > 1 ? 'en' : ''}`,
                  selectedEdibleParts.length > 0 && `${selectedEdibleParts.length} eetba${selectedEdibleParts.length > 1 ? 're delen' : 'ar deel'}`,
                  selectedThreatLevels.length > 0 && `${selectedThreatLevels.length} bedreigingsstatus${selectedThreatLevels.length > 1 ? 'sen' : ''}`,
                  filterEvergreen && 'groenblijvend',
                  filterNative && 'inheems'
                ].filter(Boolean).join(', ')})
              </span>
            )}
          </p>
        </div>
      )}

      <br />
      {/* Desktop table view - hidden on mobile */}
      <table className="hidden md:table table-auto border-collapse border border-gray-400 w-full text-left">
      <thead>
        <tr>
          <th className="border border-gray-300 px-2 py-2">Nr</th>
          <th className="border border-gray-300 px-2 py-2"><label><input type="radio" value="dutchnam" checked={selectedOption === "dutchnam"} onChange={handleChange}/> Nederlandse naam</label></th>
          <th className="border border-gray-300 px-2 py-2">Engelse naam</th>
          <th className="border border-gray-300 px-2 py-2"><label><input type="radio" value="latinnam" checked={selectedOption === "latinnam"} onChange={handleChange}/> Latijnse naam</label></th>
          <th className="border border-gray-300 px-2 py-2">Type plant</th>
          <th className="border border-gray-300 px-2 py-2">Bedreigd</th>
          <th className="border border-gray-300 px-2 py-2">Inheems</th>
          <th className="border border-gray-300 px-2 py-2">Eetbaar</th>
          <th className="border border-gray-300 px-2 py-2">Bloeimaanden</th>
          <th className="border border-gray-300 px-2 py-2">Groenblijvend</th>
          <th className="border border-gray-300 px-2 py-2">Voeg toe</th>
        </tr>
      </thead>
      <tbody>
        {results.map((florum, index) => {
          const inCart = isInCart(florum.id);
          return (
            <tr key={`${florum.id}-${index}`}>
              <td className="border border-gray-300 px-2 py-2">{florum.id}</td>
              <td className="border border-gray-300 px-2 py-2 font-semibold">{florum?.dutch_name}</td>
              <td className="border border-gray-300 px-2 py-2 text-gray-600 text-sm">{florum?.english_name}</td>
              <td className="border border-gray-300 px-2 py-2 italic text-gray-600 text-sm">{florum.latin_name}</td>
              <td className="border border-gray-300 px-2 py-2">{florum?.plant_type}</td>
              <td className="border border-gray-300 px-2 py-2">{florum?.be_dreigd}</td>
              <td className="border border-gray-300 px-2 py-2">{florum?.in_heems}</td>
              <td className="border border-gray-300 px-2 py-2">{florum?.eet_baar}</td>
              <td className="border border-gray-300 px-2 py-2">{florum?.bloei_tijd}</td>
              <td className="border border-gray-300 px-2 py-2">{florum?.groen_blijvend}</td>
              <td className="border border-gray-300 px-2 py-2">
                <button
                  onClick={() => dispatch(addToCart(florum))}
                  disabled={inCart}
                  className={`btn btn-outline rounded-full px-2 py-1 text-sm flex items-center border-[2px] duration-200 relative ${
                    inCart
                      ? 'bg-gray-300 text-gray-600 border-gray-400 cursor-not-allowed'
                      : 'bg-darkText text-slate-100 border-gray-400 hover:border-orange-600'
                  }`}
                >
                  {inCart ? 'toegevoegd' : 'toevoegen'}
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>

      {/* Mobile card view - hidden on desktop */}
      <div className="md:hidden space-y-3">
        {results.map((florum, index) => {
          const inCart = isInCart(florum.id);
          return (
            <div key={`${florum.id}-${index}`} className="bg-white rounded-xl p-4 border-2 border-gray-200 shadow-sm">
              <div className="flex gap-3">
                {/* Plant Info */}
                <div className="flex-1">
                  <div className="flex items-start mb-1">
                    <h3 className="text-base font-bold text-green-700 flex-1">
                      {florum?.dutch_name || 'Geen Nederlandse naam'}
                    </h3>
                  </div>
                  {florum?.english_name && (
                    <p className="text-sm text-gray-600 mb-1">{florum.english_name}</p>
                  )}
                  <p className="text-sm italic text-gray-600 mb-3">{florum.latin_name}</p>

                  <div className="space-y-1">
                    <p className="text-xs text-gray-700"><span className="font-semibold">Type:</span> {florum?.plant_type}</p>
                    {florum?.bloei_tijd && (
                      <p className="text-xs text-gray-700"><span className="font-semibold">Bloeitijd:</span> {florum.bloei_tijd}</p>
                    )}
                    {florum?.in_heems && (
                      <p className="text-xs text-gray-700"><span className="font-semibold">Inheems:</span> {florum.in_heems}</p>
                    )}
                    {florum?.groen_blijvend && (
                      <p className="text-xs text-gray-700"><span className="font-semibold">Groenblijvend:</span> {florum.groen_blijvend}</p>
                    )}
                    {florum?.be_dreigd && florum.be_dreigd !== 'niet bedreigd' && (
                      <p className="text-xs text-red-600 font-semibold">⚠️ {florum.be_dreigd}</p>
                    )}
                    {florum?.eet_baar && florum.eet_baar.toLowerCase() !== 'niet eetbaar' && (
                      <p className="text-xs text-green-600 font-semibold">🍽️ {florum.eet_baar}</p>
                    )}
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => dispatch(addToCart(florum))}
                  disabled={inCart}
                  className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                    inCart
                      ? 'bg-gray-300 border-gray-400 cursor-not-allowed'
                      : 'bg-blue-500 border-gray-400 hover:border-orange-600'
                  }`}
                  title={inCart ? 'Al toegevoegd' : 'Toevoegen aan winkelwagen'}
                >
                  {inCart ? (
                    <IoCheckmark className="text-gray-600 text-xl" />
                  ) : (
                    <IoAdd className="text-white text-xl" />
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    </Container>
  );
};

export default SearchTable;