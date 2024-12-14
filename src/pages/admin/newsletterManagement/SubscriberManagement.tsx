/* eslint-disable @typescript-eslint/no-explicit-any */
import { TSubscriber } from "../../../interface";
import Loader from "../../../components/shared/Loader";
import toast from "react-hot-toast";
import {
  useCancelSubscriptionMutation,
  useGetSubscribersQuery,
} from "../../../redux/features/newsletter/newsletter.api";

const SubscriberManagement = () => {
  const { data, isLoading } = useGetSubscribersQuery(undefined);
  const subscribers: TSubscriber[] = data?.data || [];

  const [cancelSubscription] = useCancelSubscriptionMutation();

  const handleCancelSubscription = async (email: string) => {
    const loadingToast = toast.loading("Loading...");
    try {
      const res = await cancelSubscription(email);
      if (res.error) {
        throw new Error("Failed to cancel subscription");
      }
      toast.success(`Canceled subscription successfully!`, {
        id: loadingToast,
      });
    } catch (error: any) {
      toast.error(
        error.message || error?.data?.message || "Failed. Please try again.",
        {
          id: loadingToast,
        }
      );
      console.log(error);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="max-w-4xl mx-auto my-10">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Subscriber Management
      </h1>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left font-medium text-gray-600">
                Email
              </th>
              <th className="px-4 py-2 text-left font-medium text-gray-600">
                status
              </th>
              <th className="px-4 py-2 text-center font-medium text-gray-600 min-w-[150px]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((subscriber) => (
              <tr key={subscriber._id} className="border-b">
                <td className="px-4 py-3">{subscriber.email}</td>
                <td className="px-4 py-3 capitalize">{subscriber.status}</td>
                <td className="px-4 py-3 text-center">
                  {subscriber.status === "active" ? (
                    <button
                      onClick={() => handleCancelSubscription(subscriber.email)}
                      className="bg-primary-700 text-white px-2 py-1 text-sm rounded hover:bg-primary-900"
                    >
                      Cancel Subscription
                    </button>
                  ) : (
                    <span className="text-gray-500 italic">
                      No actions available
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubscriberManagement;
