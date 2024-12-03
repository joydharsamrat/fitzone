export const OrderStatus = {
  PENDING: "pending",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
  CANCELED: "canceled",
  RETURNED: "returned",
} as const;

export const statusText: Record<string, string> = {
  pending: "Preparing for delivery",
  shipped: "On the way",
  delivered: "Delivered",
  canceled: "Order canceled",
  returned: "Order returned",
};

export const statusColors: Record<string, string> = {
  pending: "text-yellow-600",
  shipped: "text-blue-600",
  delivered: "text-green-600",
  canceled: "text-red-600",
  returned: "text-purple-600",
};
