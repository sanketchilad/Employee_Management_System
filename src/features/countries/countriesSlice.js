import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCountries } from '../../api/api';

export const fetchCountries = createAsyncThunk('countries/fetchAll', async () => {
  const response = await getCountries();
  return response.data;
});

const countriesSlice = createSlice({
  name: 'countries',
  initialState: { list: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default countriesSlice.reducer;
