import React from "react";
import { Controller } from "react-hook-form";
import toast from "react-hot-toast";

const FileInput = ({
  name,
  multiple,
  max,
  accept,
  setSelectedImages,
}: {
  name: string;
  multiple: boolean;
  max: number;
  accept: string;
  setSelectedImages: React.Dispatch<React.SetStateAction<FileList | null>>;
}) => {
  return (
    <div className="hidden">
      <Controller
        name={name}
        render={({ field }) => (
          <input
            type="file"
            maxLength={max}
            id={name}
            multiple={multiple}
            accept={accept}
            onChange={(e) => {
              const files = e.target.files;
              if (files && files.length > max) {
                toast.error(`You can only upload up to ${max} images.`);
                e.target.value = "";
              } else {
                field.onChange(files);
                setSelectedImages(files);
              }
            }}
            ref={field.ref}
          />
        )}
      />
    </div>
  );
};

export default FileInput;
