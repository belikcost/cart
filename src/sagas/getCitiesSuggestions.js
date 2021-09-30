import { takeEvery, put, call } from "redux-saga/effects";
import { API_URL, GET_CITIES_SUGGESTIONS_REQUEST } from "../constants";
import { getCitiesSuggestionsSuccess } from "../redux/actions";


const getCitiesSuggestionsFetch = async (searchString) => {
    return await fetch(`${API_URL}/cdek/cities?limit=5&keyword=${searchString}`).then(response => response.json());
}

function* getCitiesSuggestions(action) {
    const result = yield call(getCitiesSuggestionsFetch, action.payload);
    yield put(getCitiesSuggestionsSuccess(result));
}

export default function* getCitiesSuggestionsWatcher() {
    yield takeEvery(GET_CITIES_SUGGESTIONS_REQUEST, getCitiesSuggestions);
}