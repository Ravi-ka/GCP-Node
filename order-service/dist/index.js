"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrder = void 0;
const pubsub_1 = require("@google-cloud/pubsub");
const uuid_1 = require("uuid");
const pubsub = new pubsub_1.PubSub();
const topicName = 'order-events';
const createOrder = async (req, res) => {
    try {
        const orderId = `ORD-${(0, uuid_1.v4)()}`;
        const event = {
            id: orderId,
            user_id: req.body.user_id,
            amount: req.body.amount,
            currency: req.body.currency,
            status: 'CREATED',
        };
        await pubsub.topic(topicName).publishMessage({
            data: Buffer.from(JSON.stringify(event))
        });
        res.status(201).json({ message: 'Order Created', orderId });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Error' });
    }
};
exports.createOrder = createOrder;
//# sourceMappingURL=index.js.map