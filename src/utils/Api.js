//API to request data via HTTP
const ROOT = "https://shiftstestapi.firebaseio.com";

let token = localStorage.token
if (!token)
    token = localStorage.token = Math.random().toString(36).substr(-8);

const headers = {
    'Accept': 'application/json',
    'Authorization': token
};

//Get
export const get = (url) =>{
    return fetch(`${ROOT + '/' + url}`, { headers })
        .then(res => res.json())
        .then(data => data);
};

