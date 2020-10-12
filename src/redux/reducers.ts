import { combineReducers } from "redux";
import playerReducer from './playerSlice';

export default combineReducers({
    players: playerReducer,
})