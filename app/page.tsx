import Header from '../features/PokemonGoPartyBuilder/Common/Header';
import SearchBar from '../features/PokemonGoPartyBuilder/CreateParty/SearchBar.client';
import CreateParty from '../features/PokemonGoPartyBuilder/CreateParty/CreateParty';
import Advertisement from '../features/PokemonGoPartyBuilder/CreateParty/Advertisement';
import Footer from '../features/PokemonGoPartyBuilder/Common/Footer';

export default function Home() {
  return (
    <div className="bg-white">
      <Header />
        <div className="bg-cover bg-center" style={{ backgroundImage: "url('/pokemonGo_backgroundImage_noon.jpeg')" }}>
          <div  className="bg-white bg-opacity-40">
            <div className="h-50">
              <SearchBar />
            </div>
            <div className="h-full">
              <CreateParty />
            </div>
            <div className="h-50">
              <Advertisement />
            </div>
          </div>
        </div>
      <Footer />
    </div>
  );
}