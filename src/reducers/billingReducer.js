import { GET_ITEMCODES, NEW_CARTITEM, DELETE_CARTITEM, GET_TOTAL, CART_CHECKOUT, CREATE_FORM, EXIT_FORM } from '../actions/types';

const initialState = {
    codes: [],
    items: [],
    total: 0,
    flag: 1,
    itemArray: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ITEMCODES:
            console.log('get item reducer type');
            return {
                ...state,
                codes: action.payload
            }
        case NEW_CARTITEM:
            console.log('get cart item');
            return Object.assign({}, state, {
                items: [
                    ...state.items,
                    {
                        items: action.payload
                    }
                ]
            })
        case DELETE_CARTITEM:
            console.log(action.payload);
            return {
                ...state,
                items: action.payload
            }
        case GET_TOTAL:
            console.log(action.payload);
            return {
                ...state,
                total: action.payload
            }
        case CART_CHECKOUT:
            return {
                ...state,
                items: [],
                total: 0
            }
        case CREATE_FORM:
            return {
                ...state,
                itemArray: action.payload,
                flag: 0
            }
        case EXIT_FORM:
            return {
                ...state,
                itemArray: [],
                flag: 1
            }
        default:
            return state;
    }
}