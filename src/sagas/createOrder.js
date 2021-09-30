import { takeEvery, put, call } from "redux-saga/effects";
import { API_URL, CREATE_ORDER_REQUEST } from "../constants";
import { createOrderFail, createOrderSuccess } from "../redux/actions";


const createOrderFetch = async (data) => {
    let address = data.address;

    if (data.deliveryType === 'pickup') {
        address = `ПВЗ: ${data.pickpoint.code}, ${data.pickpoint.full_address}`;
    }

    return await fetch(`${API_URL}/vcard-landing/carts/${data.cartId}/order`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            customer: data.customer,
            company: data.company,
            phone: data.phone,
            email: data.email.toLowerCase().replace(/\s/g, ''),
            city: `${data.city.region}, ${data.city.name}`,
            address,
            comment: data.comment,
            payment_type: data.paymentType,
            delivery_type: data.deliveryType,
            delivery_price: +data.deliveryPrice
        })
    }).then(response => response.json());
}

function* createOrder(action) {
    const result = yield call(createOrderFetch, action.payload);

    if (result.id) {
        yield put(createOrderSuccess(result));
    } else {
        yield put(createOrderFail());
    }

}

export default function* createOrderWatcher() {
    yield takeEvery(CREATE_ORDER_REQUEST, createOrder);
}