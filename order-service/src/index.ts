import { PubSub } from '@google-cloud/pubsub';
import { v4 as uuidv4 } from 'uuid';
import { Request, Response } from 'express';
import { OrderCreatedEvent } from './types/order-event';

const pubsub = new PubSub();
const topicName = 'order-events';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const orderId = `ORD-${uuidv4()}`;

    const event: OrderCreatedEvent = {
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Error' });
  }
};