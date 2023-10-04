
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from 'redux-persist';
import storage from "redux-persist/lib/storage";
// import watchReducer from "../feature/watchFeature/index"
import watchDataReducer from '../feature/watchFeature'
import  userReducer  from "../feature/userFeature/index";
import thunk from "redux-thunk";


export const reducers = combineReducers({
  userReducer: userReducer,
  watchDataReducer: watchDataReducer
});

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, reducers);



const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
});

// window.addEventListener('beforeunload', () => {
//   localStorage.removeItem('persist:root')
// });

export default store;
