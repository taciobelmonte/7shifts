import {FETCH_PUNCHES} from "../actions/PunchesActions";

export default function PunchesReducer (state = [], action) {
    switch (action.type) {
        case FETCH_PUNCHES :
            return action.payload;
        default :
            return state
    }
}