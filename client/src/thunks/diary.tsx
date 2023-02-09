import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../constants/baseUrl';

export const getDiary = createAsyncThunk(
  'diary/get',
  async (params: { idPupil: number; idClass: number; week: number; year: number }) => {
    try {
      const response = await fetch(
        `${BASE_URL}/diary/${params.idClass}/${params.idPupil}?week=${params.week}&year=${params.year}`,
        {
          method: 'GET',
        }
      );
      if (response.status === 404) {
        throw new Error('Diary not Found');
      }

      const data = await response.json();
      return data;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }
);
