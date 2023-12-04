"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  people: [],
  filtered: [],
  timeAvailabilities: {},
  timeAvailabilityExceptions: {},
};

export const artistsSlice = createSlice({
  name: "artists",
  initialState,
  reducers: {
    getArtists: (state, action) => {
      state.people = action.payload;
      state.filtered = action.payload;
    },

    filterArtist: (state, action) => {
      state.filtered = action.payload;
    },
    deleteArtist: (state, action) => {
      const deletedId = action.payload;
      state.people = state.people.filter((artist) => artist.id !== deletedId);
      state.filtered = state.filtered.filter(
        (artist) => artist.id !== deletedId
      );
    },
    orderArtist: (state, action) => {
      switch (action.payload) {
        case "asc":
          state.filtered = state.filtered.sort((a, b) =>
            a.fullName.localeCompare(b.fullName)
          );
          break;
        case "desc":
          state.filtered = state.filtered.sort((a, b) =>
            b.fullName.localeCompare(a.fullName)
          );
          break;
      }
    },

    orderAndFilterArtists: (state, action) => {
      const { filters, sortCriteria } = action.payload;
      let filteredArtists = state.people;

      if (filters.location) {
        filteredArtists = filteredArtists.filter((artist) =>
          artist.location.toLowerCase().includes(filters.location.toLowerCase())
        );
      }

      if (filters.tattooStyle.length > 0) {
        filteredArtists = filteredArtists.filter((artist) =>
          artist.tattooStyle.some((style) =>
            filters.tattooStyle.includes(style)
          )
        );
      }

      if (filters.artistName) {
        filteredArtists = filteredArtists.filter(
          (artist) =>
            artist.name
              .toLowerCase()
              .includes(filters.artistName.toLowerCase()) ||
            artist.lastName
              .toLowerCase()
              .includes(filters.artistName.toLowerCase())
        );
      }

      if (sortCriteria.tag) {
        switch (sortCriteria.tag) {
          case "asc":
            filteredArtists = filteredArtists.sort((a, b) =>
              a.name.localeCompare(b.name)
            );
            break;
          case "desc":
            filteredArtists = filteredArtists.sort((a, b) =>
              b.name.localeCompare(a.name)
            );
            break;
        }
      }

      state.filtered = filteredArtists;
    },

    /*MANEJO DE LA DISPONIBILIDAD HORARIA*/

    setTimeAvailabilities: (state, action) => {
      const { id, availabilities } = action.payload;
      state.timeAvailabilities[id] = availabilities;
    },

    updateTimeAvailability: (state, action) => {
      const { id, initialHour, finalHour } = action.payload;
      const artistId = Object.keys(state.timeAvailabilities).find((key) =>
        state.timeAvailabilities[key].some(
          (availability) => availability.id === id
        )
      );

      if (artistId) {
        const availabilityIndex = state.timeAvailabilities[artistId].findIndex(
          (availability) => availability.id === id
        );

        if (availabilityIndex !== -1) {
          state.timeAvailabilities[artistId][availabilityIndex] = {
            ...state.timeAvailabilities[artistId][availabilityIndex],
            initialHour,
            finalHour,
          };
        }
      }
    },

    addTimeAvailabilityExceptions: (state, action) => {
      state.timeAvailabilityExceptions = action.payload;
    },

    setTimeAvailabilityExceptions: (state, action) => {
      const { userId, exceptions } = action.payload;
      state.timeAvailabilityExceptions[userId] = exceptions;
    },
  },
});


export const {
  addTimeAvailabilityExceptions,
  setTimeAvailabilityExceptions,
  updateTimeAvailability,
  setTimeAvailabilities,
  getArtists,
  filterArtist,
  orderArtist,
  orderArtistRating,
  orderAndFilterArtists,
  deleteArtist,
} = artistsSlice.actions;

export default artistsSlice.reducer;
