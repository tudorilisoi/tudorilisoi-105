import 'whatwg-fetch' //fetch polyfill
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import RatingPopup from './RatingPopup';
import {Provider} from 'react-redux';
import {store} from './redux-store'

ReactDOM.render(
    (<Provider store={store}>
        <RatingPopup/>
    </Provider>),
    document.getElementById('root')
);

