import {
    ADD_FILE_REQUEST,
    ADD_FILE_SUCCESS,
    CALCULATE_DELIVERY_REQUEST,
    CALCULATE_DELIVERY_SUCCESS,
    CREATE_ORDER_FAIL,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    DELETE_FILE_REQUEST,
    DELETE_FILE_SUCCESS,
    GET_CART_REQUEST,
    GET_CART_SUCCESS,
    GET_CITIES_SUGGESTIONS_REQUEST,
    GET_CITIES_SUGGESTIONS_SUCCESS,
    GET_PICKPOINTS_REQUEST,
    GET_PICKPOINTS_SUCCESS
} from "../constants";


export const getCitiesSuggestionsRequest = (data) => ({type: GET_CITIES_SUGGESTIONS_REQUEST, payload: data});
export const getCitiesSuggestionsSuccess = (data) => ({type: GET_CITIES_SUGGESTIONS_SUCCESS, payload: data});

export const getPickpointsRequest = (data) => ({type: GET_PICKPOINTS_REQUEST, payload: data});
export const getPickpointsSuccess = (data) => ({type: GET_PICKPOINTS_SUCCESS, payload: data});

export const addFileRequest = (data) => ({type: ADD_FILE_REQUEST, payload: data});
export const addFileSuccess = (data) => ({type: ADD_FILE_SUCCESS, payload: data});

export const deleteFileRequest = (data) => ({type: DELETE_FILE_REQUEST, payload: data});
export const deleteFileSuccess = (data) => ({type: DELETE_FILE_SUCCESS, payload: data});

export const getCartRequest = (data) => ({type: GET_CART_REQUEST, payload: data});
export const getCartSuccess = (data) => ({type: GET_CART_SUCCESS, payload: data});

export const calculateDeliveryRequest = (data) => ({type: CALCULATE_DELIVERY_REQUEST, payload: data});
export const calculateDeliverySuccess = (data) => ({type: CALCULATE_DELIVERY_SUCCESS, payload: data});

export const createOrderRequest = (data) => ({type: CREATE_ORDER_REQUEST, payload: data});
export const createOrderFail = () => ({type: CREATE_ORDER_FAIL});
export const createOrderSuccess = () => ({type: CREATE_ORDER_SUCCESS});