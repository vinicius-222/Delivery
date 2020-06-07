import { combineReducers } from 'redux';
import userReducer from './userReducer';
import carReducer from './carReducer';
import enderecoReducer from './enderecoReducer';

export default combineReducers({
    userReducer,
    carReducer,
    enderecoReducer,
});