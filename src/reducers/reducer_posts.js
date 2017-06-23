import { FETCH_POSTS, FETCH_POS, DELETE_POST } from '../actions';
import _ from 'lodash';

export default function(state = {}, action) {
    switch (action.type) {
        case DELETE_POST:
            //another lodash method omit removes form an object an item with a key which is the second parameter
            return _.omit(state, action.payload);
        case FETCH_POST:
            // const post = action.payload.data;
            // const newState = { ...state };
            // newState[post.id] = post;
            // return newState;

            //this line does what happens above in those four lines
            //this is saying whatever action.payload.data.id is make a new key on this object
            //with that value and set it's value to action.payload.data
            return { ...state, [action.payload.data.id] : action.payload.data};
        case FETCH_POSTS:
            //we need to change an array to an object so using lodash method as it comes with it.
            return _.mapKeys(action.payload.data, 'id');
        default:
            return state;
    }
}