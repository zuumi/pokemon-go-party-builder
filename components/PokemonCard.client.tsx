"use client";

import React, { useState } from "react";

export default function PokemonCard({ image, setImage, pokemonGoData }) {
  const [pokemonId, setPokemonId] = useState<number>(0);
  const [pokemonData, setPokemonData] = useState<any>();

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
    <div className="bg-white shadow-md rounded p-4 w-[500px] h-[800px]">
      <div
          className="bg-cover bg-center h-[300px] w-[300px] mx-auto mt-3 flex items-center justify-center"
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
      <div className="h-[500px] w-[300px] py-10 mx-auto">
        <div className="text-black py-4">
          <p>タイプ１:{image && pokemonData.primaryType.names.Japanese}</p>
          <p>{image && pokemonData.secondaryType && `タイプ２:${pokemonData.secondaryType.names.Japanese}`}</p>
          <p>{image && !pokemonData.secondaryType && `-`}</p>
        </div>
        <label htmlFor="" className="text-black flex">
          Normal 
          <select className="block text-black w-full ml-4 mb-2 p-2 border rounded">
            {
              image && pokemonData.quickMoves &&
              Object.values(pokemonData.quickMoves).map((quickMove: any, index: number) => {
                  return (<option key={index} className="text-black">{quickMove.names.Japanese}</option>)
                }
              )
            }
            {
              image && pokemonData.eliteQuickMoves &&
              Object.values(pokemonData.eliteQuickMoves).map((quickMove: any, index: number) => {
                  return (<option key={index} className="text-black">*{quickMove.names.Japanese}</option>)
                }
              )
            }
          </select>
        </label>
        <label htmlFor="" className="text-black flex">
          Special1
          <select className="block text-black w-full ml-2 mb-2 p-2 border rounded">
            {
              image && pokemonData.cinematicMoves &&
              Object.values(pokemonData.cinematicMoves).map((cinematicMove: any, index: number) => {
                return (<option key={index} className="text-black">{cinematicMove.names.Japanese}</option>)
              })
            }
            {
              image && pokemonData.eliteCinematicMoves &&
              Object.values(pokemonData.eliteCinematicMoves).map((cinematicMove: any, index: number) => {
                return (<option key={index} className="text-black">*{cinematicMove.names.Japanese}</option>)
              })
            }
          </select>
        </label>
        <label htmlFor="" className="text-black flex">
          Special2
          <select className="block text-black w-full ml-2 mb-2 p-2 border rounded">
            {
              image && pokemonData.cinematicMoves &&
              Object.values(pokemonData.cinematicMoves).map((cinematicMove: any, index: number) => {
                return (<option key={index} className="text-black">{cinematicMove.names.Japanese}</option>)
              })
            }
            {
              image && pokemonData.eliteCinematicMoves &&
              Object.values(pokemonData.eliteCinematicMoves).map((cinematicMove: any, index: number) => {
                return (<option key={index} className="text-black">*{cinematicMove.names.Japanese}</option>)
              })
            }
          </select>
        </label>
        <div className="text-black py-10 p-2">
          <label htmlFor="">必要なターン数
            <p>Special1: {`${3}-${4}-${5}`}</p>
            <p>Special2: {`${3}-${4}-${5}`}</p>
          </label>
        </div>
      </div>
    </div>
  );
}