"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
// import PokemonImage from "./PokemonImage";

export default function SearchBar() { 
  const [pokemonData, setPokemonData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [offset, setOffset] = useState<number>(0);
  const loadLimit = 20;
  const maxPokemon = 1302;

  useEffect(() => {
    fetchPokemon();
  }, []);

  const fetchPokemon = async () => {
    if (offset >= maxPokemon) return;
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${loadLimit}&offset=${offset}`);
    const promises = response.data.results.map(
      async (pokemon: any) => {
        const pokemonDetails = await axios.get(pokemon.url);
        return pokemonDetails.data;
      }
    );
    const results = await Promise.all(promises);
    setPokemonData(prev => [...prev, ...results]);
    setOffset(prev => prev + loadLimit);
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-6 py-4 bg-blue-100">
      <div className="flex items-center py-4">
        <input type="text" placeholder="Pokemon Search" className="text-black rounded-l py-2 px-4 w-1/2 shadow-md rounded" />
        <button className="ml-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 mx-4 rounded-r shadow-md rounded">Search</button>
      </div>
      <div className="bg-white flex shadow-md rounded p-4 overflow-x-auto whitesace-nowrap">
        {loading 
          ? <div className="text-black h-[100px] w-[100px] mx-4 flex items-center justify-center shadow-md text-gray-400">Loading...</div>
          : pokemonData.map(pokemon => (
            <img key={pokemon.id} className="text-black h-[100px] w-[100px] mx-4 flex items-center justify-center shadow-md" src={pokemon.sprites.other['official-artwork'].front_default} alt="Pokemon" />
          ))
        }
        {offset < maxPokemon && (
          <button onClick={fetchPokemon} className="text-black h-[100px] w-[100px] flex shadow-md">
              追加表示
          </button>
        )}
      </div>
    </div>
  );
}