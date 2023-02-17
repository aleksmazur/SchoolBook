import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../constants/baseUrl';
import { TOKEN } from '../constants/token';

export const updateHomeWork = createAsyncThunk(
  'homework/put',
  async (params: {
    idLesson: number;
    newHomeWork: {
      homework: string;
    };
  }) => {
    try {
      const response = await fetch(`${BASE_URL}/subjects/homework/add/${params.idLesson}`, {
        method: 'PUT',
        body: JSON.stringify(params.newHomeWork),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN()}`,
        },
      });
      if (response.status === 404) {
        throw new Error('Journal not Found');
      }
      const data = await response.json();
      return data;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }
);
