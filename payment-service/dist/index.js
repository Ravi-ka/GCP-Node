"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processPayment = void 0;
const logger_1 = require("./utils/logger");
const pg_1 = __importDefault(require("./utils/pg"));
const uuid_1 = require("uuid");
const processPayment = async (event) => {
    try {
        const message = JSON.parse(Buffer.from(event.data, 'base64').toString());
        (0, logger_1.logInfo)('event message received', { service: "payment-service", event: message, timestamp: new Date().toISOString() });
        const client = await pg_1.default.connect();
        await client.query('BEGIN');
        const paymentId = (0, uuid_1.v4)();
        (0, logger_1.logInfo)('Processing payment', { service: "payment-service", orderId: message.id, userId: message.user_id, amount: message.amount, currency: message.currency, timestamp: new Date().toISOString() });
        await client.query(`INSERT INTO paymentsprocessor (id, user_id, amount, status)
       VALUES ($1, $2, $3, $4)`, [paymentId, message.user_id, message.amount, 'CREATED']);
        await client.query('COMMIT');
        (0, logger_1.logInfo)('Payment processed successfully', { service: "payment-service", paymentId, orderId: message.id, timestamp: new Date().toISOString() });
    }
    catch (error) {
        (0, logger_1.logError)('Payment processing failed', { service: "payment-service", error, timestamp: new Date().toISOString() });
        throw error; // Important for retry mechanism
    }
};
exports.processPayment = processPayment;
//# sourceMappingURL=index.js.map