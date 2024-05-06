export default function Footer() {
  const getYear = new Date().getFullYear();
  return (
    <footer className="bg-white shadow-inner py-4 w-full">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-center">
        <div className="flex flex-col sm:flex-row mb-4 sm:mb-0">
          {/* <a href="#" className="text-gray-700 hover:text-gray-900 mb-2 sm:mb-0 mx-2">Features</a>
          <a href="#" className="text-gray-700 hover:text-gray-900 mb-2 sm:mb-0 mx-2">About</a>
          <a href="#" className="text-gray-700 hover:text-gray-900 mb-2 sm:mb-0 mx-2">Testimonials</a>
          <a href="#" className="text-gray-700 hover:text-gray-900 mb-2 sm:mb-0 mx-2">Contact</a>
          <a href="#" className="text-gray-700 hover:text-gray-900 mb-2 sm:mb-0 mx-2">Download</a> */}
          <div className="mb-4 sm:mb-0 text-black text-center">
            <p>© 2024-{getYear} YSK CORPORATION. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}