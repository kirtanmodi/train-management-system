import { createSlice } from "@reduxjs/toolkit";

export const mainSlice = createSlice({
  name: "mainSlice",
  initialState: {
    trainRows: 4,
    trainColumns: 15,
    trainCompartments: 11,
    csvFile: "",
    bookingArr: [],
    seatSelected: 1,
  },
  reducers: {
    setTrainRows: (state, action) => {
      state.trainRows = action.payload;
    },
    setTrainColumns: (state, action) => {
      state.trainColumns = action.payload;
    },
    setTrainCompartments: (state, action) => {
      state.trainCompartments = action.payload;
    },
    setCSVFile: (state, action) => {
      state.csvFile = action.payload;
    },
    setBookingArr: (state, action) => {
      state.bookingArr = action.payload;
    },
    setSeatSelected: (state, action) => {
      state.seatSelected = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setTrainRows,
  setTrainColumns,
  setTrainCompartments,
  setCSVFile,
  setBookingArr,
  setSeatSelected,
} = mainSlice.actions;

export default mainSlice.reducer;
