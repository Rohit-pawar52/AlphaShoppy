import { combineReducers,configureStore } from "@reduxjs/toolkit";

import { persistStore,persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartReducer from '../redux/slicer';

// combined reducers
const combineReducer = combineReducers({
    data:cartReducer,   //first slicer
});

//persist configuration
const persistConfig = {
    key:"root",          //key to save persisted state in storage
    storage,
};

//create persisted reducer
const persistReduce = persistReducer(persistConfig,combineReducer)


// create redux store
export const store = configureStore({
    reducer:persistReduce,
});


// create the persistor
export const persistor = persistStore(store);