import { takeEvery, put, call } from "redux-saga/effects";
import { API_URL, DELETE_FILE_REQUEST } from "../constants";
import { deleteFileSuccess } from "../redux/actions";


const deleteFileFetch = async ({cartId, fileId}) => {
    return await fetch(`${API_URL}/vcard-landing/carts/${cartId}/files/${fileId}`, {
        method: 'DELETE'
    }).then(response => response.json());
}

function* deleteFile(action) {
    const result = yield call(deleteFileFetch, action.payload);
    yield put(deleteFileSuccess(result));
}

export default function* deleteFileWatcher() {
    yield takeEvery(DELETE_FILE_REQUEST, deleteFile);
}