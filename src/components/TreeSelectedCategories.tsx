import clsx from "clsx";
import { useTree } from "./TreeContext";
import { CategoryRaw } from "../lib/utils";

const TreeSelectedCategories = () => {
  const { categoriesState } = useTree();

  const selectedCategories: CategoryRaw[] = categoriesState
    .filter((category) => {
      return category.checked;
    })
    .map((c) => ({
      id: c.id,
      name: c.name,
      parent: c.parent,
    }));
 
  if (selectedCategories.length === 0) return null;

  return (
    <div className="px-6 py-2 border-t border-slate-200 flex flex-wrap gap-2">
      {selectedCategories.map((selectedCategory) => {
        return (
          <div
            className={clsx(
              "p-2 rounded-lg text-white text-sm",
              selectedCategory.parent === "0" ? "bg-teal-700" : "bg-slate-600"
            )}
            key={selectedCategory.id}
          >
            {selectedCategory.name}
          </div>
        );
      })}
    </div>
  );
};

export default TreeSelectedCategories;
