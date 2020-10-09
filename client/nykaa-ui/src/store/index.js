import createStore from 'redux-zero';
import { connect } from 'redux-zero/devtools';
import { applyMiddleware } from 'redux-zero/middleware';

import productStore from './store';

const initialSate = {
    products: productStore
};

const middleware = connect ? applyMiddleware(initialSate) : [];
const store = createStore(initialSate, middleware);

export default store;