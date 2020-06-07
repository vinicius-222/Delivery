import { createStore, applyMiddleware} from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import ReduxThunk from 'redux-thunk';

import Reducers from './reducers/index';
console.disableYellowBox = true;

const persistedReducer = persistReducer({
    key:'root',
    storage:AsyncStorage,
    whitelist:['userReducer']
}, Reducers);

const store = createStore(persistedReducer, applyMiddleware(ReduxThunk));
const persistor = persistStore(store);

export {store, persistor};