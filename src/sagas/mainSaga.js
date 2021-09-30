import { all, call } from 'redux-saga/effects';

import getCitiesSuggestionsWatcher from "./getCitiesSuggestions";
import getPickpointsWatcher from "./getPickpoints";
import addFileWatcher from "./addFile";
import getCartWatcher from "./getCart";
import deleteFileWatcher from "./deleteFile";
import calculateDeliveryWatcher from "./calculateDelivery";
import createOrderWatcher from "./createOrder";


export default function* mainSaga() {
    yield all([
        call(getCitiesSuggestionsWatcher),
        call(getPickpointsWatcher),
        call(addFileWatcher),
        call(deleteFileWatcher),
        call(getCartWatcher),
        call(calculateDeliveryWatcher),
        call(createOrderWatcher),
    ]);
}