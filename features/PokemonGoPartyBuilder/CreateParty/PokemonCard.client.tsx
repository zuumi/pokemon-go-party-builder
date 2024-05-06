"use client";

import React, { useState } from "react";
import PokemonStatus from "./PokemonStatus";
import { useDispatch } from "react-redux";

export default function PokemonCard({ index, image, setImage, pokemonGoData, actionCreator }) {
  const [pokemonId, setPokemonId] = useState<number>(0);
  const [pokemonData, setPokemonData] = useState<any>();
  const dispach = useDispatch();

  const handleDragOver = (e: any) => {
    e.preventDefault(); // デフォルトの挙動を防ぐ
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    const pokemonId = Number(e.dataTransfer.getData("text/plain"));
    const dropedPokemon: any = pokemonGoData.find(
      (pokemon: any) => {
        return pokemon.dexNr === pokemonId ? pokemon : null;
      }
    );
    if (dropedPokemon.assets) {
      setPokemonId(pokemonId);
      setImage(dropedPokemon.assets.image);
      setPokemonData(dropedPokemon);
      const data = {
        index: index,
        id: dropedPokemon.dexNr,
        name: dropedPokemon.names.Japanese
      }
      dispach(actionCreator(data));
    } else {
      console.log("No matching Pokemon found.");
      setPokemonId(pokemonId);
      setImage("");
    }
  };

  const handleDragStart = (pokemonId: number) => (e: any) => {
    e.dataTransfer.setData("text/plain", pokemonId);
  };

  return (
    <div className="bg-white shadow-md rounded px-4 pt-2 w-[500px] h-[820px]">
      <div className="flex">
        <div className="text-black flex mr-auto">{pokemonData && pokemonData.names.Japanese}</div>
        <div className="text-black flex mr-2">{ pokemonData ? `MAXCP(Lv.50):${Math.floor(
          ( (pokemonData.stats.attack+15) 
            * Math.sqrt(pokemonData.stats.stamina+15)
            * Math.sqrt(pokemonData.stats.defense+15)
            * 0.8403
          )/10)}`: ''}</div>
      </div>
      <div
          className="bg-cover bg-center h-[300px] w-[300px] mx-auto flex items-center justify-center"
          style={{ backgroundImage: "url('/pokemonGG_backimage.jpeg')" }}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
      >
        {!image && (
          <div
            className="bg-white bg-opacity-30 text-black h-full w-full flex items-center justify-center text-bold"
          >
            ここにドラッグ＆ドロップして下さい
          </div>
        )}
        {image && (
            <img
              draggable="true"
              onDragStart={handleDragStart(pokemonId)}
              key={pokemonId.toString()}
              src={image}
              alt={`Dropped Pokemon`}
            />
          )
        }
      </div>
      <div className="h-[500px] w-[300px] pt-5 mx-auto">
        <PokemonStatus pokemonData={pokemonData} image={image}/>
      </div>
    </div>
  );
}