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
  const handleTextSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();  
    setError('');
  
    try {
      // Map selectedOption to searchType format
      let searchType = 'all';
      if (selectedOption === 'dutchnam') searchType = 'dutch';
      if (selectedOption === 'latinnam') searchType = 'latin';
      
      const params = new URLSearchParams({
        search: query,
        searchType: searchType,
        limit: '100'
      });
      
      const response = await fetch(`https://alomnify-api-staging.alomnify.workers.dev/api/plants?${params}`);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      
      // Use backend response directly with correct property names
      const transformedResults = data.plants;
      
      setResults(transformedResults);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const [selectedOption, setSelectedOption] = useState("dutchnam");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedOption(event.target.value);
  };


  return (
    <Container>
    <div className="bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg mx-auto w-full">
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
          <th className="border border-gray-300 px-2 py-2">Bloemkleur</th>
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
            <td className="border border-gray-300 px-2 py-2">{florum?.bloem_kleur}</td>
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