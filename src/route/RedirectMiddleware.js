import { REGISTER_FAIL } from '../register/actionTypes';
import { createBrowserHistory } from 'history';
const redirectMiddleware = ({ dispatch, getState }) => (next) => (action) => {
    const browserHistory = createBrowserHistory();
    switch (action.type) {
        case REGISTER_FAIL: {
            browserHistory.push("/login");
        }
        default:
    }
    return next(action);
};
export default redirectMiddleware;
//# sourceMappingURL=RedirectMiddleware.js.map