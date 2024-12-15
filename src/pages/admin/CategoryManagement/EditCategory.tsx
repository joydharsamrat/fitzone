/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  useGetCategoryQuery,
  useUpdateCategoryMutation,
} from "../../../redux/features/category/categoryApi";
import Loader from "../../../components/shared/Loader";
import useUploadImage from "../../../hooks/useUploadImage";
import { TCategory } from "../../../interface";

const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useGetCategoryQuery(id);
  const [updateCategory, { isLoading: isUpdating }] =
    useUpdateCategoryMutation();
  const { uploadImage } = useUploadImage();

  const [title, setTitle] = useState("");
  const [existingIcon, setExistingIcon] = useState<string | null>(null);
  const [selectedIcon, setSelectedIcon] = useState<File | null>(null);

  const category: TCategory = data?.data;

  useEffect(() => {
    if (category) {
      setTitle(category.title);
      setExistingIcon(category.icon);
    }
  }, [category]);

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedIcon(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const loadingToast = toast.loading("Updating category...");
    try {
      let iconUrl = existingIcon;

      // If a new icon is selected, upload it
      if (selectedIcon) {
        iconUrl = await uploadImage(selectedIcon);
      }

      const updatedData = { title, icon: iconUrl };
      const response = await updateCategory({ id, data: updatedData }).unwrap();

      if (response.success) {
        toast.success("Category updated successfully!", { id: loadingToast });
        navigate("/admin/dashboard/category-management/categories");
      } else {
        throw new Error(response.message || "Failed to update category.");
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong!", {
        id: loadingToast,
      });
    }
  };

  if (isLoading || isUpdating) {
    return <Loader />;
  }

  return (
    <div className="h-screen flex flex-col items-center">
      <h1 className="section-title text-center mb-8">Edit Category</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md"
      >
        {/* Title Input */}
        <div className="mb-6">
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Category Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>

        {/* Icon Upload Section */}
        <div className="mb-6">
          <h2 className="text-sm font-medium mb-2">Category Icon</h2>
          <div className="flex flex-col items-center">
            <img
              className="w-24 h-24 object-cover rounded-lg mb-4"
              src={
                selectedIcon
                  ? URL.createObjectURL(selectedIcon)
                  : existingIcon || "/placeholder.png"
              }
              alt="Category Icon"
            />
            <label
              htmlFor="icon"
              className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Select Icon
            </label>
            <input
              id="icon"
              type="file"
              accept="image/*"
              onChange={handleIconChange}
              className="hidden"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Update Category
        </button>
      </form>
    </div>
  );
};

export default EditCategory;
