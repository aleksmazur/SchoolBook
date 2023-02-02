import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../constants/baseUrl';

export interface ILogin {
  login: string;
  password: string;
}

export const authUser = createAsyncThunk('user/auth', async (login: ILogin) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      body: JSON.stringify(login),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 403) {
      throw new Error('User was not founded or incorrect password!');
    }
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error((err as Error).message);
  }
});
