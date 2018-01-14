import {combineReducers, createStore} from 'redux';

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

const rootReducer = combineReducers({selected})

function configureStore(initialState) {
    return createStore(rootReducer, initialState)
}

const initial = {selected: -1}
export const store = configureStore(initial)
