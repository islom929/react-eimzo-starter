import { combineReducers } from '@reduxjs/toolkit';
import { notificationSlice } from '@/common/notification';
import { testSlice } from '@/features/biolab-list/slice/test.slice.ts';

export const rootReducer = combineReducers({
  notification: notificationSlice.reducer,
  test: testSlice.reducer,
});
