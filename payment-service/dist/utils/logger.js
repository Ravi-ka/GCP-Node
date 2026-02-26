"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logError = exports.logInfo = void 0;
const logInfo = (message, metadata = {}) => {
    console.log(JSON.stringify({
        severity: "INFO",
        message,
        timestamp: new Date().toISOString(),
        ...metadata
    }));
};
exports.logInfo = logInfo;
const logError = (message, metadata = {}) => {
    console.error(JSON.stringify({
        severity: "ERROR",
        message,
        timestamp: new Date().toISOString(),
        ...metadata
    }));
};
exports.logError = logError;
//# sourceMappingURL=logger.js.map