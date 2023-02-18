import { createAsyncThunk } from '@reduxjs/toolkit';
import { INewGrade } from '../components/PupilItemInJournal/PupilItemInJournal';
import { BASE_URL } from '../constants/baseUrl';
import { TOKEN } from '../constants/token';

export const updateGrade = createAsyncThunk('grade/put', async (newGrade: INewGrade) => {
  try {
    const response = await fetch(`${BASE_URL}/grades/add`, {
      method: 'PUT',
      body: JSON.stringify(newGrade),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TOKEN()}`,
      },
    });
    if (response.status === 404) {
      throw new Error('not Found');
    }
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error((err as Error).message);
  }
});
