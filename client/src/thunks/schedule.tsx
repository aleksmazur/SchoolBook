import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../constants/baseUrl';
import { TOKEN } from '../constants/token';

export const getSchedule = createAsyncThunk('sсhedule/get', async (id: number) => {
  try {
    const response = await fetch(`${BASE_URL}/shedule/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${TOKEN()}`,
      },
    });
    if (response.status === 404) {
      throw new Error('Sсhedule not Found');
    }

    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error((err as Error).message);
  }
});
