import { authConstants, alertConstants } from '../helpers/constants';

const INITIAL_STATE = { page_loader: false };

export default function alert(state = INITIAL_STATE, action) {
    switch (action.type) {
        case alertConstants.FULLPAGE_LOADER:
            return { ...state, page_loader: action.payload };
        case authConstants.SUCCESS:
            return {
                type: 'alert-success',
                message: action.message
            };
        case authConstants.ERROR:
            return {
                type: 'alert-danger',
                message: action.message
            };
        case authConstants.CLEAR:
            return {};
        default:
            return state
    }
}
