import {
    ADD_FILE_SUCCESS, CALCULATE_DELIVERY_SUCCESS, CREATE_ORDER_FAIL, CREATE_ORDER_SUCCESS,
    DELETE_FILE_SUCCESS,
    GET_CART_REQUEST,
    GET_CART_SUCCESS,
    GET_CITIES_SUGGESTIONS_REQUEST,
    GET_CITIES_SUGGESTIONS_SUCCESS,
    GET_PICKPOINTS_SUCCESS
} from "../constants";


const initialState = {};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CITIES_SUGGESTIONS_REQUEST:
            return {...state, citiesSuggestions: {isLoading: true}};
        case GET_CITIES_SUGGESTIONS_SUCCESS:
            return {...state, citiesSuggestions: {isLoading: false, suggestions: action.payload.items}};
        case GET_PICKPOINTS_SUCCESS:
            return {...state, pickpoints: action.payload.items};
        case GET_CART_REQUEST:
            return {...state, cart: {isLoading: true}};
        case GET_CART_SUCCESS:
            return {...state, cart: {...action.payload, isLoading: false}};
        case ADD_FILE_SUCCESS:
        case DELETE_FILE_SUCCESS:
            return {...state, cart: {...state.cart, ...action.payload}};
        case CALCULATE_DELIVERY_SUCCESS:
            return {...state, deliveryPrice: action.payload.price};
        case CREATE_ORDER_FAIL:
            return {...state, orderWasCreated: false};
        case CREATE_ORDER_SUCCESS:
            localStorage.removeItem('cartId');
            return {...state, orderWasCreated: true};
        default:
            return state;
    }
}