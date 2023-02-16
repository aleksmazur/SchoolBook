import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../constants/baseUrl';
import { TOKEN } from '../constants/token';

export interface ILogin {
  username: string;
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
    if (response.status === 401) {
      throw new Error('Incorrect Password');
    }
    if (response.status === 403) {
      throw new Error('User was not founded');
    }
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error((err as Error).message);
  }
});

export const getChildrenByParent = createAsyncThunk('user/getChildren', async (id: string) => {
  try {
    const response = await fetch(`${BASE_URL}/users/childrens/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${TOKEN()}`,
      },
    });
    if (response.status === 404) {
      throw new Error('Childrens not found');
    }
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error((err as Error).message);
  }
});

export const getUserById = createAsyncThunk('user/getUserById', async (id: string) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${TOKEN()}`,
      },
    });
    if (response.status === 404) {
      throw new Error('User not found');
    }
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error((err as Error).message);
  }
});

export const getChildrenById = createAsyncThunk('user/getChildrenById', async (id: string) => {
  try {
    const response = await fetch(`${BASE_URL}/childrens/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${TOKEN()}`,
      },
    });
    if (response.status === 404) {
      throw new Error('User not found');
    }
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error((err as Error).message);
  }
});
