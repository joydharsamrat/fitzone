import { useGetAllCategoriesQuery } from "../../../redux/features/category/categoryApi";
import { AiFillEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import { TCategory } from "../../../interface";
import ProductTableSkeleton from "../../../components/shared/loaders/ProductTableSkeleton";

const Categories = () => {
  const { data, isLoading } = useGetAllCategoriesQuery(undefined);

  return (
    <div>
      <div className="overflow-x-auto">
        <h1 className="section-title">Category Management</h1>
        <table className="min-w-full table-auto border-collapse border-y border-gray-300">
          <thead>
            <tr>
              <th className="py-2 min-w-[20px] border-b text-start">Icon</th>
              <th className="py-2 px-4 min-w-[150px] border-b text-start">
                Name
              </th>
              <th className="py-2 px-4 min-w-[150px] border-b text-start">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <>
                <ProductTableSkeleton />
                <ProductTableSkeleton />
                <ProductTableSkeleton />
                <ProductTableSkeleton />
                <ProductTableSkeleton />
                <ProductTableSkeleton />
              </>
            ) : data?.data.length ? (
              data?.data.map((category: TCategory) => (
                <tr key={category._id}>
                  <td className="py-2  border-b">
                    <img
                      className="w-8 h-8 object-cover rounded"
                      src={category.icon || "/placeholder.png"}
                      alt={category.title}
                    />
                  </td>
                  <td className="py-2 px-4 border-b ">{category.title}</td>
                  <td className="py-2 px-4 border-b ">
                    <div className="flex gap-3">
                      <button
                        // onClick={() => handleDeleteProduct(product._id)}
                        className="text-red-600 flex items-center gap-2"
                      >
                        <FaTrashAlt />
                        Delete
                      </button>
                      <Link
                        to={`/admin/dashboard/category-management/categories/edit/${category._id}`}
                        className="text-blue-600 flex items-center gap-2"
                      >
                        <AiFillEdit />
                        Edit
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  No Products Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Categories;
