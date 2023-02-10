import { createSlice } from '@reduxjs/toolkit';
import { getNews } from '../thunks/news';

export type INewsItem = {
  id: number | null;
  title: string | null;
  content: string | null;
  image: string | null;
};

type INews = {
  news: INewsItem[];
  isLoader: boolean;
};

const initialState: INews = {
  news: [{ id: null, title: null, content: null, image: null }],
  isLoader: false,
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
      });
  },
});

export default newsReducer.reducer;
export const {} = newsReducer.actions;
