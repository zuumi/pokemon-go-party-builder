"use client";

import React, { useState } from "react";

export default function PokemonCard({ image, setImage }) {
  const [pokemonId, setPokemonId] = useState(0);

  const handleDragOver = (e: any) => {
    e.preventDefault(); // デフォルトの挙動を防ぐ
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    const pokemonId = e.dataTransfer.getData("text/plain");
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
    setPokemonId(pokemonId);
    setImage(imageUrl);
  };

  const handleDragStart = (pokemonId: number) => (e: any) => {
    e.dataTransfer.setData("text/plain", pokemonId);
  };

  return (
    <div className="bg-white shadow-md rounded p-4 w-[500px] h-[800px]">
      <div
          className="bg-gray-300 mx-auto m h-[300px] w-[300px] flex items-center justify-center text-gray-700"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
      >
        {image
          ? <img
              draggable="true"
              onDragStart={handleDragStart(pokemonId)}
              key={pokemonId}
              src={image}
              alt={`Dropped Pokemon`}
            />
          : "画像がここに表示されます"
        }
      </div>
      <div className="h-[500px] w-[300px] py-10 mx-auto">
        <select className="block text-black w-full mb-2 p-2 border rounded">
          <option>Normal</option>
        </select>
        <select className="block text-black w-full mb-2 p-2 border rounded">
          <option>Special1</option>
        </select>
        <select className="block text-black w-full mb-2 p-2 border rounded">
          <option>Special2</option>
        </select>
        <div className="text-black py-10 p-2">
          <p>Special1: 3-4-5</p>
          <p>Special2: 3-4-5</p>
        </div>
      </div>
    </div>
  );
}