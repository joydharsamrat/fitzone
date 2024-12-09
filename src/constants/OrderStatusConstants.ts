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
  pending:
    "bg-yellow-100 text-yellow-700 font-semibold text-xs px-2 py-1 rounded-full",
  shipped:
    "bg-blue-100 text-blue-700 font-semibold text-xs px-2 py-1 rounded-full",
  delivered:
    "bg-green-100 text-green-700 font-semibold text-xs px-2 py-1 rounded-full",
  canceled:
    "bg-red-100 text-red-700 font-semibold text-xs px-2 py-1 rounded-full",
  returned:
    "bg-purple-100 text-purple-700 font-semibold text-xs px-2 py-1 rounded-full",
};
