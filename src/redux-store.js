import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

const BASE_URL = 'https://api-fknaanjgow.now.sh'

export function actionSelectRating(rating) {
    return {
        type: 'SELECT_RATING',
        selected: rating
    }
}

function selected(state = -1, action) {
    switch (action.type) {
        case 'SELECT_RATING':
            return action.selected;
        default:
            return state;
    }
}

export function actionIsLoading(bool) {
    return {
        type: 'LOADING',
        isLoading: bool
    }
}

function isLoading(state = false, action) {
    switch (action.type) {
        case 'LOADING':
            return action.isLoading;
        default:
            return state;
    }
}


export function actionLoadRating() {

    function onSuccess(dispatch, responseObject) {
        dispatch(actionSelectRating(responseObject.rating))
    }

    return (dispatch) => {
        dispatch(actionAjax(`${BASE_URL}/feedback/rating`, {}, onSuccess))
    }
}

export function actionSubmitRating(rating) {
    const opts = {
        method: 'POST',
        body: JSON.stringify({
            rating: rating
        })
    }
    return (dispatch) => {
        dispatch(actionAjax(`${BASE_URL}/feedback/rating`, opts))
    }
}

export function actionAjax(url, _opts = {}, successCallback, errorCallback) {

    const opts = {
        ..._opts,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer johnxx',
        }
    }

    return (dispatch) => {
        dispatch(actionIsLoading(true));

        fetch(url, opts)
            .then((response) => {
                dispatch(actionIsLoading(false));
                if (!response.ok) {
                    throw new Error(response.status);
                }
                return response;
            })
            .then((response) => response.json())
            .then((jsObject) => {
                successCallback && successCallback(dispatch, jsObject)
            })
            .catch(e => {
                dispatch(actionIsLoading(false));
                errorCallback && errorCallback(dispatch, e.message)
            });
    }
}

const rootReducer = combineReducers({
    selected,
    isLoading,
})

function configureStore(initialState) {
    return createStore(rootReducer, initialState, applyMiddleware(thunk))
}

const initial = {selected: -1}
export const store = configureStore(initial)
