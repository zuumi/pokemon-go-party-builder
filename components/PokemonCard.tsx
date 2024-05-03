export default function PokemonCard() {
  return (
    <div className="bg-white shadow-md rounded p-4 w-[500px] h-[800px]">
      {/* <div className="bg-gray-500 h-50 rounded mb-4 flex items-center justify-center">Image Placeholder</div> */}
      <div className="bg-gray-300 mx-auto m h-[300px] w-[300px] flex items-center justify-center text-gray-700">
        画像がここに表示されます
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