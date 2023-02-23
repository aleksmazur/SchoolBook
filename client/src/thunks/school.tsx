import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../constants/baseUrl';
import { TOKEN } from '../constants/token';

export const getSchoolInfo = createAsyncThunk('info/get', async () => {
  try {
    const response = await fetch(`${BASE_URL}/info`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${TOKEN()}`,
      },
    });
    if (response.status === 404) {
      throw new Error('Info not Found');
    }

    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error((err as Error).message);
  }
});
