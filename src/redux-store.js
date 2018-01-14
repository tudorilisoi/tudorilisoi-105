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

export function actionNetworkBusy(bool) {
    return {
        type: 'BUSY',
        networkBusy: bool
    }
}

function networkBusy(state = false, action) {
    switch (action.type) {
        case 'BUSY':
            return action.networkBusy;
        default:
            return state;
    }
}

export function actionTogglePopup(bool) {
    return {
        type: 'POPUP',
        visible: bool
    }
}

function visible(state = true, action) {
    switch (action.type) {
        case 'POPUP':
            return action.visible;
        default:
            return state;
    }
}


function _hidePopup(dispatch) {
    dispatch(actionTogglePopup(false))
}

export function actionLoadRating() {
    return (dispatch) => {
        dispatch(actionAjax(`${BASE_URL}/feedback/rating`, {}, _hidePopup))
        dispatch(actionAjax(`${BASE_URL}/feedback/closed`, {},
            (dispatch, responseObject) => {
                responseObject.closed && _hidePopup(dispatch)
            })
        )
    }
}

export function actionSubmitClosedState() {
    const opts = {
        method: 'PUT',
        body: JSON.stringify({
            'closed': true
        })
    }

    return (dispatch) => {
        dispatch(actionAjax(`${BASE_URL}/feedback/closed`, opts, _hidePopup))
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
        dispatch(actionAjax(`${BASE_URL}/feedback/rating`, opts, _hidePopup))
    }
}

export function actionAjax(url, _opts = {}, successCallback, errorCallback) {

    const opts = {
        ..._opts,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer johnxxx',
        }
    }

    return (dispatch) => {
        dispatch(actionNetworkBusy(true));

        fetch(url, opts)
            .then((response) => {
                dispatch(actionNetworkBusy(false));
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
                dispatch(actionNetworkBusy(false));
                errorCallback && errorCallback(dispatch, e.message)
            });
    }
}

const rootReducer = combineReducers({
    selected,
    networkBusy,
    visible
})

function configureStore(initialState) {
    return createStore(rootReducer, initialState, applyMiddleware(thunk))
}

const initial = {selected: -1}
export const store = configureStore(initial)
