// "use client";

// import React, { useState, useEffect } from "react";

export default function PokemonImage({ pokemon }: {
  pokemon: any;
}) {
    const handleDragStart = (e: any) => {
      e.dataTransfer.setData("text/plain", pokemon.dexNr);
    };
    console.log();
    return (
      <img
        draggable="true"
        onDragStart={handleDragStart}
        key={pokemon.dexNr}
        className="text-black h-[120px] w-[250px] mx-4 flex items-center justify-center shadow-md"
        src={pokemon.assets && pokemon.assets.image}
        alt='japaneseName'
      />
    );
}