import { useState } from "react";
import { TCategory } from "../../interface";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/16/solid";

interface CategorySelectProps {
  categories: TCategory[];
  selectedCategories: TCategory[];
  onChange: (selected: TCategory[]) => void;
}

const CategorySelect = ({
  categories,
  selectedCategories,
  onChange,
}: CategorySelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Handle selection of categories
  const handleCategoryChange = (category: TCategory) => {
    const isSelected = selectedCategories.find(
      (cat) => cat._id === category._id
    );
    let updatedCategories;
    if (isSelected) {
      updatedCategories = selectedCategories.filter(
        (cat) => cat._id !== category._id
      );
    } else {
      updatedCategories = [...selectedCategories, category];
    }
    onChange(updatedCategories);
  };

  // Display selected categories as a comma-separated list
  const selectedLabels = selectedCategories.map((cat) => cat.title).join(", ");

  return (
    <div className="relative my-2">
      <label className="block text-sm font-medium mb-2">Categories</label>
      {/* Dropdown Button */}
      <button
        type="button"
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300 flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedLabels || "Select categories"}</span>
        <ChevronDownIcon className="w-5 h-5" />
      </button>

      {/* Dropdown Options */}
      {isOpen && (
        <div className="absolute mt-2 w-full bg-white border border-gray-300 rounded shadow-lg z-10">
          <ul className="max-h-60 overflow-auto">
            {categories.map((category) => (
              <li key={category._id} className="p-2 hover:bg-gray-100">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={
                      !!selectedCategories.find(
                        (cat) => cat._id === category._id
                      )
                    }
                    onChange={() => handleCategoryChange(category)}
                    className="form-checkbox"
                  />
                  <span>{category.title}</span>
                  {selectedCategories.find(
                    (cat) => cat._id === category._id
                  ) && <CheckIcon className="w-4 h-4 text-blue-500" />}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CategorySelect;
