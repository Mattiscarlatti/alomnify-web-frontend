"use client"

import { useState, useRef } from 'react';
import { FiSearch } from "react-icons/fi";
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

  // Filter states
  const [selectedMonths, setSelectedMonths] = useState<number[]>([]);
  const [selectedEdibleParts, setSelectedEdibleParts] = useState<string[]>([]);
  const [selectedThreatLevels, setSelectedThreatLevels] = useState<string[]>([]);
  const [filterEvergreen, setFilterEvergreen] = useState(false);
  const [filterNative, setFilterNative] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
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
      setResults(data.plants);
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
    <div className="bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg mx-auto w-full">
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
        <div className="bg-white/50 p-6 rounded-lg mb-6 space-y-4">
          {/* Bloeimaanden Filter */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Bloeimaanden:</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
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
            <h3 className="font-semibold text-gray-800 mb-2">Eetbare delen:</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
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
            <h3 className="font-semibold text-gray-800 mb-2">Bedreigingsstatus:</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
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
            <h3 className="font-semibold text-gray-800 mb-2">Overige filters:</h3>
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
      <table className="table-auto border-collapse border border-gray-400 w-full text-left">
      <thead>
        <tr>
          <th className="border border-gray-300 px-2 py-2">Nr</th>
          <th className="border border-gray-300 px-2 py-2"><label><input type="radio" value="latinnam" checked={selectedOption === "latinnam"} onChange={handleChange}/> Latijnse naam</label></th>
          <th className="border border-gray-300 px-2 py-2"><label><input type="radio" value="dutchnam" checked={selectedOption === "dutchnam"} onChange={handleChange}/> Nederlandse naam</label></th>
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
        {results.map((florum, index) => (
          <tr key={`${florum.id}-${index}`}>
            <td className="border border-gray-300 px-2 py-2">{florum.id}</td>
            <td className="border border-gray-300 px-2 py-2">{florum.latin_name}</td>
            <td className="border border-gray-300 px-2 py-2">{florum?.dutch_name}</td>
            <td className="border border-gray-300 px-2 py-2">{florum?.plant_type}</td>
            <td className="border border-gray-300 px-2 py-2">{florum?.be_dreigd}</td>
            <td className="border border-gray-300 px-2 py-2">{florum?.in_heems}</td>
            <td className="border border-gray-300 px-2 py-2">{florum?.eet_baar}</td>
            <td className="border border-gray-300 px-2 py-2">{florum?.bloei_tijd}</td>
            <td className="border border-gray-300 px-2 py-2">{florum?.groen_blijvend}</td>
            <td className="border border-gray-300 px-2 py-2">
            <button onClick={() => {
              dispatch(addToCart(florum))
            }} 
              className="btn btn-outline rounded-full bg-darkText text-slate-100 px-1 py-1 text-sm flex items-center border-[2px] border-gray-400 hover:border-orange-600 duration-200 relative">
              toevoegen
            </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
    </Container>
  );
};

export default SearchTable;