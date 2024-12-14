/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Controller, FieldValues } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodError } from "zod";
import { useGetAllCategoriesQuery } from "../../../redux/features/category/categoryApi";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "../../../redux/features/product/product.api";
import useUploadImage from "../../../hooks/useUploadImage";
import {
  imageValidation,
  productDataValidationSchema,
} from "../../../schemas/ProductSchema";
import Loader from "../../../components/shared/Loader";
import Form from "../../../components/shared/form/Form";
import InputField from "../../../components/shared/form/InputField";
import SelectInput from "../../../components/shared/form/SelectInput";
import { TCategory } from "../../../interface";
import FileInput from "../../../components/shared/form/FileInput";
import { FaTimes } from "react-icons/fa";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // API hooks
  const { data: categoriesData, isLoading: isCategoriesLoading } =
    useGetAllCategoriesQuery(undefined);
  const { data: productData, isLoading: isProductLoading } =
    useGetProductByIdQuery(id);
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  const { uploadImage } = useUploadImage();

  const [selectedImages, setSelectedImages] = useState<FileList | null>(null);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [isDiscountEnabled, setIsDiscountEnabled] = useState(false);

  // Fetch categories and product data
  const categories = categoriesData?.data || [];
  const product = productData?.data;

  const defaultValues = {
    name: product?.name || "",
    price: product?.price || 0,
    category: product?.category._id || categories[0]?._id || "",
    description: product?.description || "",
    quantity: product?.quantity || 0,
    discount: product?.discount || 0,
    images: [],
  };

  // Populate existing images when product data is fetched
  useEffect(() => {
    if (product?.images) {
      setExistingImages(product.images);
    }
    if (product?.discount > 0) {
      setIsDiscountEnabled(true);
    }
  }, [product]);

  // Function to remove an image from the existingImages array
  const removeImage = (imageUrl: string) => {
    setExistingImages((prevImages) =>
      prevImages.filter((img) => img !== imageUrl)
    );
  };

  const onSubmit = async (data: FieldValues) => {
    const loadingToast = toast.loading("Updating product...");
    try {
      const parsedData: {
        price: number;
        quantity: number;
        discount?: number;
        images: string[] | File[];
      } = {
        ...data,
        price: parseFloat(data.price),
        quantity: parseInt(data.quantity, 10),
        discount: isDiscountEnabled ? parseFloat(data.discount || 0) : 0,
        images: selectedImages ? Array.from(selectedImages) : [],
      };

      if (parsedData.images.length + existingImages.length > 3) {
        toast.error("Cannot upload more than 3 images", { id: loadingToast });
        return;
      }

      let validatedData;
      let uploadedImageUrls: string[] = [];
      if (
        (existingImages.length > 0 && parsedData.images.length > 0) ||
        existingImages.length < 1
      ) {
        validatedData = imageValidation.parse(parsedData);
      }

      // Upload new images if any
      if (validatedData?.images?.length && validatedData?.images?.length > 0) {
        uploadedImageUrls = selectedImages
          ? await Promise.all(
              validatedData.images.map((img) => uploadImage(img))
            )
          : [];
      }

      parsedData.images = [...existingImages, ...uploadedImageUrls];

      // Update product
      const response = await updateProduct({ id, data: parsedData }).unwrap();

      if (response.success) {
        toast.success("Product updated successfully!", { id: loadingToast });
        navigate("/admin/dashboard/product-management/products");
      } else {
        toast.error(response.message || "Failed to update the product", {
          id: loadingToast,
        });
      }
    } catch (err: any) {
      let message =
        err?.data?.message ||
        err?.message ||
        "Something went wrong. Please try again!";
      if (err instanceof ZodError) {
        message = err.issues.map((issue) => issue.message).join(", ");
      }
      toast.error(message, { id: loadingToast });
    }
  };

  if (isCategoriesLoading || isProductLoading || isUpdating) {
    return <Loader />;
  }

  return (
    <div className="h-screen flex flex-col">
      <h1 className="section-title text-center mb-8">Edit Product</h1>

      <main className="flex-grow flex items-start justify-center ">
        <div className="w-full max-w-7xl flex gap-8 p-8 ">
          {/* Images Section */}
          <div className="w-1/3 flex flex-col gap-4 items-center mt-4 ">
            <h2 className="text-lg font-medium">Selected Images</h2>
            <div className="flex flex-col gap-4">
              {existingImages.length > 0 || selectedImages?.length ? (
                <>
                  {existingImages.map((img, index) => (
                    <div key={index} className="relative">
                      <img
                        className="w-full h-24 object-cover rounded-lg"
                        src={img}
                        alt={`Existing ${index}`}
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(img)}
                        className="absolute -top-1 -right-1 text-white bg-red-500 rounded-full p-1"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ))}
                  {selectedImages?.length &&
                    Array.from(selectedImages).map((img, index) => (
                      <div key={index} className="relative">
                        <img
                          className="w-full h-24 object-cover rounded-lg"
                          src={URL.createObjectURL(img)}
                          alt={`New ${index}`}
                        />
                      </div>
                    ))}
                </>
              ) : (
                Array(3)
                  .fill(null)
                  .map((_, index) => (
                    <img
                      className="w-full h-24 object-cover rounded-lg"
                      key={index}
                      src="/placeholder.png"
                      alt={`Placeholder ${index + 1}`}
                    />
                  ))
              )}
            </div>
            <label
              htmlFor="images"
              className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
            >
              Select Images
            </label>
          </div>

          {/* Form Section */}
          <div className="w-2/3">
            <Form
              onSubmit={onSubmit}
              defaultValues={defaultValues}
              resolver={zodResolver(productDataValidationSchema)}
            >
              <InputField type="text" name="name" label="Name" />
              <div className="flex justify-between items-center">
                <InputField type="number" name="price" label="Price" />
                <InputField type="number" name="quantity" label="Quantity" />
              </div>

              <Controller
                name="category"
                defaultValue={defaultValues.category}
                render={({ field }) => (
                  <SelectInput
                    data={categories}
                    selected={categories.find(
                      (category: TCategory) => category._id === field.value
                    )}
                    onChange={(value) => field.onChange(value._id)}
                    label="Category"
                  />
                )}
              />
              <InputField type="text" name="description" label="Description" />
              <div className="flex items-center gap-2 mt-4">
                <input
                  type="checkbox"
                  id="add-discount"
                  checked={isDiscountEnabled}
                  onChange={() => setIsDiscountEnabled(!isDiscountEnabled)}
                  className="cursor-pointer"
                />
                <label htmlFor="add-discount" className="cursor-pointer">
                  Add Discount
                </label>
              </div>
              {isDiscountEnabled && (
                <div className="mt-4">
                  <InputField
                    type="number"
                    name="discount"
                    label="Discount (%)"
                  />
                </div>
              )}
              <FileInput
                name="images"
                multiple
                max={3 - existingImages.length}
                accept="image/*"
                setSelectedImages={setSelectedImages}
              />
              <div className="mt-6">
                <input
                  type="submit"
                  value="Update Product"
                  className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
                />
              </div>
            </Form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditProduct;
