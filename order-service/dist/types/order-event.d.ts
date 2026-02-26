export interface OrderCreatedEvent {
    eventType: 'order-created';
    orderId: string;
    userId: string;
    amount: number;
    items: any[];
    createdAt: string;
}
//# sourceMappingURL=order-event.d.ts.map