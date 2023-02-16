import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../constants/baseUrl';
import { TOKEN } from '../constants/token';

export const getClassByID = createAsyncThunk('classes/get', async (id: number) => {
  try {
    const response = await fetch(`${BASE_URL}/classes/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${TOKEN()}`,
      },
    });
    if (response.status === 404) {
      throw new Error('Classs not Found');
    }

    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error((err as Error).message);
  }
});

export const getClassByIDTeacher = createAsyncThunk(
  'classByTeacher/get',
  async (idTeacher: string) => {
    try {
      const response = await fetch(`${BASE_URL}/classes/?teacher=${idTeacher}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${TOKEN()}`,
        },
      });
      if (response.status === 404) {
        throw new Error('Classs not Found');
      }

      const data = await response.json();
      return data;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }
);
