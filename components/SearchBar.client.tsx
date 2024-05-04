"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import PokemonImage from "./PokemonImage";

export default function SearchBar() { 
  const [pokemonData, setPokemonData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [offset, setOffset] = useState<number>(0);
  const [pokemonDict, setPokemonDict] = useState({ japanese: '', english: '' });
  const [pokemonNames, setPokemonNames] = useState();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const loadLimit = 20;
  const maxNormalPokemon = 1025;
  const maxSpecialPokemon = 277;
  const maxPokemon = maxNormalPokemon + maxSpecialPokemon;

  useEffect(() => {
    try {
      fetchPokemon();
      fetchPokemonDict(2);
    } catch(err) {
      console.log(err);
    }
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
  
    const fetchPokemonDict = async (number: number) => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${number}`);
        const names = response.data.names.map((name:any) => {return name});
        const japaneseName = names.find((item: any) => {return item.language.name === 'ja-Hrkt' ? item.name : null});
        const englishName = names.find((item: any) => {return item.language.name === 'en' ? item.name : null});
        console.log(englishName.name.toLowerCase());
        setPokemonDict({
          japanese: japaneseName ? japaneseName.name : '日本語なし',
          english: englishName ? englishName.name.toLowerCase() : '英語なし'
        });
      } catch(err) {
        console.log(err);
      }
    };

  // const handleSearch = () => {
  //   const foundPokemon = pokemonNames.find(poke => poke.japaneseName === searchTerm);
  //   if (foundPokemon) {
  //     console.log(foundPokemon.englishName);
  //     fetchPokemonImageByName(foundPokemon.englishName);
  //   } else {
  //     console.log("No matching Pokémon found.");
  //     setPokemonData([]);
  //   }
  // };

  return (
    <div className="container mx-auto px-6 py-4 bg-blue-100">
      <div className="flex items-center py-4">
        <input
          type="text"
          placeholder="ポケモンの名前を入力"
          className="text-black rounded-l py-2 px-4 w-1/2 shadow-md rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="ml-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 mx-4 rounded-r shadow-md rounded"
          // onClick={handleSearch}
        >Search</button>
      </div>
      <div className="bg-white flex shadow-md rounded p-4 overflow-x-auto whitesace-nowrap">
        {loading 
          ? <div className="text-black h-[100px] w-[100px] mx-4 flex items-center justify-center shadow-md text-gray-400">Loading...</div>
          : pokemonData.map(pokemon => (
            <PokemonImage key={pokemon.id} pokemon={pokemon}/>
          ))
        }
        {offset < maxPokemon && (
          <button onClick={fetchPokemon} className="text-black h-[100px] w-[100px] mx-4 flex items-center justify-center shadow-md">
              追加表示
          </button>
        )}
      </div>
    </div>
  );
}