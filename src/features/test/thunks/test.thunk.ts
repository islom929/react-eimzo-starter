import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '@/common/axios';
import { ENDPOINT_TEST } from '@/common/constants/endpoints.constants';
import { ITest } from '@/features/biolab-list/models';

export const fetchTest = createAsyncThunk<ITest>(
  'contour/fetchTest',
  async () => {
    const response = await axiosInstance.get(ENDPOINT_TEST);
    return response.data;
  },
);
