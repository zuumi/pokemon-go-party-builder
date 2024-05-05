"use client";

import PokemonCard from "./PokemonCard.client";
import PartyEvaluation from '../components/PartyEvaluation';
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CreateParty() {
  const [images, setImages] = useState(['', '', '']);
  const [loading, setLoading] = useState<boolean>(true);
  const [pokemonGoData, setPokemonGoData] = useState<any[]>([]);

  const handleSetImage = (index: number, url: string) => {
    const newImages = [...images];
    newImages[index] = url;
    setImages(newImages);
  };

  useEffect(() => {
    try {
      fetchPokemonGoData();
    } catch(err) {
      console.log(err);
    }
  }, []);

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

  return (
    <div className="container mx-auto px-6 py-4 bg-blue-100 shadow-md rounded h-full">
      <div className="container mx-auto py-4">
        <div className="flex items-center bg-blue-100">
          {/* Comming Soooooon!!! */}
          {/* <input type="text" placeholder="Party Name" className="text-black rounded-l py-2 px-4 w-1/2 shadow-md rounded" /> */}
          {/* <button className="ml-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 mx-4 rounded-r shadow-md rounded">Create</button> */}
        </div>
      </div>
      <div className="bg-white shadown-md rounded p-4 flex justify-between space-x-4 overflow-x-auto whitespace-nowrap">
      {images.map((image, index) => (
        <PokemonCard
          key={index}
          image={image}
          setImage={
            (url: any) => handleSetImage(index, url)}
          pokemonGoData={pokemonGoData}
        />
      ))}
      </div>
      <div className="bg-white shadow-md rounded p-4 my-4 h-[200px] w-full">
        <PartyEvaluation />
      </div>
    </div>
  );
}