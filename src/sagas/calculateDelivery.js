import { takeEvery, put, call } from "redux-saga/effects";
import { API_URL, CALCULATE_DELIVERY_REQUEST } from "../constants";
import { calculateDeliverySuccess } from "../redux/actions";


const calculateDeliveryFetch = async ({cityCode, deliveryType}) => {

    return await fetch(`${API_URL}/cdek/calc`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            city_id: cityCode,
            delivery_type: deliveryType === 'pickup' ? 'pickpoint' : deliveryType
        })
    }).then(response => response.json());
}

function* calculateDelivery(action) {
    const result = yield call(calculateDeliveryFetch, action.payload);
    yield put(calculateDeliverySuccess(result));
}

export default function* calculateDeliveryWatcher() {
    yield takeEvery(CALCULATE_DELIVERY_REQUEST, calculateDelivery);
}