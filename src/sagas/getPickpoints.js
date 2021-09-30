import { takeEvery, put, call } from "redux-saga/effects";
import { API_URL, GET_PICKPOINTS_REQUEST } from "../constants";
import { getPickpointsSuccess } from "../redux/actions";


const getPickpointsFetch = async (cityId) => {
    return await fetch(`${API_URL}/cdek/pickpoints?city_id=${cityId}`).then(response => response.json());
}

function* getPickpoints(action) {
    const result = yield call(getPickpointsFetch, action.payload);
    yield put(getPickpointsSuccess(result));
}

export default function* getPickpointsWatcher() {
    yield takeEvery(GET_PICKPOINTS_REQUEST, getPickpoints);
}