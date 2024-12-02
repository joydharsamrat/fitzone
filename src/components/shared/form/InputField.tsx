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
          className="block text-sm font-medium text-gray-500 mb-1"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <Controller
          name={name}
          render={({ field }) => (
            <input
              {...field}
              id={name}
              type={inputType}
              placeholder={label}
              className="block w-full px-4 py-2 border border-gray-300 bg-gray-100 text-gray-800 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition duration-200 "
            />
          )}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setPasswordVisible(!isPasswordVisible)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
          </button>
        )}
      </div>
      {errors[name] && (
        <span className="text-xs text-red-500 mt-1 block">
          {errors[name]?.message as string}
        </span>
      )}
    </div>
  );
};

export default InputField;
