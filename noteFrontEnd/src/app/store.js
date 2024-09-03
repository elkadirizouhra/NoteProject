
import { configureStore } from '@reduxjs/toolkit';
import noteReducer from '../features/Notes/noteSlice';

import radioReducer from '../features/Radio/showRadio';
import colorReducer from '../features/Coleur/couleur';

const store = configureStore({
  reducer: {
    notes: noteReducer,
    radio:radioReducer,
    color: colorReducer, 
  }
});

export default store;
