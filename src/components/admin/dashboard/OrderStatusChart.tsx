import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { TOrderStatus } from "../../../interface";

ChartJS.register(ArcElement, Tooltip, Legend);

const OrderStatusChart = ({
  orders,
  isOrderDataLoading,
}: {
  orders: TOrderStatus[];
  isOrderDataLoading: boolean;
}) => {
  if (isOrderDataLoading) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="w-full h-60 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-lg"></div>

        <div className="w-40 h-4 bg-gray-200 animate-pulse rounded-md"></div>
      </div>
    );
  }

  // Extract order statuses and their counts

  const data = {
    labels: Object.keys(orders),
    datasets: [
      {
        label: "Order Status Breakdown",
        data: Object.values(orders),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)", // Red
          "rgba(54, 162, 235, 0.6)", // Blue
          "rgba(75, 192, 192, 0.6)", // Green
          "rgba(255, 206, 86, 0.6)", // Yellow
          "rgba(153, 102, 255, 0.6)", // Purple
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Order Status Breakdown",
      },
    },
  };

  return (
    <div className="order-status-chart">
      <Pie data={data} options={options} />
    </div>
  );
};

export default OrderStatusChart;
