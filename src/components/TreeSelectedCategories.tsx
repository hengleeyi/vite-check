import { useTree } from "./TreeContext";

const TreeSelectedCategories = () => {
  const { selectedCategories } = useTree();

  return (
    <div className="px-6 py-2 border-t border-slate-300 flex flex-wrap gap-2">
      {selectedCategories.map((selectedCategory) => {
        return <div className="p-2 rounded-lg bg-slate-600 text-white text-sm">{selectedCategory.name}</div>;
      })}
    </div>
  );
};

export default TreeSelectedCategories;
