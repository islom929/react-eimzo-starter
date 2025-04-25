import { createSlice } from '@reduxjs/toolkit';
export type NotificationType = 'success' | 'info' | 'warning' | 'error';

interface InitialStateProps {
  is_open: boolean;
  message: string;
  type?: NotificationType;
}

const initialState: InitialStateProps = {
  is_open: false,
  message: '',
  type: 'warning',
};

export const notificationSlice = createSlice({
  name: 'notificationSlice',
  initialState,
  reducers: {
    open: (state, data) => {
      return { ...state, is_open: true, message: data.payload.message, type: data.payload.type };
    },
    close: (state) => {
      return { ...state, is_open: false };
    },
  },
});
