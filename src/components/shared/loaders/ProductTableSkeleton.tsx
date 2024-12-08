const ProductTableSkeleton = () => (
  <tr>
    <td className="py-2 px-4 border-b">
      <div className="w-20 h-20 bg-gray-300 animate-pulse rounded" />
    </td>
    <td className="py-2 px-4 border-b">
      <div className="h-6 bg-gray-300 animate-pulse rounded" />
    </td>
    <td className="py-2 px-4 border-b">
      <div className="w-16 h-6 bg-gray-300 animate-pulse rounded" />
    </td>
    <td className="py-2 px-4 border-b">
      <div className="w-16 h-6 bg-gray-300 animate-pulse rounded" />
    </td>
    <td className="py-2 px-4 border-b">
      <div className="w-24 h-6 bg-gray-300 animate-pulse rounded" />
    </td>
  </tr>
);

export default ProductTableSkeleton;
