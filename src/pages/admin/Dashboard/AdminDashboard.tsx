import DashboardStats from "../../../components/admin/dashboard/DashboardStats";
import LowStockProductsTable from "../../../components/admin/dashboard/LowStockProductsTable";
import OrderStatusChart from "../../../components/admin/dashboard/OrderStatusChart";
import RevenueChart from "../../../components/admin/dashboard/RevenueChart";
import {
  useGetOrderStatusStatsQuery,
  useGetRevenueDataQuery,
  useGetStatsQuery,
} from "../../../redux/features/dashboard/dashboard.api";

const AdminDashboard = () => {
  const { data: statsData, isLoading: isStatsLoading } =
    useGetStatsQuery(undefined);

  const { data: revenueData, isLoading: isRevenueLoading } =
    useGetRevenueDataQuery(undefined);
  const { data: orderStatusData, isLoading: isOrderStatusDataLoading } =
    useGetOrderStatusStatsQuery(undefined);

  const stats = statsData?.data || {};

  const revenue = revenueData?.data || [];

  const orders = orderStatusData?.data || [];

  return (
    <div className="dashboard-container p-6">
      <DashboardStats stats={stats} isStatsLoading={isStatsLoading} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-20 space-y-16 md:space-y-0">
        <div className="col-span-2 border rounded p-1">
          <RevenueChart
            revenueData={revenue}
            isRevenueLoading={isRevenueLoading}
          />
        </div>
        <div className="col-span-1 border rounded p-1">
          <OrderStatusChart
            orders={orders}
            isOrderDataLoading={isOrderStatusDataLoading}
          />{" "}
        </div>
      </div>
      <div>
        <LowStockProductsTable />
      </div>
    </div>
  );
};

export default AdminDashboard;
