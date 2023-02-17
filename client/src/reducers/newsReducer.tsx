import { createSlice } from '@reduxjs/toolkit';
import { getNews, postNews } from '../thunks/news';

export type INewsItem = {
  id: number | null;
  title: string | null;
  content: string | null;
  image: string | null;
  createdAt: string | null;
};

type INews = {
  news: INewsItem[];
  isLoader: boolean;
  status: string;
};

const initialState: INews = {
  news: [{ id: null, title: null, content: null, image: null, createdAt: null }],
  isLoader: false,
  status: '',
};

const newsReducer = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNews.pending, (state) => {
        state.isLoader = true;
      })
      .addCase(getNews.fulfilled, (state, action) => {
        state.news = action.payload;
        state.isLoader = false;
      })
      .addCase(postNews.pending, (state) => {
        state.isLoader = true;
      })
      .addCase(postNews.fulfilled, (state, action) => {
        state.status = action.payload;
      });
  },
});

export default newsReducer.reducer;
export const {} = newsReducer.actions;
