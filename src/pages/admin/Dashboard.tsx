import DashboardStats from "../../components/admin/dashboard/DashboardStats";
import { useGetStatsQuery } from "../../redux/features/dashboard/dashboard.api";

const Dashboard = () => {
  const { data: statsData, isLoading: isStatsLoading } =
    useGetStatsQuery(undefined);

  const stats = statsData?.data || {};

  return (
    <div className="dashboard-container p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Admin Dashboard</h1>
      <DashboardStats stats={stats} isStatsLoading={isStatsLoading} />
    </div>
  );
};

export default Dashboard;
