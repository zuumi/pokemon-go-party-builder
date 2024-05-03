import Header from '../components/Header';
import SearchBar from '../components/SearchBar.client';
import CreateParty from '../components/CreateParty';
import Advertisement from '../components/Advertisement';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="bg-white">
      <Header />
      <div className="bg-blue-300 h-50">
        <SearchBar />
      </div>
      <div className="bg-blue-300 h-full">
        <CreateParty />
      </div>
      <div className="bg-blue-300 h-50">
        <Advertisement />
      </div>
      <Footer />
    </div>
  );
}