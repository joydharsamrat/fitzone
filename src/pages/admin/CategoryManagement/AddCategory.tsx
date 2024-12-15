/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCreateCategoryMutation } from "../../../redux/features/category/categoryApi";
import useUploadImage from "../../../hooks/useUploadImage";

const AddCategory = () => {
  const navigate = useNavigate();
  const { uploadImage } = useUploadImage();
  const [createCategory, { isLoading }] = useCreateCategoryMutation();

  const [title, setTitle] = useState("");
  const [selectedIcon, setSelectedIcon] = useState<File | null>(null);
  const [previewIcon, setPreviewIcon] = useState<string | null>(null);

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedIcon(file);
    if (file) {
      setPreviewIcon(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const loadingToast = toast.loading("Creating category...");

    try {
      let iconUrl = null;

      // Upload the icon if a file is selected
      if (selectedIcon) {
        iconUrl = await uploadImage(selectedIcon);
      }

      const newCategory = { title, icon: iconUrl };
      const response = await createCategory(newCategory).unwrap();

      if (response.success) {
        toast.success("Category added successfully!", { id: loadingToast });
        navigate("/admin/dashboard/category-management/categories");
      } else {
        throw new Error(response.message || "Failed to add category.");
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong!", {
        id: loadingToast,
      });
    }
  };

  return (
    <div className="h-screen flex flex-col items-center">
      <h1 className="section-title">Add Category</h1>
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
              src={previewIcon || "/placeholder.png"}
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
          {isLoading ? "Adding..." : "Add Category"}
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
