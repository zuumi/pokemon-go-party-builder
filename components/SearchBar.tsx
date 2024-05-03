import PokemonImage from "./PokemonImage";

export default function SearchBar() { return (
    <div className="container mx-auto px-6 py-4 bg-blue-100">
      <div className="flex items-center py-4">
        <input type="text" placeholder="Pokemon Search" className="text-black rounded-l py-2 px-4 w-1/2 shadow-md rounded" />
        <button className="ml-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 mx-4 rounded-r shadow-md rounded">Search</button>
      </div>
      <div className="bg-white flex shadow-md rounded p-4 overflow-x-auto whitesace-nowrap">
        <PokemonImage/>
        <PokemonImage/>
        <PokemonImage/>
        <PokemonImage/>
        <PokemonImage/>
        <PokemonImage/>
        <PokemonImage/>
        <PokemonImage/>
        <PokemonImage/>
      </div>
    </div>
  );
}