import * as Api from './../utils/Api';

export const FETCH_LOCATIONS = 'FETCH_LOCATIONS';


export function fetchLocations(url) {
    return dispatch => {
        Api.get(url)
            .then(res => dispatch(fetchLocationsSuccess(res)))
    }
}

function fetchLocationsSuccess(data) {
    return {
        type: FETCH_LOCATIONS,
        payload: data,
    }
}