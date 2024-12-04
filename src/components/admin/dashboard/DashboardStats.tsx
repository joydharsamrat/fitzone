import { TStats } from "../../../interface";

type DashboardStatsProps = {
  stats: TStats;
  isStatsLoading: boolean;
};

const DashboardStats = ({ stats, isStatsLoading }: DashboardStatsProps) => {
  return (
    <div>
      {isStatsLoading ? (
        // Skeleton Loader
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="bg-gray-200 animate-pulse p-6 rounded-xl shadow-lg"
            >
              <div className="h-6 bg-gray-300 mb-4 rounded"></div>
              <div className="h-12 bg-gray-300 mb-2 rounded"></div>
              <div className="h-4 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Users Card */}
          <div
            className="bg-gradient p-6 border-2 border-white rounded-xl shadow-lg animate__animated animate__fadeIn"
            data-wow-duration="1s"
          >
            <h3 className="text-xl font-semibold text-white text-center mb-4">
              Total Users
            </h3>
            <div className="space-y-2 text-white flex flex-col justify-between">
              <div>
                <p className="text-5xl text-center font-semibold">
                  {stats.totalUsers?.total || 0}
                </p>
              </div>
              <div className="flex justify-around">
                <p>
                  <strong>Admins:</strong> {stats.totalUsers?.admin || 0}
                </p>
                <p>
                  <strong>Users:</strong> {stats.totalUsers?.user || 0}
                </p>
              </div>
            </div>
          </div>

          {/* Total Products Card */}
          <div
            className="bg-gradient p-6 border-2  rounded-xl shadow-lg border-white animate__animated animate__fadeIn"
            data-wow-duration="1s"
          >
            <h3 className="text-xl font-semibold text-white text-center mb-4">
              Total Products
            </h3>
            <div className="flex justify-around text-white">
              <div>
                <p className="text-5xl font-semibold text-center">
                  {stats.totalProducts?.uniqueProducts || 0}
                </p>
                <span>
                  <strong>Unique Products</strong>
                </span>
              </div>
              <div>
                <p className="text-5xl font-semibold">
                  {stats.totalProducts?.totalStockUnits || 0}
                </p>
                <span>
                  <strong>Total Stock</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Pending Shipments Card */}
          <div
            className="bg-gradient p-6 border-2  rounded-xl shadow-lg border-white animate__animated animate__fadeIn"
            data-wow-duration="1s"
          >
            <h3 className="text-xl font-semibold text-white text-center mb-4">
              Pending Shipments
            </h3>
            <div className="text-white">
              <p className="text-5xl font-semibold text-center">
                {stats.pendingShipments || 0}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardStats;
