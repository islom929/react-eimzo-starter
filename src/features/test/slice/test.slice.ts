import { createSlice } from '@reduxjs/toolkit';
import { fetchTest } from '../thunks/test.thunk.ts';
import { ITest } from '@/features/biolab-list/models';

interface testState {
  data: ITest;
  loading: boolean;
  error: string | null;
}

const initialState: testState = {
  data: [],
  loading: false,
  error: null,
};

export const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTest.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload;
      })
      .addCase(fetchTest.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message || 'Something went wrong';
      });
  },
});
