import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../constants/baseUrl';

export const getSubject = createAsyncThunk('subject/get', async () => {
  try {
    const response = await fetch(`${BASE_URL}/subjects`, {
      method: 'GET',
    });
    if (response.status === 404) {
      throw new Error('Journal not Found');
    }

    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error((err as Error).message);
  }
});
