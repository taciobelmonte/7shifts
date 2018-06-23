import {FETCH_LOCATIONS} from "../actions/LocationsActions";

export default function LocationsReducer (state = [], action) {
    switch (action.type) {
        case FETCH_LOCATIONS :
            return action.payload;
        default :
            return state
    }
}