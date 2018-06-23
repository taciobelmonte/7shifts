import {FETCH_USERS} from "../actions/UsersActions";

export default function UsersReducer (state = [], action) {
    switch (action.type) {
        case FETCH_USERS :
            return action.payload;
        default :
            return state
    }
}