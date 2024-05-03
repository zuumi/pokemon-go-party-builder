"use client";

import PokemonCard from "./PokemonCard.client";
import PartyEvaluation from '../components/PartyEvaluation';
import React, { useState } from "react";

export default function CreateParty() {
  const [images, setImages] = useState(['', '', '']);

  const handleSetImage = (index: number, url: string) => {
    const newImages = [...images];
    newImages[index] = url;
    setImages(newImages);
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
            (url: any) => handleSetImage(index, url)}/>
      ))}
      </div>
      <div className="bg-white shadow-md rounded p-4 my-4 h-[200px] w-full">
        <PartyEvaluation />
      </div>
    </div>
  );
}