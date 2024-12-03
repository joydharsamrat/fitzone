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

  // Fetch categories and product data
  const categories = categoriesData?.data || [];
  const product = productData?.data;

  const defaultValues = {
    name: product?.name || "",
    price: product?.price || 0,
    category: product?.category._id || categories[0]?._id || "",
    description: product?.description || "",
    quantity: product?.quantity || 0,
    images: [],
  };

  // Populate existing images when product data is fetched
  useEffect(() => {
    if (product?.images) {
      setExistingImages(product.images);
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
        images: string[] | File[];
      } = {
        ...data,
        price: parseFloat(data.price),
        quantity: parseInt(data.quantity, 10),
        images: selectedImages ? Array.from(selectedImages) : [],
      };

      if (parsedData.images.length + existingImages.length > 3) {
        toast.error("Can not upload more than 3 images", { id: loadingToast });

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
    <div className="">
      <h1 className="text-3xl font-semibold text-center mb-10">Edit Product</h1>
      <div className="flex justify-center items-center">
        {/* Existing images */}
        <div className="w-1/3 p-10 bg-neutral-200 rounded-s-xl flex flex-col items-center justify-between">
          <div>
            {existingImages.length > 0 || selectedImages?.length ? (
              <>
                {existingImages.length > 0 &&
                  existingImages.map((img, index) => (
                    <div key={index} className="relative mb-2">
                      <img
                        className="w-[100px] rounded-md"
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
                    <div key={index} className="relative mb-2">
                      <img
                        className="w-[100px] rounded-md"
                        src={URL.createObjectURL(img)}
                        alt={`Existing ${index}`}
                      />
                    </div>
                  ))}
              </>
            ) : (
              Array(3)
                .fill(null)
                .map((_, index) => (
                  <img
                    className="w-[100px] rounded-md mb-2"
                    key={index}
                    src="/placeholder.png"
                    alt={`Placeholder ${index + 1}`}
                  />
                ))
            )}
          </div>

          <label className="btn-primary mt-5" htmlFor="images">
            Select New Images
          </label>
        </div>

        {/* Form */}
        <div className="bg-gradient w-1/3 p-10 rounded-e-xl">
          <Form
            onSubmit={onSubmit}
            defaultValues={defaultValues}
            resolver={zodResolver(productDataValidationSchema)}
          >
            <InputField type="text" name="name" label="Name" />
            <InputField type="number" name="price" label="Price" />
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
                  label="Categories"
                />
              )}
            />
            <InputField type="text" name="description" label="Description" />
            <InputField type="number" name="quantity" label="Quantity" />
            <FileInput
              name="images"
              multiple={true}
              max={3 - existingImages.length}
              accept="image/*"
              setSelectedImages={setSelectedImages}
            />
            <div className="flex justify-end">
              <input
                type="submit"
                value="Update Product"
                className="btn-primary mt-5"
              />
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
