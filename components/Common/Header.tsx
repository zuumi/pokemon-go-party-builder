export default function Header() {
  return (
    <header className="bg-white shadow-md py-4">
      <nav className="container mx-auto flex justify-between items-center px-4">
        <div className="font-bold text-xl text-black">Logo</div>
        <div className="flex items-center">
          <a href="#" className="text-gray-700 hover:text-gray-900 mx-2">Pokemon GO Party</a>
          <a href="#" className="text-gray-700 hover:text-gray-900 mx-2">Help</a>
        </div>
      </nav>
    </header>
  );
}