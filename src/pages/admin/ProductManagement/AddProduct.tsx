/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, FieldValues } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodError } from "zod";
import { useGetAllCategoriesQuery } from "../../../redux/features/category/categoryApi";
import { useCreateProductMutation } from "../../../redux/features/product/product.api";
import useUploadImage from "../../../hooks/useUploadImage";
import {
  imageValidation,
  productDataValidationSchema,
} from "../../../schemas/ProductSchema";
import Loader from "../../../components/shared/Loader";
import Form from "../../../components/shared/form/Form";
import InputField from "../../../components/shared/form/InputField";
import SelectInput from "../../../components/shared/form/SelectInput";
import FileInput from "../../../components/shared/form/FileInput";
import { TCategory } from "../../../interface";

const AddProduct = () => {
  const { isLoading, data } = useGetAllCategoriesQuery(undefined);
  const [loading, setLoading] = useState(false);
  const [createProduct] = useCreateProductMutation();
  const [selectedImages, setSelectedImages] = useState<FileList | null>(null);
  const [showDiscount, setShowDiscount] = useState(false);
  const { uploadImage } = useUploadImage();

  const defaultValues = {
    name: "",
    price: 0,
    discount: 0,
    category: data?.data[0]?._id || "",
    description: "",
    quantity: 0,
    images: [],
  };

  const onSubmit = async (data: FieldValues) => {
    setLoading(true);
    const parsedData = {
      ...data,
      price: parseFloat(data.price),
      discount: parseFloat(data.discount || 0),
      quantity: parseInt(data.quantity, 10),
      images: data.images ? Array.from(data.images) : [],
    };
    try {
      const validatedData = imageValidation.parse(parsedData);

      const imgUrls = await Promise.all(
        validatedData.images.map((img) => uploadImage(img))
      );

      parsedData.images = imgUrls;

      const response = await createProduct(parsedData).unwrap();

      if (response.success) {
        setSelectedImages(null);
        toast.success("Product added successfully", { id: "product" });
      } else {
        toast.error(response.message || "Failed to create the product", {
          id: "product",
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

      toast.error(message, { id: "product" });
    } finally {
      setLoading(false);
    }
  };

  if (isLoading || loading) {
    return <Loader />;
  }

  return (
    <div className="h-screen flex flex-col">
      <h1 className="section-title">Add Product</h1>

      <main className="flex-grow flex items-start justify-center ">
        <div className="w-full max-w-7xl flex gap-8 p-8 ">
          {/* Images Section */}
          <div className="w-1/3 flex flex-col gap-4 items-center mt-4 ">
            <h2 className="text-lg font-medium">Selected Images</h2>
            <div className="flex flex-col gap-4">
              {selectedImages && selectedImages.length > 0
                ? Array.from(selectedImages).map((img, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(img)}
                      alt={`Selected ${index}`}
                      className="w-full h-24 object-cover rounded-lg "
                    />
                  ))
                : Array(3)
                    .fill(null)
                    .map((_, index) => (
                      <img
                        key={index}
                        src="/placeholder.png"
                        alt={`Placeholder ${index}`}
                        className="w-full h-24 object-cover rounded-lg "
                      />
                    ))}
            </div>
            <label
              htmlFor="images"
              className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Select Images
            </label>
          </div>

          {/* Form Section */}
          <div className="w-2/3 ">
            <Form
              onSubmit={onSubmit}
              defaultValues={defaultValues}
              resolver={zodResolver(productDataValidationSchema)}
            >
              <InputField type="text" name="name" label="Name" />
              <div className="flex justify-between gap-5 items-center">
                <InputField type="number" name="price" label="Price" />
                <InputField type="number" name="quantity" label="Quantity" />
              </div>

              <Controller
                name="category"
                defaultValue={data?.data[0]?._id || ""}
                render={({ field }) => (
                  <SelectInput
                    data={data?.data || []}
                    selected={data?.data?.find(
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
                  className="cursor-pointer"
                  checked={showDiscount}
                  onChange={(e) => setShowDiscount(e.target.checked)}
                />
                <label htmlFor="add-discount" className="cursor-pointer">
                  Add Discount
                </label>
              </div>
              {showDiscount && (
                <div className="mt-4 transition-opacity duration-300 ease-in-out">
                  <InputField
                    type="number"
                    name="discount"
                    label="Discount (Optional)"
                  />
                </div>
              )}
              <FileInput
                name="images"
                multiple
                max={3}
                accept="image/*"
                setSelectedImages={setSelectedImages}
              />
              <div className="mt-6">
                <input
                  type="submit"
                  value="Submit"
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

export default AddProduct;
