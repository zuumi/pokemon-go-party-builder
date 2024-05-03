"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

export default function PokemonImage({ pokemon }: {
  pokemon: any;
}) {
    const [japaneseName, setJapaneseName] = useState('');

    useEffect(() => {
      const fetchPokemonName = async () => {
        try {
          const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.name}`);
          const japanese = response.data.names.find((name:any) => name.language.name === 'ja-Hrkt');
          setJapaneseName(japanese ? japanese.name : '日本語名前がありません。');
        } catch(err) {
          setJapaneseName('');
        }
      };

      fetchPokemonName();
    },[pokemon.name]);

    const handleDragStart = (e: any) => {
      e.dataTransfer.setData("text/plain", pokemon.id);
    };

    return (
      <img
        draggable="true"
        onDragStart={handleDragStart}
        key={pokemon.id}
        className="text-black h-[100px] w-[100px] mx-4 flex items-center justify-center shadow-md"
        src={pokemon.sprites.other['official-artwork'].front_default}
        alt={japaneseName}
      />
    );
}