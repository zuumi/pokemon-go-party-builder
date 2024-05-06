"use client";

import { configureStore } from "@reduxjs/toolkit";
// import pokemonGoData from "./modules/pokemonGoData";
import partyData from "./modules/partyData";

export default configureStore({
  reducer: {
    partyData,
    // pokemonGoData,
  }
});