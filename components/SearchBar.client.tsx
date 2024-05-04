"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import PokemonImage from "./PokemonImage";

export default function SearchBar() { 
  const [loading, setLoading] = useState<boolean>(true);
  const [filtering, setFiltering] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [pokemonGoData, setPokemonGoData] = useState<any[]>([]);
  const [filteredPokemonGoData, setFilteredPokemonGoData] = useState<any[]>([]);

  useEffect(() => {
    try {
      fetchPokemonGoData();
    } catch(err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    if (filtering) {
      const foundPokemon = pokemonGoData.find(
        (pokemon: any) => {
          return pokemon.names.Japanese === searchTerm ? pokemon: null
        });
      if (foundPokemon) {
        setFilteredPokemonGoData([foundPokemon]);
      } else {
        console.log("No matching Pokémon found.");
        setFilteredPokemonGoData([]);
      }
      setLoading(false);
    }
  }, [filtering, searchTerm, pokemonGoData]);

  const fetchPokemonGoData = async () => {
    try{
      const response = await axios.get(`https://pokemon-go-api.github.io/pokemon-go-api/api/pokedex.json`);
      const results = response.data.map((pokemon: any) =>{
        const alolaPokemon = pokemon.regionForms[`${pokemon.formId}_ALOLA`];
        const galarianPokemon = pokemon.regionForms[`${pokemon.formId}_GALARIAN`];
        const alolaInitNum = 10000;
        const galarianInitNum = 20000;
        if (alolaPokemon && galarianPokemon) {
          alolaPokemon.dexNr = alolaInitNum + alolaPokemon.dexNr;
          galarianPokemon.dexNr = galarianInitNum + galarianPokemon.dexNr;
          return [pokemon, alolaPokemon, galarianPokemon];
        }
        else if (galarianPokemon) {
          galarianPokemon.dexNr = galarianInitNum + galarianPokemon.dexNr;
          return [pokemon, galarianPokemon];
        }
        else if (alolaPokemon) {
          alolaPokemon.dexNr = alolaInitNum + alolaPokemon.dexNr;
          return [pokemon, alolaPokemon];
        }
        return pokemon;
      }).flat();
      setPokemonGoData(results);
      setLoading(false);
    } catch(err) {
      console.log(`error:${err}`);
    }
  };

  const handleSearch = () => {
    setLoading(true);
    setFiltering(true);
  };

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
          onClick={handleSearch}
        >Search</button>
      </div>
      <div className="bg-white flex shadow-md rounded p-4 overflow-x-auto whitesace-nowrap">
      {loading && (
        <div className="text-black h-[100px] w-[100px] mx-4 flex items-center justify-center shadow-md text-gray-400">
          Loading...
        </div>
      )}

      {!loading && filtering && (
        filteredPokemonGoData.map((pokemon: any) => (
          <PokemonImage key={pokemon.dexNr} pokemon={pokemon} />
        ))
      )}

      {!loading && !filtering && (
        pokemonGoData.map((pokemon: any) => (
          <PokemonImage key={pokemon.dexNr} pokemon={pokemon} />
        ))
      )}
      </div>
    </div>
  );
}