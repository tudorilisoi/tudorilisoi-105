import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

export function actionSelectRating(index) {
    return {
        type: 'SELECT_RATING',
        selected: index
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

export function actionAjaxSuccess(jsObject) {
    return {
        type: 'AJAX_SUCCESS',
        data: jsObject
    };
}

function ajaxResponse(state = null, action) {
    switch (action.type) {
        case 'AJAX_SUCCESS':
            return action.data;
        default:
            return state;
    }
}


export function actionAjaxError(e) {
    return {
        type: 'AJAX_ERROR',
        error: e
    };
}

function ajaxError(state = null, action) {
    switch (action.type) {
        case 'AJAX_SUCCESS':
            return action.error;
        default:
            return state;
    }
}


export function actionAjax(url, opts={}) {
    return (dispatch) => {
        dispatch(actionIsLoading(true));

        fetch(url)
            .then((response) => {
                dispatch(actionIsLoading(false));
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            })
            .then((response) => response.json())
            .then((jsObject) => dispatch(actionAjaxSuccess(jsObject)))
            .catch(e => dispatch(actionAjaxError(e)));
    }
}

const rootReducer = combineReducers({
    selected,
    ajaxError,
    ajaxResponse,
    isLoading,
})

function configureStore(initialState) {
    return createStore(rootReducer, initialState, applyMiddleware(thunk))
}

const initial = {selected: -1}
export const store = configureStore(initial)
