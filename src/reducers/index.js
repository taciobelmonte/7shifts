import { combineReducers } from 'redux';
import LocationsReducer from './LocationsReducer';
import UsersReducer from './UsersReducer';
import PunchesReducer from './PunchesReducer';

const reducer = combineReducers({
    locations: LocationsReducer,
    users: UsersReducer,
    punches: PunchesReducer
});

export default reducer;