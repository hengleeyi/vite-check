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
  setSelectAll: (newVal: boolean) => void;
  selectAll: boolean;
  setShowAll: (newVal: boolean) => void;
  showAll: boolean;
  setSelectedCategories: (newVal: CategoryRaw[]) => void;
  selectedCategories: CategoryRaw[];
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
  const [selectedCategories, setSelectedCategories] = useState<CategoryRaw[]>(
    []
  );

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

  return (
    <TreeContext.Provider
      value={{
        categoriesState,
        setCategoriesState,
        defaultNestedCategories,
        categoryMap,
        selectAll,
        setSelectAll,
        showAll,
        setShowAll,
        selectedCategories,
        setSelectedCategories,
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
    throw new Error("Please use <TreeProvider /> to wrap <Tree /> ");
  }

  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { useTree, TreeProvider };
