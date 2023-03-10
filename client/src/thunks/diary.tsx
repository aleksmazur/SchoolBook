import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../constants/baseUrl';
import { TOKEN } from '../constants/token';

export interface ISign {
  childrenId: number;
  date: string;
  sign: boolean;
}

export const getDiary = createAsyncThunk(
  'diary/get',
  async (params: { idPupil: number; idClass: number; week: number; year: number }) => {
    try {
      const response = await fetch(
        `${BASE_URL}/diary/${params.idClass}/${params.idPupil}?week=${params.week}&year=${params.year}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${TOKEN()}`,
          },
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

export const getFinalDiary = createAsyncThunk(
  'finaldiary/get',
  async (params: { idPupil: number; idClass: number }) => {
    try {
      const response = await fetch(
        `${BASE_URL}/grades/final?class=${params.idClass}&children=${params.idPupil}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${TOKEN()}`,
          },
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

export const setSignDiary = createAsyncThunk('diary/sign', async (sign: ISign) => {
  try {
    const response = await fetch(`${BASE_URL}/diary/sign/add`, {
      method: 'POST',
      body: JSON.stringify(sign),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TOKEN()}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error((err as Error).message);
  }
});

export const getSignDiary = createAsyncThunk(
  'diary/getSign',
  async (params: { idPupil: number; week: number; year: number }) => {
    try {
      const response = await fetch(
        `${BASE_URL}/diary/sign/get/${params.idPupil}?week=${params.week}&year=${params.year}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${TOKEN()}`,
          },
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
