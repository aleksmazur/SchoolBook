import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from '../reducers/userReducer';
import scheduleReducer from '../reducers/scheduleReducer';
import modalReducer from '../reducers/modalReducer';
import settingReducer from '../reducers/settingReducer';
import classReducer from '../reducers/classReducer';
import newsReducer from '../reducers/newsReducer';
import diaryReducer from '../reducers/diaryReducer';
import quarterReducer from '../reducers/quarterReducer';

export const store = configureStore({
  reducer: {
    userInfo: userReducer,
    classInfo: classReducer,
    schedule: scheduleReducer,
    diary: diaryReducer,
    modal: modalReducer,
    setting: settingReducer,
    news: newsReducer,
    quarter: quarterReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
