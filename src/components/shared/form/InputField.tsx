import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const InputField = ({
  type,
  name,
  label,
}: {
  type: string;
  name: string;
  label: string;
}) => {
  const {
    formState: { errors },
  } = useFormContext();

  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const inputType = type === "password" && isPasswordVisible ? "text" : type;

  return (
    <div className="my-4">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium leading-6 text-white"
        >
          {label}
        </label>
      )}
      <div className="relative rounded-md shadow-sm">
        <Controller
          name={name}
          render={({ field }) => (
            <input
              {...field}
              id={name}
              type={inputType}
              placeholder={name}
              className="block w-full  border-0 py-1.5 pl-2 pr-5 bg-transparent border-b-2 outline-none text-white"
            />
          )}
        ></Controller>
        {type === "password" && (
          <button
            type="button"
            onClick={() => setPasswordVisible(!isPasswordVisible)}
            className="absolute inset-y-0 right-2 flex items-center text-white hover:text-gray-200 focus:outline-none"
          >
            {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
          </button>
        )}
      </div>
      {errors[name] && (
        <span className="text-xs text-red-500 mt-1">
          {errors[name]?.message as string}
        </span>
      )}
    </div>
  );
};

export default InputField;
