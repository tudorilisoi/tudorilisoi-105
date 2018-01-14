import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

const BASE_URL = 'https://api-fknaanjgow.now.sh'
const AUTH_HEADER = 'Bearer Mariaxxxxxxxxx'

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

export function actionSetSavedRating(bool) {
    return {
        type: 'SAVED_RATING',
        savedRating: bool
    }
}

function savedRating(state = -1, action) {
    switch (action.type) {
        case 'SAVED_RATING':
            return action.savedRating;
        default:
            return state;
    }
}

export function actionCloseButton(bool) {
    return {
        type: 'CLOSE_BUTTON',
        popupClosed: bool
    }
}

//state= true means "start hidden"
function buttonClosed(state = true, action) {
    switch (action.type) {
        case 'CLOSE_BUTTON':
            return action.popupClosed;
        default:
            return state;
    }
}

export function actionLoadRating() {
    return (dispatch) => {
        dispatch(actionAjax(`${BASE_URL}/feedback/rating`, {},
            (dispatch, responseObject) => {
                dispatch(actionSetSavedRating(responseObject.rating))
            }
        ))
        dispatch(actionAjax(`${BASE_URL}/feedback/closed`, {},
            (dispatch, responseObject) => {
                dispatch(actionCloseButton(responseObject.closed))
            }
        ))
    }
}

export function actionSubmitClosedState() {
    const opts = {
        _noParse: true,
        method: 'PUT',
        body: JSON.stringify({
            'closed': true
        })
    }

    return (dispatch) => {
        dispatch(actionAjax(`${BASE_URL}/feedback/closed`, opts,
            (dispatch, responseObject) => {
                dispatch(actionCloseButton(true))
            }
        ))
    }
}


export function actionSubmitRating(rating) {
    const opts = {
        _noParse: true,
        method: 'POST',
        body: JSON.stringify({
            rating: rating
        })
    }

    return (dispatch) => {
        dispatch(actionAjax(`${BASE_URL}/feedback/rating`, opts,
            (dispatch, responseObject) => {
                dispatch(actionSetSavedRating(rating))
            }
        ))
    }
}

export function actionAjax(url, _opts = {}, successCallback, errorCallback) {

    const {_noParse, ...rest} = _opts

    const opts = {
        ...rest,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': AUTH_HEADER,
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
            .then((response) => {
                return _noParse ? response : response.json()
            })
            .then((jsObject) => {
                successCallback && successCallback(dispatch, jsObject)
            })
            .catch(e => {
                console.log('ERR', e.message, url);
                dispatch(actionNetworkBusy(false));
                errorCallback && errorCallback(dispatch, e.message)
            });
    }
}

const rootReducer = combineReducers({
    selected,
    networkBusy,
    buttonClosed,
    savedRating,
})

function configureStore(initialState) {
    return createStore(rootReducer, initialState, applyMiddleware(thunk))
}

const initial = {selected: -1}
export const store = configureStore(initial)
