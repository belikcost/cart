import { takeEvery, put, call } from "redux-saga/effects";
import { API_URL, ADD_FILE_REQUEST } from "../constants";
import { addFileSuccess } from "../redux/actions";


const addFileFetch = async ({cartId, file}) => {
    const formData = new FormData();
    formData.append('file', file);

    return await fetch(`${API_URL}/vcard-landing/carts/${cartId}/files`, {
        method: 'POST',
        body: formData
    }).then(response => response.json());
}

function* addFile(action) {
    const result = yield call(addFileFetch, action.payload);
    yield put(addFileSuccess(result));
}

export default function* addFileWatcher() {
    yield takeEvery(ADD_FILE_REQUEST, addFile);
}