import { takeEvery, put, call } from "redux-saga/effects";
import { API_URL, GET_CART_REQUEST } from "../constants";
import { getCartSuccess } from "../redux/actions";


const getCartFetch = async (cartId) => {
    return await fetch(`${API_URL}/vcard-landing/carts/${cartId}`).then(response => response.json());
}

function* getCart(action) {
    const result = yield call(getCartFetch, action.payload);
    yield put(getCartSuccess(result));
}

export default function* getCartWatcher() {
    yield takeEvery(GET_CART_REQUEST, getCart);
}