import axios from '../helpers/axiosInterceptor';
import { cartConstants } from '../helpers/constants';
import { alertActions } from './alert'

export const increment = (data) => async dispatch => {
    dispatch({ type: cartConstants.ITEM_INCREMENT, payload: data });
};

export const decrement = (data) => async dispatch => {
    dispatch({ type: cartConstants.ITEM_DECREMENT, payload: data });
};

export const addons_show = (data) => async dispatch => {
    dispatch({ type: cartConstants.ADDONS_SHOW, payload: data });
};

export const addons_hide = () => async dispatch => {
    dispatch({ type: cartConstants.ADDONS_HIDE });
};

export const coupon_add = (data) => async dispatch => {
    dispatch({ type: cartConstants.COUPON_ADD, payload: data });
};

export const coupon_remove = () => async dispatch => {
    dispatch({ type: cartConstants.COUPON_REMOVE });
};

export const grand_total = (data) => async dispatch => {
    dispatch({ type: cartConstants.GRAND_TOTAL, payload: data });
};

export const place_order = (formData, history) => async dispatch => {
    try {
        dispatch(alertActions.page_loader(true));
        dispatch({ type: cartConstants.PLACE_ORDER, payload: formData });
        await axios.post('/order/place_order', formData);
        dispatch({ type: cartConstants.ORDER_SUCCESS, payload: '' });
        window.location.replace('/dashboard/orders');
        dispatch(alertActions.page_loader(false));
    } catch (e) {
        const response = e.response.data
        console.log(response)
    }
};

export default {
    increment,
    decrement,
    addons_show,
    addons_hide,
    coupon_add,
    coupon_remove,
    grand_total,
    place_order,
};