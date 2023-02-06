import { createSlice } from '@reduxjs/toolkit';
import { getNews } from '../thunks/news';

export type INewsItem = { id: number | null; title: string | null; content: string | null };

type INews = {
  news: INewsItem[];
};

const initialState: INews = { news: [{ id: null, title: null, content: null }] };

const newsReducer = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNews.pending, () => {
        //preloader
      })
      .addCase(getNews.fulfilled, (state, action) => {
        state.news = action.payload;
      });
  },
});

export default newsReducer.reducer;
export const {} = newsReducer.actions;
