import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../constants/baseUrl';

export const getNews = createAsyncThunk('news/get', async () => {
  try {
    const response = await fetch(`${BASE_URL}/news`, {
      method: 'GET',
    });
    if (response.status === 404) {
      throw new Error('News not Found');
    }

    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error((err as Error).message);
  }
});
