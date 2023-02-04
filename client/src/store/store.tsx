import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from '../reducers/userReducer';
import scheduleReducer from '../reducers/scheduleReducer';
import modalReducer from '../reducers/modalReducer';
import settingReducer from '../reducers/settingReducer';
import classReducer from '../reducers/classReducer';

export const store = configureStore({
  reducer: {
    userInfo: userReducer,
    classInfo: classReducer,
    schedule: scheduleReducer,
    modal: modalReducer,
    setting: settingReducer,
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
