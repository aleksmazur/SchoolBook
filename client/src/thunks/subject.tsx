import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../constants/baseUrl';
import { TOKEN } from '../constants/token';

export const getSubject = createAsyncThunk(
  'subject/get',
  async (params: { nameLesson: string; activeQuarter: number; idClass: number }) => {
    try {
      const response = await fetch(
        `${BASE_URL}/subjects?class=${params.idClass}&name=${params.nameLesson}&quarter=${params.activeQuarter}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${TOKEN()}`,
          },
        }
      );
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
