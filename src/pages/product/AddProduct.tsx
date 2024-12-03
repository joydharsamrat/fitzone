/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, FieldValues } from "react-hook-form";
import SelectInput from "../../components/shared/form/SelectInput";
import InputField from "../../components/shared/form/InputField";
import { useGetAllCategoriesQuery } from "../../redux/features/category/categoryApi";
import { TCategory } from "../../interface";
import Loader from "../../components/shared/Loader";
import Form from "../../components/shared/form/Form";
import FileInput from "../../components/shared/form/FileInput";
import { useState } from "react";
import useUploadImage from "../../hooks/useUploadImage";
import { useCreateProductMutation } from "../../redux/features/product/product.api";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  imageValidation,
  productDataValidationSchema,
} from "../../schemas/ProductSchema";
import { ZodError } from "zod";

const AddProduct = () => {
  const { isLoading, data } = useGetAllCategoriesQuery(undefined);
  const [loading, setLoading] = useState(false);
  const [createProduct] = useCreateProductMutation();
  const [selectedImages, setSelectedImages] = useState<FileList | null>(null);
  const { uploadImage } = useUploadImage();

  const defaultValues = {
    name: "",
    price: 0,
    category: data?.data[0]._id,
    description: "",
    quantity: 0,
    img: [],
  };

  const onSubmit = async (data: FieldValues) => {
    setLoading(true);
    const parsedData = {
      ...data,
      price: parseFloat(data.price),
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
        message = err.issues.map((issue) => issue.message);
      }

      toast.error(message, {
        id: "product",
      });
    } finally {
      setLoading(false);
    }
  };

  if (isLoading || loading) {
    return <Loader />;
  }

  return (
    <div className="">
      <h1 className="text-3xl font-semibold text-center mb-10">Add Product</h1>
      <div className="flex justify-center items-center">
        <div className="w-1/3 p-10 bg-neutral-200 rounded-s-xl flex flex-col items-center justify-between">
          <div>
            {selectedImages && selectedImages.length > 0
              ? Array.from(selectedImages).map((img, index) => (
                  <img
                    className="w-[100px] rounded-md mb-2"
                    key={index}
                    src={URL.createObjectURL(img)}
                    alt={`Selected ${index}`}
                  />
                ))
              : Array(3)
                  .fill(null)
                  .map((_, index) => (
                    <img
                      className="w-[100px] rounded-md mb-2"
                      key={index}
                      src="/placeholder.png"
                      alt={`Placeholder ${index + 1}`}
                    />
                  ))}
          </div>

          <label className="btn-primary mt-5" htmlFor="images">
            Select Images
          </label>
        </div>
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
              defaultValue={data.data[0]._id}
              render={({ field }) => (
                <SelectInput
                  data={data.data}
                  selected={data.data.find(
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
              max={3}
              accept="image/*"
              setSelectedImages={setSelectedImages}
            />
            <div className="flex justify-end">
              <input
                type="submit"
                value="submit"
                className="btn-primary mt-5"
              />
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
