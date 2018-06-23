import * as Api from './../utils/Api';

export const FETCH_USERS = 'FETCH_USERS';


export function fetchUsers(url) {
    return dispatch => {
        Api.get(url)
            .then(res => dispatch(fetchUsersSuccess(res)))
    }
}

function fetchUsersSuccess(data) {
    return {
        type: FETCH_USERS,
        payload: data,
    }
}