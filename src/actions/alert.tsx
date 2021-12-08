import { authConstants, alertConstants } from '../helpers/constants';

export const alertActions = {
    success,
    error,
    clear,
    page_loader,
};

function success(message) {
    return { type: authConstants.SUCCESS, message };
}

function error(message) {
    return { type: authConstants.ERROR, message };
}

function clear() {
    return { type: authConstants.CLEAR };
}

function page_loader(status) {
    return { type: alertConstants.FULLPAGE_LOADER, payload: status };
}