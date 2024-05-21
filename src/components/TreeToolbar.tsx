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
    <div data-testid="tree-toolbar" className="border-b border-slate-200 px-6 py-6 flex gap-4 sticky top-0 bg-white flex-col md:flex-row md:py-2 text-sm rounded-tl-lg rounded-tr-lg">
      <div
        className="flex items-center cursor-pointer bg-slate-700 p-1 px-3 rounded-full text-white"
        onClick={handleSelectAll}
      >
        <div>{selectAll ? "Deselect all" : "Select all"}</div>
      </div>
      <div
        className="flex items-center cursor-pointer bg-slate-700 p-1 px-3 rounded-full text-white"
        onClick={handleShowAll}
      >
        <div>
          {showAll ? "Hide all subcategories" : "Show all subcategories"}
        </div>
      </div>
    </div>
  );
};

export default TreeToolbar;
