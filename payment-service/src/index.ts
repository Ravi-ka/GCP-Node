import { OrderCreatedEvent } from "./types/order-event"
import { logInfo, logError } from './utils/logger';
import pool from "./utils/pg";
import { v4 as uuidv4 } from 'uuid';

export const processPayment = async (event: any) => {
  try {
    const message = JSON.parse(
      Buffer.from(event.data, 'base64').toString()
    ) as OrderCreatedEvent;

    logInfo('event message received', {service:"payment-service", event: message, timestamp: new Date().toISOString()});

    const client = await pool.connect();
    await client.query('BEGIN');
    const paymentId = uuidv4();

   logInfo('Processing payment', {service:"payment-service", orderId: message.id, userId: message.user_id, amount: message.amount, currency: message.currency, timestamp: new Date().toISOString()});
await client.query(
      `INSERT INTO paymentsprocessor (id, user_id, amount, status)
       VALUES ($1, $2, $3, $4)`,
      [paymentId, message.user_id, message.amount, 'CREATED']
    );

    await client.query('COMMIT');
  
    logInfo('Payment processed successfully', {service:"payment-service", paymentId, orderId: message.id, timestamp: new Date().toISOString()});
  } catch (error) {
    logError('Payment processing failed', {service:"payment-service", error, timestamp: new Date().toISOString()});
    throw error; // Important for retry mechanism
  }
};