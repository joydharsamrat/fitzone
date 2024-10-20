import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/16/solid";

import { TCategory } from "../../../interface";

const SelectInput = ({
  data,
  selected,
  label,
  onChange,
}: {
  data: TCategory[];
  selected: TCategory | null;
  label: string;
  onChange: (value: TCategory) => void;
}) => {
  return (
    <div className="my-2">
      <Listbox value={selected} onChange={onChange}>
        <Label className="block text-sm font-medium leading-6 text-white">
          {label}
        </Label>
        <div className="relative ">
          <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-700 sm:text-sm sm:leading-6">
            <span className="flex items-center">
              <img
                alt=""
                src={selected?.icon}
                className="h-5 w-5 flex-shrink-0 rounded-full"
              />
              <span className="ml-3 block truncate">{selected?.title}</span>
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
              <ChevronUpDownIcon
                aria-hidden="true"
                className="h-5 w-5 text-gray-400"
              />
            </span>
          </ListboxButton>

          <ListboxOptions
            transition
            className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-secondary-700 ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
          >
            {data?.map((category: TCategory) => (
              <ListboxOption
                key={category._id}
                value={category}
                className="group relative cursor-default select-none py-2 pl-3 pr-9 text-black data-[focus]:bg-secondary-700 data-[focus]:text-white"
              >
                <div className="flex items-center">
                  <img
                    alt=""
                    src={category.icon}
                    className="h-5 w-5 flex-shrink-0 rounded-full"
                  />
                  <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                    {category.title}
                  </span>
                </div>

                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-primary-700 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                  <CheckIcon aria-hidden="true" className="h-5 w-5" />
                </span>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>
    </div>
  );
};

export default SelectInput;
