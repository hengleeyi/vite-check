import { useTree } from "./TreeContext";

const TreeToolbar = () => {
  const { setCategoriesState, categoriesState, selectAll, setSelectAll } =
    useTree();

  const handleSelectAll = () => {
    const newState = categoriesState.map((category) => {
      return { ...category, checked: !selectAll };
    });
    setCategoriesState(newState);
    setSelectAll(!selectAll);
  };

  return (
    <div className="border-b border-slate-700 px-6">
      <div
        className="flex items-center cursor-pointer"
        onClick={handleSelectAll}
      >
        <input type="checkbox" className="w-4 h-4" checked={selectAll} />
        <div className="ml-2">{selectAll ? "Deselect all" : "Select all"}</div>
      </div>
    </div>
  );
};

export default TreeToolbar;
