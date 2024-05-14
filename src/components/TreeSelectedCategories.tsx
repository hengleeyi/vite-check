import clsx from "clsx";
import { useTree } from "./TreeContext";

const TreeSelectedCategories = () => {
  const { selectedCategories } = useTree();

  if (selectedCategories.length === 0) return null;

  return (
    <div className="px-6 py-2 border-t border-slate-300 flex flex-wrap gap-2">
      {selectedCategories.map((selectedCategory) => {
        return (
          <div
            className={clsx(
              "p-2 rounded-lg text-white text-sm",
              selectedCategory.parent === "0" ? "bg-teal-700" : "bg-slate-600"
            )}
          >
            {selectedCategory.name}
          </div>
        );
      })}
    </div>
  );
};

export default TreeSelectedCategories;
