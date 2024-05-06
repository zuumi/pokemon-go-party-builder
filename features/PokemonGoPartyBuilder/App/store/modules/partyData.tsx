"use client";

import { createSlice } from "@reduxjs/toolkit";

const partyData = createSlice({
  name: 'partyData',
  initialState: {
    data: [{
      index: 0,
      id: 0,
      name: "",
    },{
      index: 1,
      id: 0,
      name: "",
    },{
      index: 2,
      id: 0,
      name: "",
    }]
  },
  reducers: {
    add(state, { type, payload }) {
      state.data[payload.index].id = payload.id;
      state.data[payload.index].name = payload.name;
    }
  }
});

const { add } = partyData.actions;

export { add };
export default partyData.reducer;