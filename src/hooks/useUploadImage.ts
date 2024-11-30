import { useState } from "react";
import { envConfig } from "../config/envConfig";

const useUploadImage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const uploadImage = async (imgData: File) => {
    setLoading(true);
    setError(null);
    try {
      const url = envConfig.IMGBB_URL;

      const formData = new FormData();
      formData.append("image", imgData);
      const res = await fetch(url, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      return data.data.url;
    } catch (err) {
      setError("Failed to upload image.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { uploadImage, loading, error };
};

export default useUploadImage;
