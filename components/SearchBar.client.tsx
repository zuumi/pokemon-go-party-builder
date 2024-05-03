"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
// import PokemonImage from "./PokemonImage";

export default function SearchBar() { 
  const [pokemonData, setPokemonData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20');
      const promises = response.data.results.map(
        async (pokemon: any) => {
          const pokemonDetails = await axios.get(pokemon.url);
          return pokemonDetails.data;
        }
      );
      const results = await Promise.all(promises);
      setPokemonData(results);
      console.log(results);
      setLoading(false);
    }
    fetchPokemon();
  }, []);

  // if (loading) {
  //   return (
  //     <div className="container mx-auto px-6 py-4 bg-blue-100">
  //     <div className="flex items-center py-4">
  //       <input type="text" placeholder="Pokemon Search" className="text-black rounded-l py-2 px-4 w-1/2 shadow-md rounded" />
  //       <button className="ml-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 mx-4 rounded-r shadow-md rounded">Search</button>
  //     </div>
  //     <div className="bg-white flex shadow-md rounded p-4 overflow-x-auto whitesace-nowrap">
  //       <div className="text-black bg-gray-300 h-[100px] w-[100px] mx-4 flex items-center justify-center text-gray-700">Loading...</div>
  //     </div>
  //   </div>
  //   )
  // }
  return (
    <div className="container mx-auto px-6 py-4 bg-blue-100">
      <div className="flex items-center py-4">
        <input type="text" placeholder="Pokemon Search" className="text-black rounded-l py-2 px-4 w-1/2 shadow-md rounded" />
        <button className="ml-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 mx-4 rounded-r shadow-md rounded">Search</button>
      </div>
      <div className="bg-white flex shadow-md rounded p-4 overflow-x-auto whitesace-nowrap">
        {loading 
          ? <div className="text-black h-[100px] w-[100px] mx-4 flex items-center justify-center  shadow-md text-gray-400">Loading...</div>
          : pokemonData.map(pokemon => (
            <img key={pokemon.id} className="text-black h-[100px] w-[100px] mx-4 flex items-center justify-center shadow-md" src={pokemon.sprites.other['official-artwork'].front_default} alt="Pokemon" />
          ))
        }
        {/* {loading 
          ? <div className="text-black h-[100px] w-[100px] mx-4 flex items-center justify-center  shadow-md text-gray-400">Loading...</div>
          : pokemonData.map(pokemon => (
            // <img key={pokemon.id}  src={pokemon.sprites.other['official-artwork'].front_default} alt="Pokemon" />
            <PokemonImage key={pokemon.id} image={pokemon.sprites.other['official-artwork'].front_default} />
          ))
        } */}
      </div>
    </div>
  );
}