import * as Api from './../utils/Api';

export const FETCH_PUNCHES = 'FETCH_PUNCHES';


export function fetchPunches(url) {
    return dispatch => {
        Api.get(url)
            .then(res => dispatch(fetchPunchesSuccess(res)))
    }
}

function fetchPunchesSuccess(data) {
    return {
        type: FETCH_PUNCHES,
        payload: data
    }
}