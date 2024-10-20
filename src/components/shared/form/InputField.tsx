import { Controller } from "react-hook-form";

const InputField = ({
  type,
  name,
  label,
}: {
  type: string;
  name: string;
  label: string;
}) => {
  return (
    <div className="my-1">
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
              type={type}
              placeholder={name}
              className="block w-full rounded-md border-0 py-1.5 pl-2 pr-5  ring-1 ring-inset ring-gray-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-secondary-700 sm:text-sm sm:leading-6"
            />
          )}
        ></Controller>
      </div>
    </div>
  );
};

export default InputField;
