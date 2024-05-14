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
  setSelectedCategories: (newVal: Category[]) => void;
  selectedCategories: Category[];
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
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const initialCategoriesState = defaultVal.map((category) => ({
    ...category,
    checked: false,
    showChildren: false,
  }));

  const [categoriesState, setCategoriesState] = useState<CategoryState[]>(
    initialCategoriesState
  );

  const { result: defaultNestedCategories, categoryMap } =
    createNestedCategories(defaultVal);

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
      <div className="border-2 border-slate-300 rounded-lg ">
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
