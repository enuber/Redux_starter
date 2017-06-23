import axios from 'axios';

export const FETCH_POSTS = 'fetch_posts';
export const CREATE_POST = 'create_post';
export const FETCH_POST = 'fetch_post';
export const DELETE_POST = 'delete_post';


const ROOT_URL = 'http://reduxblog.herokuapp.com/api';
const API_KEY = '?key=erikn1234';


export function fetchPosts() {
    const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);

    return {
        type: FETCH_POSTS,
        payload: request
    };
}

export function createPost(values, callback) {
    //when the createPost action is made, a call back comes in that will change location.
    //this accepts that as a promise and executes the callback on success.
    const request = axios.post(`${ROOT_URL}/posts${API_KEY}`, values)
        .then(() => callback());

    return {
        type: CREATE_POST,
        payload: request
    };
}

export function fetchPost(id) {
    const request = axios.post(`${ROOT_URL}/posts/${id}${API_KEY}`);
    return {
        type: FETCH_POST,
        payload: request
    }
}

export function deletePost(id, callback) {
    const request = axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`)
        .then(() => callback());
    //we don't need to return the axios call so just pass back the id we are removing
    return {
        type: DELETE_POST,
        payload: id
    }
}