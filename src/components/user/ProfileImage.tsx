/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { FaRegEdit, FaTimes } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import toast from "react-hot-toast";
import { useUpdateUserInfoMutation } from "../../redux/features/user/user.api";
import useUploadImage from "../../hooks/useUploadImage";
import SmallSpinner from "../shared/loaders/SmallSpinner";

interface ProfileImageProps {
  user: { name?: string; image?: string };
}

const ProfileImage: React.FC<ProfileImageProps> = ({ user }) => {
  const [updateUser] = useUpdateUserInfoMutation();
  const { uploadImage } = useUploadImage();
  const [img, setImg] = useState<File | null>(null);
  const [imgData, setImgData] = useState<
    string | ArrayBuffer | null | undefined
  >(null);
  const [changingImg, setChangingImg] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const file = event.target.files[0];
    setImg(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      setImgData(e.target?.result);
      setChangingImg(true);
    };
    reader.readAsDataURL(file);
  };

  const handleCancelChange = () => {
    setChangingImg(false);
    setImgData(null);
    (document.getElementById("profileImg") as HTMLInputElement).value = "";
  };

  const handleAddImage = async () => {
    if (!img) {
      toast.error("Image not found");
      return;
    }

    setIsLoading(true);
    try {
      const url = await uploadImage(img);
      await updateUser({ image: url });
      setChangingImg(false);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to upload image");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`relative h-24 w-24 rounded-full shadow-box border-8 bg-white ${
        changingImg ? "mb-5" : ""
      }`}
    >
      {isLoading ? (
        <div className="absolute inset-0 rounded-full flex justify-center items-center bg-primary-700 ">
          <SmallSpinner />
        </div>
      ) : (
        <div>
          {changingImg ? (
            <div className="relative">
              <label htmlFor="profileImg">
                <img
                  className="h-20 w-20 rounded-full"
                  src={
                    typeof imgData === "string"
                      ? imgData
                      : "/placeholder_user.jpg"
                  }
                  alt={user.name || "profile"}
                />
              </label>
              <div className="absolute left-1/2 -translate-x-1/2 -bottom-8 flex gap-2">
                <button
                  className="bg-red-500 p-1 text-white rounded-full"
                  onClick={handleCancelChange}
                  disabled={isLoading}
                >
                  <FaTimes />
                </button>
                <button
                  className="bg-green-500 p-1 text-white rounded-full"
                  onClick={handleAddImage}
                  disabled={isLoading}
                >
                  <TiTick />
                </button>
              </div>
            </div>
          ) : (
            <label
              htmlFor="profileImg"
              className="relative group cursor-pointer"
            >
              <img
                className="h-20 w-20 rounded-full border-2 border-gray-300"
                src={user.image || "/assets/images/placeholder_user.jpg"}
                alt={user.name || "profile"}
              />
              <span className="absolute bottom-1 right-1 bg-gray-800 bg-opacity-50 p-2 rounded-full text-white shadow-lg group-hover:bg-gray-600 transition">
                <FaRegEdit />
              </span>
            </label>
          )}
          <input
            id="profileImg"
            className="hidden"
            type="file"
            accept=".png,.jpg,.jpeg"
            onChange={handleImageChange}
          />
        </div>
      )}
    </div>
  );
};

export default ProfileImage;
