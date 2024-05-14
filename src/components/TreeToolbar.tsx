import { useTree } from "./TreeContext";

const TreeToolbar = () => {
  const {
    setCategoriesState,
    categoriesState,
    selectAll,
    setSelectAll,
    showAll,
    setShowAll,
  } = useTree();

  const handleSelectAll = () => {
    const newState = categoriesState.map((category) => {
      return { ...category, checked: !selectAll };
    });
    setCategoriesState(newState);
    setSelectAll(!selectAll);
  };

  const handleShowAll = () => {
    const newState = categoriesState.map((category) => {
      return { ...category, showChildren: !showAll };
    });
    setCategoriesState(newState);
    setShowAll(!showAll);
  };

  return (
    <div className="border-b border-slate-300 px-6 py-2 flex gap-3">
      <div
        className="flex items-center cursor-pointer"
        onClick={handleSelectAll}
      >
        <input type="checkbox" className="w-4 h-4" checked={selectAll} />
        <div className="ml-2">{selectAll ? "Deselect all" : "Select all"}</div>
      </div>
      <div className="flex items-center cursor-pointer" onClick={handleShowAll}>
        <input type="checkbox" className="w-4 h-4" checked={showAll} />
        <div className="ml-2">
          {showAll ? "Hide subcategories" : "Show subcategories"}
        </div>
      </div>
    </div>
  );
};

export default TreeToolbar;
