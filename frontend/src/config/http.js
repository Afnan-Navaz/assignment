import {backendURL} from './config';

export const get = async (endpoint) => {
    const res = await fetch(`${backendURL}/${endpoint}`, {
        method: 'GET',
        credentials: 'include',
    });
    return await res.json();
}

export const post = async (endpoint, data) => {
    const response = await fetch(`${backendURL}/${endpoint}`, {
        method: 'POST',
        body: JSON.stringify(data),
        credentials: 'include',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    });
    return await response.json();
}