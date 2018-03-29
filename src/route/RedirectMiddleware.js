"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actionTypes_1 = require("../register/actionTypes");
const history_1 = require("history");
const redirectMiddleware = ({ dispatch, getState }) => (next) => (action) => {
    const browserHistory = history_1.createBrowserHistory();
    switch (action.type) {
        case actionTypes_1.REGISTER_FAIL: {
            browserHistory.push("/login");
        }
        default:
    }
    return next(action);
};
exports.default = redirectMiddleware;
//# sourceMappingURL=RedirectMiddleware.js.map