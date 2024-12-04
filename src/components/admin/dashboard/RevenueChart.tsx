import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary chart elements
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface RevenueData {
  dailyRevenue: number;
  weeklyRevenue: number;
  monthlyRevenue: number;
  _id: {
    day: string;
    week: number;
    month: number;
  };
}

interface ChartProps {
  revenueData: RevenueData[];
  isRevenueLoading: boolean;
}

const RevenueChart = ({ revenueData, isRevenueLoading }: ChartProps) => {
  if (isRevenueLoading) {
    return (
      <div className="animate-pulse p-4 bg-gray-200 rounded-md h-60 flex justify-center items-center">
        <div className="bg-gray-300 w-3/4 h-8 rounded-md"></div>
      </div>
    );
  }

  const chartData = {
    labels: revenueData.map((data) => data._id.day), // Create labels for each data point
    datasets: [
      {
        label: "Daily Revenue",
        data: revenueData.map((data) => data.dailyRevenue),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
      {
        label: "Weekly Revenue",
        data: revenueData.map((data) => data.weeklyRevenue),
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        fill: true,
      },
      {
        label: "Monthly Revenue",
        data: revenueData.map((data) => data.monthlyRevenue),
        borderColor: "rgba(255, 159, 64, 1)",
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        fill: true,
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
        text: "Revenue Overview",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default RevenueChart;
