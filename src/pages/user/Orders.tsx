import { useState } from "react";
import Order from "../../components/orders/Order";
import Loader from "../../components/shared/Loader";
import { TOrder } from "../../interface";
import { useGetOrderByUserIdQuery } from "../../redux/features/order/order.api";

const Orders = () => {
  const { data, isLoading } = useGetOrderByUserIdQuery(undefined);
  const [isShippingOpen, setIsShippingOpen] = useState<string | null>(null);

  const handleShippingOpen = (id: string) => {
    setIsShippingOpen(null);
    if (id !== isShippingOpen) {
      setIsShippingOpen(id);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      <h1 className="text-4xl font-bold mb-8 animate__animated animate__fadeInDown">
        My Orders
      </h1>

      {data?.data?.length === 0 ? (
        <p className="text-lg text-gray-600 animate__animated animate__fadeIn">
          You have not placed any orders yet.
        </p>
      ) : (
        <div className="space-y-12">
          {data.data.map((order: TOrder) => (
            <Order
              key={order._id}
              order={order}
              handleShippingOpen={handleShippingOpen}
              isShippingOpen={isShippingOpen}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
