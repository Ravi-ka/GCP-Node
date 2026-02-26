export interface OrderCreatedEvent {
  id: string;         // UUID
  user_id: string;    // UUID
  amount: string;     // NUMERIC(12,2) - use string to avoid floating point rounding issues
  currency: string;   // VARCHAR(10)
  status: string; // VARCHAR(20)
  created_at?: Date;
}