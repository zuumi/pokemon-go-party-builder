"use client";

import Header from '../components/Header';
import SearchBar from '../features/PokemonGoPartyBuilder/CreateParty/SearchBar.client';
import CreateParty from '../features/PokemonGoPartyBuilder/CreateParty/CreateParty.client';
import Advertisement from '../features/PokemonGoPartyBuilder/CreateParty/Advertisement';
import Footer from '../components/Footer';
import { Provider } from 'react-redux';
import store from "../features/PokemonGoPartyBuilder/App/store";

export default function Home() {
  return (
    <div className="bg-white">
      <Header />
        <div className="bg-cover bg-center" style={{ backgroundImage: "url('/pokemonGo_backgroundImage_noon.jpeg')" }}>
          <div  className="bg-white bg-opacity-40">
            <div className="h-50">
              {/* <Provider store={store}> */}
                <SearchBar />
              {/* </Provider> */}
            </div>
            <div className="h-full">
              <Provider store={store}>
                <CreateParty />
              </Provider>
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