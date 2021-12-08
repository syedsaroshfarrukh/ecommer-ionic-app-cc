import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from '../reducers';

const persistConfig = {
    key: 'storage',
    storage: storage,
    whitelist: ['auth','cart'] // which reducer want to store
};

const pReducer = persistReducer(persistConfig, rootReducer);
const middleware = compose(
    applyMiddleware(thunk)
    // ,(window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
);
const store = createStore(pReducer, {}, middleware);
const persistor = persistStore(store);
export { persistor, store };
