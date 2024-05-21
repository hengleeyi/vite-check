import { createContext, useContext, useState } from "react";
import {
  Category,
  CategoryRaw,
  CategoryState,
  createNestedCategories,
} from "../lib/utils";
import TreeSelectedCategories from "./TreeSelectedCategories";

type UpdateCallback = (oldState: CategoryState[]) => CategoryState[];

type TreeContextType = {
  categoriesState: CategoryState[];
  setCategoriesState: ((newVal: CategoryState[]) => void) | UpdateCallback;
  defaultNestedCategories: Category[];
  categoryMap: Record<string, Category[]>;
  handleSelectAll: () => void;
  handleShowAll: () => void;
  selectAll: boolean;
  showAll: boolean
};

const TreeContext = createContext<TreeContextType | undefined>(undefined);

const TreeProvider = ({
  children,
  defaultVal,
}: {
  children: React.ReactNode;
  defaultVal: CategoryRaw[];
}) => {
  const [selectAll, setSelectAll] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const ids = new Set(defaultVal.map((category) => category.id));
  // remove element that parent id is not in the mock
  const validDefaultVal = defaultVal.filter((category) => {
    const IsParentExist = category.parent === "0" || ids.has(category.parent);
    return IsParentExist;
  });

  const { result: defaultNestedCategories, categoryMap } =
    createNestedCategories(validDefaultVal);
  const initialCategoriesState = validDefaultVal.map((category) => ({
    ...category,
    checked: false,
    showChildren: false,
  }));

  const [categoriesState, setCategoriesState] = useState<CategoryState[]>(
    initialCategoriesState
  );

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
    <TreeContext.Provider
      value={{
        categoriesState,
        setCategoriesState,
        defaultNestedCategories,
        categoryMap,
        handleSelectAll,
        handleShowAll,
        selectAll,
        showAll
      }}
    >
      <div className="border border-slate-200 rounded-lg ">
        <div className="overflow-y-auto h-96">{children}</div>
        <TreeSelectedCategories />
      </div>
    </TreeContext.Provider>
  );
};

const useTree = () => {
  const context = useContext(TreeContext);

  if (context === undefined) {
    throw new Error("Please use <TreeProvider /> to wrap <Tree />");
  }

  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { useTree, TreeProvider };
